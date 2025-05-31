import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path if needed

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

// GET all sales
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const batchId = searchParams.get('batchId'); // Keep if direct batch filtering is needed

    let whereClause: any = { companyId: userCompanyId }; // Base filter by companyId

    if (startDate && endDate) {
      const nextDay = new Date(endDate);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
      nextDay.setUTCHours(0, 0, 0, 0);
      whereClause.saleDate = { gte: new Date(startDate), lt: nextDay };
    }
    if (batchId) {
      // Ensure the batch itself belongs to the company if filtering by batchId directly
      const batch = await prisma.batch.findFirst({
        where: { id: batchId, companyId: userCompanyId }
      });
      if (!batch) return NextResponse.json({ error: "Batch not found for your company or invalid batch ID"}, {status: 404});
      whereClause.batchId = batchId;
    }

    const sales = await prisma.sale.findMany({
      where: whereClause,
      include: {
        product: { include: { category: true } },
        batch: true
      },
      orderBy: { saleDate: 'desc' }
    });

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
      category: sale.product.category?.name,
      companyId: sale.companyId // Include companyId
    }));

    return NextResponse.json(transformedSales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json({ error: 'Failed to fetch sales data' }, { status: 500 });
  }
}

// POST a new sale
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const data = await request.json();

    // Common validations for all sale types
    if (!data.productId || !data.quantity || !data.salePrice || !data.saleDate) {
      return NextResponse.json({ error: 'Missing required fields for sale' }, { status: 400 });
    }
    const quantitySold = parseInt(data.quantity);
    if (isNaN(quantitySold) || quantitySold <= 0) {
        return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    // Use a transaction for all sale operations
    const newSale = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: data.productId, companyId: userCompanyId }
      });
      if (!product) {
        throw new Error('Product not found for your company');
      }

      let saleDataCommon = {
        productId: data.productId,
        quantity: quantitySold,
        salePrice: parseFloat(data.salePrice),
        saleDate: new Date(data.saleDate),
        customerId: data.customerId || null,
        invoiceNumber: data.invoiceNumber || null,
        companyId: userCompanyId,
        purchasePrice: 0, // Will be set based on batch(es)
        profit: 0,        // Will be calculated
        profitMargin: 0   // Will be calculated
      };

      let primaryBatchForSaleRecordId: string;
      let totalPurchasePriceForSale = 0;

      if (data.batchData && Array.isArray(data.batchData) && data.batchData.length > 0) {
        // Multi-batch sale scenario
        if (!data.batchData.every((bi: any) => bi.batchId && typeof bi.quantity === 'number' && bi.quantity > 0)) {
            throw new Error('Invalid batchData format or quantity');
        }

        let totalQuantityFromBatches = 0;
        for (const batchItem of data.batchData) {
            totalQuantityFromBatches += batchItem.quantity;
        }
        if (totalQuantityFromBatches !== quantitySold) {
            throw new Error('Total quantity from batches does not match sale quantity');
        }
        
        primaryBatchForSaleRecordId = data.batchData[0].batchId; // Use first batch for the main sale record

        for (const batchItem of data.batchData) {
          const batch = await tx.batch.findUnique({
            where: { id: batchItem.batchId, companyId: userCompanyId }
          });
          if (!batch) {
            throw new Error(`Batch ID ${batchItem.batchId} not found for your company`);
          }
          if (batch.currentQuantity < batchItem.quantity) {
            throw new Error(`Not enough stock in batch ${batch.id}. Available: ${batch.currentQuantity}, Requested: ${batchItem.quantity}`);
          }

          await tx.batch.update({
            where: { id: batch.id, companyId: userCompanyId },
            data: {
              currentQuantity: { decrement: batchItem.quantity },
              status: (batch.currentQuantity - batchItem.quantity === 0) ? 'depleted' : batch.status
            }
          });
          totalPurchasePriceForSale += batch.purchasePrice * batchItem.quantity;
        }
      } else if (data.batchId) {
        // Single batch sale scenario
        primaryBatchForSaleRecordId = data.batchId;
        const batch = await tx.batch.findUnique({
          where: { id: data.batchId, companyId: userCompanyId }
        });
        if (!batch) {
          throw new Error('Batch not found for your company');
        }
        if (batch.currentQuantity < quantitySold) {
          throw new Error(`Not enough stock in batch ${batch.id}. Available: ${batch.currentQuantity}, Requested: ${quantitySold}`);
        }
        await tx.batch.update({
          where: { id: batch.id, companyId: userCompanyId },
          data: {
            currentQuantity: { decrement: quantitySold },
            status: (batch.currentQuantity - quantitySold === 0) ? 'depleted' : batch.status
          }
        });
        totalPurchasePriceForSale = batch.purchasePrice * quantitySold;
         // Use explicitly provided purchase price for the sale record if available, else batch's purchase price
        saleDataCommon.purchasePrice = parseFloat(data.purchasePrice || batch.purchasePrice);
      } else {
        throw new Error('Either batchId or batchData (for multiple batches) must be provided.');
      }
      
      // If not provided from client, calculate purchase price based on consumed batches
      if(data.purchasePrice === undefined && (data.batchData && data.batchData.length > 0)){
          saleDataCommon.purchasePrice = totalPurchasePriceForSale / quantitySold; // Average purchase price if multi-batch
      } else if (data.purchasePrice !== undefined) {
          saleDataCommon.purchasePrice = parseFloat(data.purchasePrice);
      } // else, for single batch, it was set using batch.purchasePrice if data.purchasePrice was missing

      // Calculate profit and profit margin
      const totalSalePrice = saleDataCommon.salePrice * quantitySold;
      saleDataCommon.profit = parseFloat((totalSalePrice - (saleDataCommon.purchasePrice * quantitySold)).toFixed(2));
      if (saleDataCommon.purchasePrice > 0) {
        saleDataCommon.profitMargin = parseFloat(((saleDataCommon.profit / (saleDataCommon.purchasePrice * quantitySold)) * 100).toFixed(2));
      } else if (saleDataCommon.profit > 0) {
        saleDataCommon.profitMargin = 100; // Infinite profit margin if purchase price is 0 but sale price is > 0
      } else {
        saleDataCommon.profitMargin = 0;
      }

      const createdSale = await tx.sale.create({
        data: {
          ...saleDataCommon,
          batchId: primaryBatchForSaleRecordId, // Link to the primary batch for the sale record
        },
        include: { product: true, batch: true }
      });

      // Update product total stock
      await tx.product.update({
        where: { id: data.productId, companyId: userCompanyId },
        data: { totalStock: { decrement: quantitySold } }
      });

      return createdSale;
    });

    console.log(`Sale recorded: ${newSale.id} for company ${userCompanyId}`);
    return NextResponse.json(newSale, { status: 201 });

  } catch (error: any) {
    console.error('Error creating sale:', error);
    // Specific error messages from transaction can be passed to client
    if (error.message.includes('not found for your company') || 
        error.message.includes('Not enough stock') || 
        error.message.includes('must be provided') || 
        error.message.includes('Invalid batchData') ||
        error.message.includes('does not match sale quantity')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 });
  }
} 