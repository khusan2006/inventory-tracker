import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            batches: true
          }
        }
      }
    });

    const categoriesWithProductCounts = await prisma.category.findMany({
      where: {
        companyId: userCompanyId,
      },
      select: {
        name: true,
        _count: {
          select: { products: true },
        },
      },
    });

    const labels = categoriesWithProductCounts.map(c => c.name);
    const dataPoints = categoriesWithProductCounts.map(c => c._count.products);
    
    // You might want to define a set of colors if you want consistency or more control
    // For now, chart.js will auto-assign colors

    return NextResponse.json({
      labels,
      dataPoints,
    });

  } catch (error) {
    console.error('[API_DASHBOARD_INVENTORY_BY_CATEGORY_GET]', error);
    return NextResponse.json({ error: 'Failed to fetch inventory by category data' }, { status: 500 });
  }
} 