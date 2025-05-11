import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

interface SaleWithProduct {
  id: string;
  productId: string;
  productName: string;
  batchId: string;
  quantity: number;
  salePrice: number;
  purchasePrice: number;
  profit: number;
  profitMargin: number;
  saleDate: string;
  category: string | null;
}

// GET all sales or filter by productId or batchId
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const batchId = searchParams.get('batchId');
    
    // Build filters
    let whereClause: any = {};
    
    if (startDate && endDate) {
      whereClause.saleDate = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }
    
    if (batchId) {
      whereClause.batchId = batchId;
    }
    
    // Fetch sales with product details
    const sales = await prisma.sale.findMany({
      where: whereClause,
      include: {
        product: {
          include: {
            category: true
          }
        },
        batch: true
      },
      orderBy: {
        saleDate: 'desc'
      }
    });
    
    // Transform the data for the frontend
    const transformedSales = sales.map((sale: any) => ({
      id: sale.id,
      productId: sale.productId,
      productName: sale.product.name,
      batchId: sale.batchId,
      quantity: sale.quantity,
      salePrice: sale.salePrice,
      purchasePrice: sale.purchasePrice,
      profit: sale.profit,
      profitMargin: sale.profitMargin,
      saleDate: sale.saleDate.toISOString(),
      category: sale.product.category?.name
    }));
    
    return NextResponse.json(transformedSales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
}

// POST a new sale
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Check if we're receiving batchData array (multiple batches for one sale)
    if (data.batchData && Array.isArray(data.batchData)) {
      if (!data.productId || !data.quantity || !data.salePrice || !data.saleDate) {
        return NextResponse.json(
          { error: 'Missing required fields', data },
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
      
      // Process first batch as primary batch for the sale
      const primaryBatchData = data.batchData[0];
      if (!primaryBatchData || !primaryBatchData.batchId) {
        return NextResponse.json(
          { error: 'No valid batch data provided' },
          { status: 400 }
        );
      }
      
      // Check if primary batch exists
      const primaryBatch = await prisma.batch.findUnique({
        where: { id: primaryBatchData.batchId }
      });
      
      if (!primaryBatch) {
        return NextResponse.json(
          { error: 'Primary batch not found' },
          { status: 404 }
        );
      }
      
      // Create new sale with primary batch
      const profit = parseFloat(data.profit || '0');
      const profitMargin = parseFloat(data.profitMargin || '0');
      
      const newSale = await prisma.sale.create({
        data: {
          productId: data.productId,
          batchId: primaryBatchData.batchId,
          quantity: parseInt(data.quantity),
          salePrice: parseFloat(data.salePrice),
          purchasePrice: data.purchasePrice || primaryBatch.purchasePrice,
          profit,
          profitMargin,
          saleDate: new Date(data.saleDate),
          customerId: data.customerId || null,
          invoiceNumber: data.invoiceNumber || null
        },
        include: {
          product: true,
          batch: true
        }
      });
      
      // Update the quantity of all batches involved in this sale
      for (const batchItem of data.batchData) {
        const batch = await prisma.batch.findUnique({
          where: { id: batchItem.batchId }
        });
        
        if (batch) {
          const newQuantity = Math.max(0, batch.currentQuantity - batchItem.quantity);
          const newStatus = newQuantity === 0 ? 'depleted' : batch.status;
          
          await prisma.batch.update({
            where: { id: batchItem.batchId },
            data: {
              currentQuantity: newQuantity,
              status: newStatus
            }
          });
        }
      }
      
      // Update product total stock
      const newTotalStock = Math.max(0, product.totalStock - parseInt(data.quantity));
      await prisma.product.update({
        where: { id: data.productId },
        data: {
          totalStock: newTotalStock
        }
      });
      
      console.log('Sale recorded with multiple batches:', newSale);
      
      return NextResponse.json(newSale, { status: 201 });
    } 
    // Original logic for single batch sales
    else {
      // Validate required fields
      if (!data.productId || !data.batchId || !data.quantity || !data.salePrice || 
          !data.purchasePrice || !data.saleDate) {
        return NextResponse.json(
          { error: 'Missing required fields', data },
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
      
      // Check if batch exists
      const batch = await prisma.batch.findUnique({
        where: { id: data.batchId }
      });
      
      if (!batch) {
        return NextResponse.json(
          { error: 'Batch not found' },
          { status: 404 }
        );
      }
      
      // Create new sale
      const quantity = parseInt(data.quantity);
      const salePrice = parseFloat(data.salePrice);
      const purchasePrice = parseFloat(data.purchasePrice);
      const profit = parseFloat(data.profit || (salePrice * quantity - purchasePrice * quantity).toFixed(2));
      const profitMargin = parseFloat(data.profitMargin || ((profit / (purchasePrice * quantity)) * 100).toFixed(2));
      
      const newSale = await prisma.sale.create({
        data: {
          productId: data.productId,
          batchId: data.batchId,
          quantity,
          salePrice,
          purchasePrice,
          profit,
          profitMargin,
          saleDate: new Date(data.saleDate),
          customerId: data.customerId || null,
          invoiceNumber: data.invoiceNumber || null
        },
        include: {
          product: true,
          batch: true
        }
      });
      
      console.log('Sale recorded:', newSale);
      
      return NextResponse.json(newSale, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating sale:', error);
    return NextResponse.json(
      { error: 'Failed to create sale' },
      { status: 500 }
    );
  }
} 