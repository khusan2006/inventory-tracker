import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { 
  MonthlyReport as MonthlyReportType, 
  generateMonthlyReport, 
  getMonthDateRange 
} from '@/types/inventory';
import { Product, Batch } from '@/types/inventory';

// GET a monthly report
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');
    
    // Check if year and month parameters exist
    if (!yearParam || !monthParam) {
      return NextResponse.json(
        { error: 'Year and month parameters are required (e.g., ?year=2023&month=3 for March 2023)' },
        { status: 400 }
      );
    }
    
    // Parse parameters
    const year = parseInt(yearParam);
    const month = parseInt(monthParam) - 1; // Adjust for 0-indexed months (0 = January)
    
    if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
      return NextResponse.json(
        { error: 'Invalid year or month. Month should be 1-12.' },
        { status: 400 }
      );
    }
    
    // Check if we already have a finalized report stored
    const existingReport = await prisma.monthlyReport.findUnique({
      where: {
        year_month: {
          year,
          month
        }
      }
    });
    
    if (existingReport && existingReport.isFinalized) {
      return NextResponse.json(existingReport);
    }
    
    // Get date range for the month
    const { startDate, endDate } = getMonthDateRange(year, month);
    
    // Get products with categories
    const dbProducts = await prisma.product.findMany({
      include: { category: true }
    });
    
    // Map products to the expected format
    const products: Product[] = dbProducts.map(product => ({
      id: product.id,
      sku: product.sku,
      name: product.name,
      category: product.category?.name || 'Uncategorized',
      description: product.description || undefined,
      sellingPrice: product.sellingPrice,
      totalStock: product.totalStock,
      minStockLevel: product.minStockLevel,
      location: product.location || undefined,
      imageUrl: product.imageUrl || undefined,
      fitment: product.fitment || undefined
    }));
    
    // Get batches and convert date to string
    const dbBatches = await prisma.batch.findMany();
    const batches: Batch[] = dbBatches.map(batch => ({
      id: batch.id,
      productId: batch.productId,
      purchaseDate: batch.purchaseDate.toISOString(),
      purchasePrice: batch.purchasePrice,
      initialQuantity: batch.initialQuantity,
      currentQuantity: batch.currentQuantity,
      status: batch.status as 'active' | 'depleted' | 'archived',
      supplier: batch.supplier || undefined,
      invoiceNumber: batch.invoiceNumber || undefined,
      notes: batch.notes || undefined
    }));
    
    // Get sales for this month
    const sales = await prisma.sale.findMany({
      where: {
        saleDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      include: {
        product: true
      }
    });
    
    // Transform sales to the expected format
    const transformedSales = sales.map(sale => ({
      id: sale.id,
      productId: sale.productId,
      batchId: sale.batchId,
      quantity: sale.quantity,
      salePrice: sale.salePrice,
      purchasePrice: sale.purchasePrice,
      profit: sale.profit,
      profitMargin: sale.profitMargin,
      saleDate: sale.saleDate.toISOString(),
      customerId: sale.customerId || undefined,
      invoiceNumber: sale.invoiceNumber || undefined
    }));
    
    // Generate the report using our helper function
    const reportData = generateMonthlyReport(products, batches, transformedSales, year, month);
    
    // If no existing report, create a new one (not finalized)
    if (!existingReport) {
      const newReport = await prisma.monthlyReport.create({
        data: {
          year,
          month,
          totalSales: reportData.totalRevenue,
          totalProfit: reportData.totalProfit,
          averageProfitMargin: reportData.avgProfitMargin,
          isFinalized: false,
          reportData: reportData as any
        }
      });
      
      return NextResponse.json(newReport);
    }
    
    // Update existing report with latest data (but keep finalized status)
    const updatedReport = await prisma.monthlyReport.update({
      where: {
        id: existingReport.id
      },
      data: {
        totalSales: reportData.totalRevenue,
        totalProfit: reportData.totalProfit,
        averageProfitMargin: reportData.avgProfitMargin,
        reportData: reportData as any
      }
    });
    
    return NextResponse.json(updatedReport);
  } catch (error) {
    console.error('Error generating monthly report:', error);
    return NextResponse.json(
      { error: 'Failed to generate monthly report' },
      { status: 500 }
    );
  }
}

