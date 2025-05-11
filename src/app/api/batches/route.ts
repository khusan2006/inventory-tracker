import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

interface BatchWithProduct {
  id: string;
  productId: string;
  productName: string;
  purchaseDate: string;
  purchasePrice: number;
  initialQuantity: number;
  currentQuantity: number;
  status: string;
  supplier: string | null;
  invoiceNumber: string | null;
  category: string | null;
}

// GET all batches or filter by productId
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const status = searchParams.get('status');
    
    // Build filters
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        purchaseDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      };
    }
    
    let statusFilter = {};
    if (status && status !== 'all') {
      statusFilter = { status };
    }
    
    // Fetch batches with product details
    const batches = await prisma.batch.findMany({
      where: {
        ...dateFilter,
        ...statusFilter
      },
      include: {
        product: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        purchaseDate: 'desc'
      }
    });
    
    // Transform the data for the frontend
    const transformedBatches = batches.map((batch: any) => ({
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
    }));
    
    return NextResponse.json(transformedBatches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batch data' },
      { status: 500 }
    );
  }
}

// POST a new batch
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.productId || !data.purchaseDate || !data.purchasePrice || !data.initialQuantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: data.productId }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Create new batch
    const purchasePrice = parseFloat(data.purchasePrice);
    const initialQuantity = parseInt(data.initialQuantity);
    
    const newBatch = await prisma.batch.create({
      data: {
        productId: data.productId,
        purchaseDate: new Date(data.purchaseDate),
        purchasePrice,
        initialQuantity,
        currentQuantity: initialQuantity,
        status: 'active',
        supplier: data.supplier || null,
        invoiceNumber: data.invoiceNumber || null,
        notes: data.notes || null
      },
      include: { product: true }
    });
    
    // Update product total stock
    await prisma.product.update({
      where: { id: data.productId },
      data: {
        totalStock: { increment: initialQuantity }
      }
    });
    
    console.log(`New batch created with ID: ${newBatch.id} for product ${newBatch.productId}`);
    
    return NextResponse.json(newBatch, { status: 201 });
  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json(
      { error: 'Failed to create batch' },
      { status: 500 }
    );
  }
}

// DELETE a batch
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }
    
    // Check if batch exists and get its current quantity
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: { sales: true }
    });
    
    if (!batch) {
      return NextResponse.json(
        { error: 'Batch not found' },
        { status: 404 }
      );
    }
    
    // Check if there are sales associated with this batch
    if (batch.sales.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete batch with associated sales' },
        { status: 400 }
      );
    }
    
    // Start a transaction to delete batch and update product stock
    const deletedBatch = await prisma.$transaction(async (tx) => {
      // Delete the batch
      const deletedBatch = await tx.batch.delete({
        where: { id }
      });
      
      // Update the product's total stock
      await tx.product.update({
        where: { id: deletedBatch.productId },
        data: {
          totalStock: { decrement: deletedBatch.currentQuantity }
        }
      });
      
      return deletedBatch;
    });
    
    console.log(`Deleted batch with ID: ${id}`);
    
    return NextResponse.json({ success: true, deletedBatch });
  } catch (error) {
    console.error('Error deleting batch:', error);
    return NextResponse.json(
      { error: 'Failed to delete batch' },
      { status: 500 }
    );
  }
}

// PATCH to update a batch
export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.id) {
      return NextResponse.json(
        { error: 'Batch ID is required' },
        { status: 400 }
      );
    }
    
    // Find the batch
    const existingBatch = await prisma.batch.findUnique({
      where: { id: data.id }
    });
    
    if (!existingBatch) {
      return NextResponse.json(
        { error: `Batch not found with ID: ${data.id}` },
        { status: 404 }
      );
    }
    
    // Prepare update data
    const updateData: any = {};
    const stockChange = data.currentQuantity !== undefined 
      ? parseInt(data.currentQuantity) - existingBatch.currentQuantity
      : 0;
    
    if (data.purchaseDate !== undefined) updateData.purchaseDate = new Date(data.purchaseDate);
    if (data.purchasePrice !== undefined) updateData.purchasePrice = parseFloat(data.purchasePrice);
    if (data.initialQuantity !== undefined) updateData.initialQuantity = parseInt(data.initialQuantity);
    if (data.currentQuantity !== undefined) {
      updateData.currentQuantity = parseInt(data.currentQuantity);
      updateData.status = parseInt(data.currentQuantity) > 0 ? 'active' : 'depleted';
    }
    if (data.supplier !== undefined) updateData.supplier = data.supplier;
    if (data.invoiceNumber !== undefined) updateData.invoiceNumber = data.invoiceNumber;
    if (data.notes !== undefined) updateData.notes = data.notes;
    
    // Use transaction to update both batch and product stock
    const updatedBatch = await prisma.$transaction(async (tx) => {
      // Update the batch
      const batch = await tx.batch.update({
        where: { id: data.id },
        data: updateData,
        include: { product: true }
      });
      
      // If current quantity changed, update product stock
      if (stockChange !== 0) {
        await tx.product.update({
          where: { id: existingBatch.productId },
          data: {
            totalStock: { increment: stockChange }
          }
        });
      }
      
      return batch;
    });
    
    console.log(`Updated batch ${data.id}, current quantity: ${updatedBatch.currentQuantity}`);
    
    return NextResponse.json(updatedBatch);
  } catch (error) {
    console.error('Error updating batch:', error);
    return NextResponse.json(
      { error: 'Failed to update batch' },
      { status: 500 }
    );
  }
} 