import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { 
  MonthlyReport as MonthlyReportType, 
  generateMonthlyReport, 
  getMonthDateRange 
} from '@/types/inventory';
import { Product, Batch } from '@/types/inventory';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET a monthly report
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
    const month = parseInt(monthParam) - 1;
    
    if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
      return NextResponse.json({ error: 'Invalid year or month' }, { status: 400 });
    }
    
    const existingReport = await prisma.monthlyReport.findUnique({
      where: {
        year_month_companyId: {
          year,
          month,
          companyId: userCompanyId
        }
      }
    });
    
    if (existingReport && existingReport.isFinalized) {
      return NextResponse.json(existingReport);
    }
    
    const { startDate, endDate } = getMonthDateRange(year, month);
    
    const dbProducts = await prisma.product.findMany({
      where: { companyId: userCompanyId },
      include: { category: true }
    });
    const products: Product[] = dbProducts.map(p => ({ ...p, category: p.category?.name || 'Uncategorized', description: p.description || undefined, location: p.location || undefined, imageUrl: p.imageUrl || undefined, fitment: p.fitment || undefined }));

    const dbBatches = await prisma.batch.findMany({ where: { companyId: userCompanyId } });
    const batches: Batch[] = dbBatches.map(b => ({ ...b, purchaseDate: b.purchaseDate.toISOString(), status: b.status as any, supplier: b.supplier || undefined, invoiceNumber: b.invoiceNumber || undefined, notes: b.notes || undefined }));

    const salesData = await prisma.sale.findMany({
      where: {
        companyId: userCompanyId,
        saleDate: { gte: new Date(startDate), lte: new Date(endDate) }
      },
      include: { product: true }
    });
    const transformedSales = salesData.map(s => ({ ...s, saleDate: s.saleDate.toISOString(), customerId: s.customerId || undefined, invoiceNumber: s.invoiceNumber || undefined }));
    
    const reportData = generateMonthlyReport(products, batches, transformedSales, year, month);
    
    if (!existingReport) {
      const newReport = await prisma.monthlyReport.create({
        data: {
          year, month, companyId: userCompanyId,
          totalSales: reportData.totalRevenue,
          totalProfit: reportData.totalProfit,
          averageProfitMargin: reportData.avgProfitMargin,
          isFinalized: false,
          reportData: reportData as any
        }
      });
      return NextResponse.json(newReport);
    }
    
    const updatedReport = await prisma.monthlyReport.update({
      where: {
        id: existingReport.id,
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
    console.error('Error generating/fetching monthly report:', error);
    return NextResponse.json({ error: 'Failed to generate/fetch monthly report' }, { status: 500 });
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