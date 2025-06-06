import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import * as XLSX from 'xlsx';

interface RolloverResult {
  success: boolean;
  reportId: string;
  nextMonth: number;
  nextYear: number;
  excelBuffer?: Buffer;
  summary: {
    totalRevenue: number;
    totalProfit: number;
    productsProcessed: number;
    inventoryCarriedOver: number;
  };
}

// POST - Execute monthly rollover
export async function POST(request: NextRequest) {
  // Check for company context - either from session or cron job header
  let userCompanyId: string;
  
  const companyIdHeader = request.headers.get('x-company-id');
  if (companyIdHeader) {
    // Request from cron job - validate cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
    }
    
    userCompanyId = companyIdHeader;
  } else {
    // Request from user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    userCompanyId = session.user.companyId;
  }

  try {
    const { year, month, generateExcel = false } = await request.json();
    
    if (!year || month === undefined) {
      return NextResponse.json({ error: 'Year and month are required' }, { status: 400 });
    }

    const rolloverMonth = parseInt(month) - 1; // Convert to 0-based
    const rolloverYear = parseInt(year);

    if (isNaN(rolloverYear) || isNaN(rolloverMonth) || rolloverMonth < 0 || rolloverMonth > 11) {
      return NextResponse.json({ error: 'Invalid year or month' }, { status: 400 });
    }

    // Check if already rolled over
    const existingReport = await prisma.monthlyReport.findUnique({
      where: {
        year_month_companyId: {
          year: rolloverYear,
          month: rolloverMonth,
          companyId: userCompanyId
        }
      }
    });

    if (existingReport?.isFinalized) {
      return NextResponse.json({ error: 'Month has already been rolled over' }, { status: 400 });
    }

    // Check for pending debts - rollover cannot proceed if there are unpaid debts
    const pendingDebts = await prisma.debt.findMany({
      where: {
        companyId: userCompanyId,
        status: 'pending'
      },
      include: {
        product: { select: { name: true, sku: true } }
      }
    });

    if (pendingDebts.length > 0) {
      const totalPendingAmount = pendingDebts.reduce((sum, debt) => sum + debt.totalAmount, 0);
      return NextResponse.json({ 
        error: 'Cannot rollover with pending debts',
        details: `There are ${pendingDebts.length} pending debts totaling $${totalPendingAmount.toFixed(2)} that must be resolved before rollover.`,
        pendingDebts: pendingDebts.map(debt => ({
          id: debt.id,
          productName: debt.product.name,
          customerName: debt.customerName || 'Unknown',
          amount: debt.totalAmount,
          debtDate: debt.debtDate.toISOString()
        }))
      }, { status: 400 });
    }

    // Calculate date range for the month being rolled over
    const startDate = new Date(rolloverYear, rolloverMonth, 1);
    const endDate = new Date(rolloverYear, rolloverMonth + 1, 0, 23, 59, 59, 999);

    // Get all data for the rollover period
    const [products, batches, sales] = await Promise.all([
      prisma.product.findMany({
        where: { companyId: userCompanyId },
        include: { category: true, batches: true }
      }),
      prisma.batch.findMany({
        where: { companyId: userCompanyId }
      }),
      prisma.sale.findMany({
        where: {
          companyId: userCompanyId,
          saleDate: { gte: startDate, lte: endDate }
        },
        include: { product: true, batch: true }
      })
    ]);

    // Generate rollover report data
    const reportData = await generateRolloverReport(
      products, 
      batches, 
      sales, 
      rolloverYear, 
      rolloverMonth
    );

    // Execute rollover in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create/update the monthly report as finalized
      const monthlyReport = await tx.monthlyReport.upsert({
        where: {
          year_month_companyId: {
            year: rolloverYear,
            month: rolloverMonth,
            companyId: userCompanyId
          }
        },
        update: {
          totalSales: reportData.totalRevenue,
          totalProfit: reportData.totalProfit,
          averageProfitMargin: reportData.avgProfitMargin,
          isFinalized: true,
          reportData: reportData as any
        },
        create: {
          year: rolloverYear,
          month: rolloverMonth,
          companyId: userCompanyId,
          totalSales: reportData.totalRevenue,
          totalProfit: reportData.totalProfit,
          averageProfitMargin: reportData.avgProfitMargin,
          isFinalized: true,
          reportData: reportData as any
        }
      });

      // 2. Reset batch quantities and update product total stock 
      // This carries forward all remaining inventory and resets sold counters to 0
      let inventoryCarriedOver = 0;
      for (const product of products) {
        const productBatches = batches.filter(b => b.productId === product.id);
        
        // Reset all batch quantities to their initial quantities 
        // This effectively resets the "sold" counters displayed in the UI
        for (const batch of productBatches) {
          await tx.batch.update({
            where: { id: batch.id },
            data: { 
              currentQuantity: batch.initialQuantity,  // Reset to initial quantity
              status: 'active'  // Make sure status is active
            }
          });
        }
        
        // Calculate new total stock (all batches are now at full capacity)
        const totalStock = productBatches.reduce((sum, batch) => sum + batch.initialQuantity, 0);
        
        await tx.product.update({
          where: { id: product.id },
          data: { totalStock }
        });

        inventoryCarriedOver += totalStock;
      }

      // 3. Reset monthly counters completed
      // Note: The batch reset above effectively resets all sold quantities
      
      return {
        reportId: monthlyReport.id,
        summary: {
          totalRevenue: reportData.totalRevenue,
          totalProfit: reportData.totalProfit,
          productsProcessed: products.length,
          inventoryCarriedOver
        }
      };
    });

    // Calculate next month/year
    let nextMonth = rolloverMonth + 2; // Convert back to 1-based and add 1
    let nextYear = rolloverYear;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear = rolloverYear + 1;
    }

    const rolloverResult: RolloverResult = {
      success: true,
      reportId: result.reportId,
      nextMonth,
      nextYear,
      summary: result.summary
    };

    // Generate Excel if requested
    if (generateExcel) {
      const excelBuffer = await generateExcelReport(reportData, rolloverYear, rolloverMonth);
      rolloverResult.excelBuffer = excelBuffer;
    }

    return NextResponse.json(rolloverResult);

  } catch (error) {
    console.error('Error during monthly rollover:', error);
    return NextResponse.json({ 
      error: 'Failed to execute monthly rollover',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to generate rollover report
async function generateRolloverReport(
  products: any[],
  batches: any[],
  sales: any[],
  year: number,
  month: number
) {
  const productReports = products.map(product => {
    const productBatches = batches.filter(b => b.productId === product.id);
    const productSales = sales.filter(s => s.productId === product.id);

    // Calculate starting inventory (approximate based on current - sales + purchases)
    const soldQuantity = productSales.reduce((sum, sale) => sum + sale.quantity, 0);
    const currentQuantity = productBatches.reduce((sum, batch) => sum + batch.currentQuantity, 0);
    
    // For purchases in this month
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);
    const monthlyBatches = productBatches.filter(batch => 
      batch.purchaseDate >= monthStart && batch.purchaseDate <= monthEnd
    );
    const purchasedQuantity = monthlyBatches.reduce((sum, batch) => sum + batch.initialQuantity, 0);
    
    const startingQuantity = currentQuantity + soldQuantity - purchasedQuantity;

    // Calculate financials
    const revenue = productSales.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0);
    const cost = productSales.reduce((sum, sale) => sum + (sale.purchasePrice * sale.quantity), 0);
    const profit = revenue - cost;
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

    return {
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      category: product.category?.name || 'Uncategorized',
      startingQuantity: Math.max(0, startingQuantity),
      endingQuantity: currentQuantity,
      purchasedQuantity,
      soldQuantity,
      revenue,
      cost,
      profit,
      profitMargin
    };
  });

  // Calculate totals
  const totalRevenue = productReports.reduce((sum, p) => sum + p.revenue, 0);
  const totalProfit = productReports.reduce((sum, p) => sum + p.profit, 0);
  const totalStartingInventory = productReports.reduce((sum, p) => sum + p.startingQuantity, 0);
  const totalEndingInventory = productReports.reduce((sum, p) => sum + p.endingQuantity, 0);
  const totalPurchased = productReports.reduce((sum, p) => sum + p.purchasedQuantity, 0);
  const totalSold = productReports.reduce((sum, p) => sum + p.soldQuantity, 0);
  const avgProfitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  return {
    month,
    year,
    startDate: new Date(year, month, 1).toISOString(),
    endDate: new Date(year, month + 1, 0, 23, 59, 59, 999).toISOString(),
    products: productReports,
    totalStartingInventory,
    totalEndingInventory,
    totalPurchased,
    totalSold,
    totalRevenue,
    totalCost: totalRevenue - totalProfit,
    totalProfit,
    avgProfitMargin,
    totalSales: totalRevenue,
    averageProfitMargin: avgProfitMargin
  };
}

// Helper function to generate Excel report
async function generateExcelReport(reportData: any, year: number, month: number): Promise<Buffer> {
  const wb = XLSX.utils.book_new();
  
  // Summary sheet
  const summaryData = [
    ['Monthly Inventory Report'],
    [`${new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`],
    [''],
    ['Summary'],
    ['Total Revenue', `$${reportData.totalRevenue.toFixed(2)}`],
    ['Total Profit', `$${reportData.totalProfit.toFixed(2)}`],
    ['Average Profit Margin', `${reportData.avgProfitMargin.toFixed(2)}%`],
    ['Products Processed', reportData.products.length],
    ['Total Starting Inventory', reportData.totalStartingInventory],
    ['Total Ending Inventory', reportData.totalEndingInventory],
    ['Total Purchased', reportData.totalPurchased],
    ['Total Sold', reportData.totalSold],
  ];
  
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
  
  // Product details sheet
  const productHeaders = [
    'Product ID', 'Product Name', 'SKU', 'Category',
    'Starting Qty', 'Purchased Qty', 'Sold Qty', 'Ending Qty',
    'Revenue', 'Cost', 'Profit', 'Profit Margin %'
  ];
  
  const productData = [
    productHeaders,
    ...reportData.products.map((p: any) => [
      p.productId,
      p.productName,
      p.sku,
      p.category,
      p.startingQuantity,
      p.purchasedQuantity,
      p.soldQuantity,
      p.endingQuantity,
      p.revenue.toFixed(2),
      p.cost.toFixed(2),
      p.profit.toFixed(2),
      p.profitMargin.toFixed(2)
    ])
  ];
  
  const productWs = XLSX.utils.aoa_to_sheet(productData);
  XLSX.utils.book_append_sheet(wb, productWs, 'Product Details');
  
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
} 