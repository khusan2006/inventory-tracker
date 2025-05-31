import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

interface ActivityItem {
  id: string;
  type: 'sale' | 'new_product' | 'new_stock';
  timestamp: Date;
  description?: string;
  productName?: string;
  quantity?: number;
  value?: number; // e.g., sale value
  details?: Record<string, any>; // For any other specific details
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;
  const activityLimit = 7; // How many of each type to fetch initially
  const finalLimit = 10; // How many total activities to return

  try {
    // 1. Fetch recent sales
    const sales = await prisma.sale.findMany({
      where: { companyId: userCompanyId },
      orderBy: { saleDate: 'desc' },
      take: activityLimit,
      include: { product: { select: { name: true, id: true } } },
    });
    const saleActivities: ActivityItem[] = sales.map(s => ({
      id: `sale-${s.id}`,
      type: 'sale',
      timestamp: s.saleDate,
      productName: s.product.name,
      quantity: s.quantity,
      value: Number(s.salePrice) * s.quantity,
      details: { productId: s.product.id, saleId: s.id }
    }));

    // 2. Fetch recently created products
    const newProducts = await prisma.product.findMany({
      where: { companyId: userCompanyId },
      orderBy: { createdAt: 'desc' },
      take: activityLimit,
    });
    const newProductActivities: ActivityItem[] = newProducts.map(p => ({
      id: `product-created-${p.id}`,
      type: 'new_product',
      timestamp: p.createdAt,
      productName: p.name,
      details: { productId: p.id }
    }));

    // 3. Fetch new batches (stock additions)
    const newBatches = await prisma.batch.findMany({
      where: { companyId: userCompanyId },
      orderBy: { createdAt: 'desc' },
      take: activityLimit,
      include: { product: { select: { name: true, id: true } } },
    });
    const newStockActivities: ActivityItem[] = newBatches.map(b => ({
      id: `batch-added-${b.id}`,
      type: 'new_stock',
      timestamp: b.createdAt,
      productName: b.product.name,
      quantity: b.initialQuantity,
      details: { productId: b.product.id, batchId: b.id }
    }));

    // Combine, sort, and limit
    const allActivities = [...saleActivities, ...newProductActivities, ...newStockActivities];
    allActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    const recentActivities = allActivities.slice(0, finalLimit);

    return NextResponse.json(recentActivities);
  } catch (error: unknown) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 500 }
    );
  }
} 