import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(request: NextRequest) {
  try {
    // Extract the id from the URL path using regex
    const pathParts = request.nextUrl.pathname.split('/');
    const batchId = pathParts[pathParts.length - 1];
    
    if (!batchId) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch the batch with product details
    const batch = await prisma.batch.findUnique({
      where: { id: batchId },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    });
    
    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }
    
    // Transform the data for the frontend
    const transformedBatch = {
      id: batch.id,
      productId: batch.productId,
      productName: batch.product.name,
      purchaseDate: batch.purchaseDate.toISOString(),
      purchasePrice: batch.purchasePrice,
      initialQuantity: batch.initialQuantity,
      currentQuantity: batch.currentQuantity,
      status: batch.status,
      supplier: batch.supplier,
      invoiceNumber: batch.invoiceNumber,
      category: batch.product.category?.name
    };
    
    return NextResponse.json(transformedBatch);
  } catch (error) {
    console.error('Error fetching batch details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batch details' },
      { status: 500 }
    );
  }
} 