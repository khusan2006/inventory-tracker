import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { subDays, format, eachDayOfInterval, parseISO } from 'date-fns';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 29); // Inclusive of today, so 29 days back for a 30-day period

    const sales = await prisma.sale.findMany({
      where: {
        companyId: userCompanyId,
        saleDate: {
          gte: thirtyDaysAgo,
          lte: today,
        },
      },
      select: {
        saleDate: true,
        salePrice: true,
        quantity: true,
      },
      orderBy: {
        saleDate: 'asc',
      },
    });

    // Aggregate sales by day
    const dailySales = new Map<string, number>();
    sales.forEach(sale => {
      const dateStr = format(new Date(sale.saleDate), 'yyyy-MM-dd');
      const currentTotal = dailySales.get(dateStr) || 0;
      dailySales.set(dateStr, currentTotal + (Number(sale.salePrice) * sale.quantity));
    });

    // Create a list of all dates in the interval to ensure all days are present in the chart
    const dateInterval = eachDayOfInterval({
      start: thirtyDaysAgo,
      end: today
    });

    const labels = dateInterval.map(date => format(date, 'MMM d')); // Format for display, e.g., "Jul 20"
    const dataPoints = dateInterval.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return dailySales.get(dateStr) || 0;
    });

    return NextResponse.json({
      labels,
      dataPoints,
    });

  } catch (error) {
    console.error('[API_DASHBOARD_SALES_TREND_GET]', error);
    return NextResponse.json({ error: 'Failed to fetch sales trend data' }, { status: 500 });
  }
} 