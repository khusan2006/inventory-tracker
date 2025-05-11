import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

/**
 * GET batch quantities
 * This optimized endpoint returns only essential batch information for faster loading.
 * It can return batch quantities for a specific product or all products.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    if (productId) {
      // Get batches for a specific product with minimal data
      const batchQuantities = await prisma.batch.findMany({
        where: { productId },
        select: {
          id: true,
          productId: true,
          currentQuantity: true,
          initialQuantity: true,
          purchasePrice: true,
          purchaseDate: true,
          status: true,
        },
        orderBy: { purchaseDate: 'asc' }
      });
      
      return NextResponse.json(batchQuantities);
    }
    
    // Get batch quantities for all products (grouped by productId)
    const batchQuantities = await prisma.batch.groupBy({
      by: ['productId'],
      _sum: {
        currentQuantity: true,
        initialQuantity: true,
      },
      _count: {
        id: true
      }
    });
    
    // Format the data for easier consumption by the frontend
    const formattedResult = batchQuantities.map(item => ({
      productId: item.productId,
      batchCount: item._count.id,
      totalQuantity: item._sum.currentQuantity,
      totalInitialQuantity: item._sum.initialQuantity,
    }));
    
    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error('Error fetching batch quantities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batch quantities' },
      { status: 500 }
    );
  }
} 