// POST a new month rollover (finalize the report)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.year || data.month === undefined) {
      return NextResponse.json(
        { error: 'Year and month are required for rollover' },
        { status: 400 }
      );
    }
    
    const year = parseInt(data.year);
    const month = parseInt(data.month) - 1; // Adjust for 0-indexed months
    
    // Get date range for the month
    const { startDate, endDate } = getMonthDateRange(year, month);
    
    // Get products with categories
    const dbProducts = await prisma.product.findMany({
      include: { category: true }
    });
    
    // Map products to the expected format
    const products: Product[] = dbProducts.map(product => ({
      id: product.id,
      sku: product.sku,
      name: product.name,
      category: product.category?.name || 'Uncategorized',
      description: product.description || undefined,
      sellingPrice: product.sellingPrice,
      totalStock: product.totalStock,
      minStockLevel: product.minStockLevel,
      location: product.location || undefined,
      imageUrl: product.imageUrl || undefined,
      fitment: product.fitment || undefined
    }));
    
    // Get batches and convert date to string
    const dbBatches = await prisma.batch.findMany();
    const batches: Batch[] = dbBatches.map(batch => ({
      id: batch.id,
      productId: batch.productId,
      purchaseDate: batch.purchaseDate.toISOString(),
      purchasePrice: batch.purchasePrice,
      initialQuantity: batch.initialQuantity,
      currentQuantity: batch.currentQuantity,
      status: batch.status as 'active' | 'depleted' | 'archived',
      supplier: batch.supplier || undefined,
      invoiceNumber: batch.invoiceNumber || undefined,
      notes: batch.notes || undefined
    }));
    
    // Get sales for this month
    const sales = await prisma.sale.findMany({
      where: {
        saleDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      },
      include: {
        product: true
      }
    });
    
    // Transform sales to the expected format
    const transformedSales = sales.map(sale => ({
      id: sale.id,
      productId: sale.productId,
      batchId: sale.batchId,
      quantity: sale.quantity,
      salePrice: sale.salePrice,
      purchasePrice: sale.purchasePrice,
      profit: sale.profit,
      profitMargin: sale.profitMargin,
      saleDate: sale.saleDate.toISOString(),
      customerId: sale.customerId || undefined,
      invoiceNumber: sale.invoiceNumber || undefined
    }));
    
    // Generate the final report for the month
    const finalReportData = generateMonthlyReport(products, batches, transformedSales, year, month);
    
    // Check if report already exists
    const existingReport = await prisma.monthlyReport.findUnique({
      where: {
        year_month: {
          year,
          month
        }
      }
    });
    
    let finalReport;
    
    if (existingReport) {
      // Update the existing report and mark as finalized
      finalReport = await prisma.monthlyReport.update({
        where: {
          id: existingReport.id
        },
        data: {
          totalSales: finalReportData.totalRevenue,
          totalProfit: finalReportData.totalProfit,
          averageProfitMargin: finalReportData.avgProfitMargin,
          isFinalized: true,
          reportData: finalReportData as any
        }
      });
    } else {
      // Create a new finalized report
      finalReport = await prisma.monthlyReport.create({
        data: {
          year,
          month,
          totalSales: finalReportData.totalRevenue,
          totalProfit: finalReportData.totalProfit,
          averageProfitMargin: finalReportData.avgProfitMargin,
          isFinalized: true,
          reportData: finalReportData as any
        }
      });
    }
    
    // Calculate the next month and year
    let nextMonth = month + 1;
    let nextYear = year;
    
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear = year + 1;
    }
    
    console.log(`Month rollover completed from ${month + 1}/${year} to ${nextMonth + 1}/${nextYear}`);
    
    // Return both the final report and info for the next month
    return NextResponse.json({
      status: 'success',
      message: `Month successfully rolled over from ${month + 1}/${year} to ${nextMonth + 1}/${nextYear}`,
      finalReport,
      nextMonth: nextMonth + 1, // Adjust back to 1-indexed for the response
      nextYear
    });
    
  } catch (error) {
    console.error('Error during month rollover:', error);
    return NextResponse.json(
      { error: 'Failed to process month rollover' },
      { status: 500 }
    );
  }
} 