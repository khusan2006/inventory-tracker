import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const totalProducts = await prisma.product.count({
      where: { companyId: userCompanyId },
    });

    const totalCategories = await prisma.category.count({
      where: { companyId: userCompanyId },
    });

    // Calculate Sales This Month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999); // Ensure end of day

    const monthlySalesData = await prisma.sale.findMany({
      where: {
        companyId: userCompanyId,
        saleDate: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
      select: {
        salePrice: true,
        quantity: true,
      },
    });

    const salesThisMonth = monthlySalesData.reduce((acc, sale) => {
      return acc + (Number(sale.salePrice) * sale.quantity);
    }, 0);

    // Calculate Low Stock Items
    const productsForStockCheck = await prisma.product.findMany({
      where: { companyId: userCompanyId },
      select: { totalStock: true, minStockLevel: true },
    });

    const lowStockItems = productsForStockCheck.filter(
      (p) => p.totalStock !== null && p.minStockLevel !== null && p.totalStock <= p.minStockLevel
    ).length;

    return NextResponse.json({
      totalProducts,
      totalCategories,
      salesThisMonth,
      lowStockItems,
    });

  } catch (error) {
    console.error('[API_DASHBOARD_STATS_GET]', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
} 