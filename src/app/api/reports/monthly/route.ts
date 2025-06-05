import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { 
  MonthlyReport as MonthlyReportType, 
  generateMonthlyReport, 
  getMonthDateRange 
} from '@/types/inventory';
import { Product, Batch } from '@/types/inventory';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// GET a monthly report
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());

    // Convert month to 0-based for database
    const dbMonth = month - 1;

    console.log(`Fetching monthly report for ${year}-${month} (db month: ${dbMonth}) for company: ${session.user.companyId}`);

    // First, try to get the finalized monthly report
    const monthlyReport = await prisma.monthlyReport.findUnique({
      where: {
        year_month_companyId: {
          year: year,
          month: dbMonth,
          companyId: session.user.companyId
        }
      }
    });

    if (monthlyReport && monthlyReport.isFinalized) {
      // Return finalized report data
      console.log(`Found finalized monthly report for ${year}-${month}`);
      
      let reportData = null;
      if (monthlyReport.reportData && typeof monthlyReport.reportData === 'object') {
        reportData = monthlyReport.reportData;
      }

      return NextResponse.json({
        report: {
          id: monthlyReport.id,
          year: monthlyReport.year,
          month: monthlyReport.month + 1, // Convert back to 1-based
          totalSales: monthlyReport.totalSales,
          totalProfit: monthlyReport.totalProfit,
          averageProfitMargin: monthlyReport.averageProfitMargin,
          isFinalized: monthlyReport.isFinalized,
          createdAt: monthlyReport.createdAt,
          updatedAt: monthlyReport.updatedAt,
          reportData: reportData
        },
        hasData: true
      });
    }

    // No finalized report exists, generate live report data
    console.log(`No finalized report found for ${year}-${month}, generating live data...`);
    
    const { startDate, endDate } = getMonthDateRange(year, dbMonth);

    // Get current data for live report generation
    const [dbProducts, dbBatches, salesData] = await Promise.all([
      prisma.product.findMany({ 
        where: { companyId: session.user.companyId }, 
        include: { category: true } 
      }),
      prisma.batch.findMany({ 
        where: { companyId: session.user.companyId } 
      }),
      prisma.sale.findMany({
        where: { 
          companyId: session.user.companyId, 
          saleDate: { gte: new Date(startDate), lte: new Date(endDate) } 
        },
        include: { product: true }
      })
    ]);

    // Transform data for report generation
    const products: Product[] = dbProducts.map(p => ({ 
      ...p, 
      category: p.category?.name || 'Uncategorized', 
      description: p.description || undefined, 
      location: p.location || undefined, 
      imageUrl: p.imageUrl || undefined, 
      fitment: p.fitment || undefined 
    }));

    const batches: Batch[] = dbBatches.map(b => ({ 
      ...b, 
      purchaseDate: b.purchaseDate.toISOString(), 
      status: b.status as any, 
      supplier: b.supplier || undefined, 
      invoiceNumber: b.invoiceNumber || undefined, 
      notes: b.notes || undefined 
    }));

    const transformedSales = salesData.map(s => ({ 
      ...s, 
      saleDate: s.saleDate.toISOString(), 
      customerId: s.customerId || undefined, 
      invoiceNumber: s.invoiceNumber || undefined 
    }));

    // Generate live monthly report
    const liveReportData = generateMonthlyReport(products, batches, transformedSales, year, dbMonth);

    console.log(`Generated live report for ${year}-${month} with ${liveReportData.products.length} products`);

    return NextResponse.json({
      report: {
        id: null, // No ID since it's not saved
        year: year,
        month: month, // Already 1-based
        totalSales: liveReportData.totalRevenue,
        totalProfit: liveReportData.totalProfit,
        averageProfitMargin: liveReportData.avgProfitMargin,
        isFinalized: false, // Live data is not finalized
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reportData: liveReportData
      },
      hasData: true
    });

  } catch (error) {
    console.error('Error fetching monthly report:', error);
    return NextResponse.json({
      error: 'Failed to fetch monthly report',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST a new month rollover (finalize the report)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const data = await request.json();
    if (!data.year || data.month === undefined) {
      return NextResponse.json({ error: 'Year and month are required' }, { status: 400 });
    }
    const year = parseInt(data.year);
    const month = parseInt(data.month) - 1;

    if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
        return NextResponse.json({ error: 'Invalid year or month' }, { status: 400 });
    }

    const { startDate, endDate } = getMonthDateRange(year, month);

    const dbProducts = await prisma.product.findMany({ where: { companyId: userCompanyId }, include: { category: true } });
    const products: Product[] = dbProducts.map(p => ({ ...p, category: p.category?.name || 'Uncategorized', description: p.description || undefined, location: p.location || undefined, imageUrl: p.imageUrl || undefined, fitment: p.fitment || undefined }));

    const dbBatches = await prisma.batch.findMany({ where: { companyId: userCompanyId } });
    const batches: Batch[] = dbBatches.map(b => ({ ...b, purchaseDate: b.purchaseDate.toISOString(), status: b.status as any, supplier: b.supplier || undefined, invoiceNumber: b.invoiceNumber || undefined, notes: b.notes || undefined }));

    const salesData = await prisma.sale.findMany({
      where: { companyId: userCompanyId, saleDate: { gte: new Date(startDate), lte: new Date(endDate) } },
      include: { product: true }
    });
    const transformedSales = salesData.map(s => ({ ...s, saleDate: s.saleDate.toISOString(), customerId: s.customerId || undefined, invoiceNumber: s.invoiceNumber || undefined }));

    const finalReportData = generateMonthlyReport(products, batches, transformedSales, year, month);

    // Upsert the report: create if not exists, update if exists and mark as finalized
    const report = await prisma.monthlyReport.upsert({
      where: {
        year_month_companyId: { year, month, companyId: userCompanyId }
      },
      update: {
        totalSales: finalReportData.totalRevenue,
        totalProfit: finalReportData.totalProfit,
        averageProfitMargin: finalReportData.avgProfitMargin,
        isFinalized: true,
        reportData: finalReportData as any
      },
      create: {
        year, month, companyId: userCompanyId,
        totalSales: finalReportData.totalRevenue,
        totalProfit: finalReportData.totalProfit,
        averageProfitMargin: finalReportData.avgProfitMargin,
        isFinalized: true,
        reportData: finalReportData as any
      }
    });

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error finalizing monthly report:', error);
    return NextResponse.json({ error: 'Failed to finalize monthly report' }, { status: 500 });
  }
} 