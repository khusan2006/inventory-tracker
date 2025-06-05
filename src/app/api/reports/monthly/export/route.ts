import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');
    
    if (!yearParam || !monthParam) {
      return NextResponse.json({ error: 'Year and month parameters are required' }, { status: 400 });
    }
    
    const year = parseInt(yearParam);
    const month = parseInt(monthParam) - 1; // Convert to 0-based
    
    if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
      return NextResponse.json({ error: 'Invalid year or month' }, { status: 400 });
    }

    // Get the monthly report
    const monthlyReport = await prisma.monthlyReport.findUnique({
      where: {
        year_month_companyId: {
          year,
          month,
          companyId: userCompanyId
        }
      }
    });

    if (!monthlyReport) {
      return NextResponse.json({ error: 'Monthly report not found' }, { status: 404 });
    }

    // Extract report data
    const reportData = monthlyReport.reportData as any;
    
    // Generate Excel file
    const excelBuffer = await generateExcelReport(reportData, year, month);
    
    // Set response headers for file download
    const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long' });
    const filename = `Monthly_Rollover_Report_${monthName}_${year}.xlsx`;
    
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': excelBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating Excel export:', error);
    return NextResponse.json({ 
      error: 'Failed to generate Excel export',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to generate Excel report
async function generateExcelReport(reportData: any, year: number, month: number): Promise<Buffer> {
  const wb = XLSX.utils.book_new();
  
  // Summary sheet
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const summaryData = [
    ['Monthly Inventory Rollover Report'],
    [monthName],
    ['Generated on:', new Date().toLocaleDateString()],
    [''],
    ['SUMMARY'],
    ['Total Revenue', `$${reportData.totalRevenue?.toFixed(2) || '0.00'}`],
    ['Total Profit', `$${reportData.totalProfit?.toFixed(2) || '0.00'}`],
    ['Average Profit Margin', `${reportData.avgProfitMargin?.toFixed(2) || '0.00'}%`],
    ['Products Processed', reportData.products?.length || 0],
    ['Total Starting Inventory', reportData.totalStartingInventory || 0],
    ['Total Ending Inventory', reportData.totalEndingInventory || 0],
    ['Total Purchased', reportData.totalPurchased || 0],
    ['Total Sold', reportData.totalSold || 0],
    [''],
    ['PERIOD DETAILS'],
    ['Rollover Period', `${monthName}`],
    ['Start Date', reportData.startDate ? new Date(reportData.startDate).toLocaleDateString() : 'N/A'],
    ['End Date', reportData.endDate ? new Date(reportData.endDate).toLocaleDateString() : 'N/A'],
  ];
  
  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  
  // Set column widths
  summaryWs['!cols'] = [
    { width: 25 },
    { width: 20 }
  ];
  
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
  
  // Product details sheet
  if (reportData.products && reportData.products.length > 0) {
    const productHeaders = [
      'Product ID', 'Product Name', 'SKU', 'Category',
      'Starting Qty', 'Purchased Qty', 'Sold Qty', 'Ending Qty',
      'Revenue', 'Cost', 'Profit', 'Profit Margin %'
    ];
    
    const productData = [
      productHeaders,
      ...reportData.products.map((p: any) => [
        p.productId || '',
        p.productName || '',
        p.sku || '',
        p.category || '',
        p.startingQuantity || 0,
        p.purchasedQuantity || 0,
        p.soldQuantity || 0,
        p.endingQuantity || 0,
        parseFloat(p.revenue || 0).toFixed(2),
        parseFloat(p.cost || 0).toFixed(2),
        parseFloat(p.profit || 0).toFixed(2),
        parseFloat(p.profitMargin || 0).toFixed(2)
      ])
    ];
    
    const productWs = XLSX.utils.aoa_to_sheet(productData);
    
    // Set column widths for product sheet
    productWs['!cols'] = [
      { width: 15 }, // Product ID
      { width: 25 }, // Product Name
      { width: 15 }, // SKU
      { width: 15 }, // Category
      { width: 12 }, // Starting Qty
      { width: 12 }, // Purchased Qty
      { width: 12 }, // Sold Qty
      { width: 12 }, // Ending Qty
      { width: 12 }, // Revenue
      { width: 12 }, // Cost
      { width: 12 }, // Profit
      { width: 15 }  // Profit Margin %
    ];
    
    XLSX.utils.book_append_sheet(wb, productWs, 'Product Details');
  }
  
  // Inventory carryover sheet
  const carryoverData = [
    ['INVENTORY CARRYOVER'],
    ['This report shows inventory carried over to the next month'],
    [''],
    ['Carryover Details'],
    ['Previous Month Ending Inventory', reportData.totalEndingInventory || 0],
    ['Current Month Starting Inventory', reportData.totalEndingInventory || 0],
    [''],
    ['Note: Ending inventory from this month becomes'],
    ['the starting inventory for the next month']
  ];
  
  const carryoverWs = XLSX.utils.aoa_to_sheet(carryoverData);
  carryoverWs['!cols'] = [{ width: 35 }, { width: 20 }];
  
  XLSX.utils.book_append_sheet(wb, carryoverWs, 'Inventory Carryover');
  
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
} 