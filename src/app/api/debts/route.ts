import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import type { CreateDebtInput } from '@/types/debt';

// GET - Fetch all debts for the authenticated user's company
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status'); // Filter by status if provided
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const skip = (page - 1) * limit;

  try {
    const whereClause: any = { companyId: session.user.companyId };
    if (status && (status === 'pending' || status === 'paid')) {
      whereClause.status = status;
    }

    const [debts, totalCount] = await Promise.all([
      prisma.debt.findMany({
        where: whereClause,
        include: {
          product: {
            select: { id: true, name: true, sku: true }
          },
          batch: {
            select: { id: true, purchaseDate: true, purchasePrice: true }
          }
        },
        orderBy: { debtDate: 'desc' },
        skip,
        take: limit
      }),
      prisma.debt.count({ where: whereClause })
    ]);

    // Calculate summary stats
    const summary = await prisma.debt.aggregate({
      where: { companyId: session.user.companyId },
      _count: { id: true },
      _sum: { totalAmount: true }
    });

    const pendingSummary = await prisma.debt.aggregate({
      where: { companyId: session.user.companyId, status: 'pending' },
      _count: { id: true },
      _sum: { totalAmount: true }
    });

    const paidSummary = await prisma.debt.aggregate({
      where: { companyId: session.user.companyId, status: 'paid' },
      _count: { id: true },
      _sum: { totalAmount: true }
    });

    return NextResponse.json({
      debts: debts.map(debt => ({
        ...debt,
        debtDate: debt.debtDate.toISOString(),
        paidDate: debt.paidDate?.toISOString(),
        createdAt: debt.createdAt.toISOString(),
        updatedAt: debt.updatedAt.toISOString(),
      })),
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      },
      summary: {
        totalDebts: summary._count.id || 0,
        totalAmount: summary._sum.totalAmount || 0,
        pendingDebts: pendingSummary._count.id || 0,
        pendingAmount: pendingSummary._sum.totalAmount || 0,
        paidDebts: paidSummary._count.id || 0,
        paidAmount: paidSummary._sum.totalAmount || 0,
      }
    });
  } catch (error) {
    console.error('Error fetching debts:', error);
    return NextResponse.json({ error: 'Failed to fetch debts' }, { status: 500 });
  }
}

// POST - Create a new debt record
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data: CreateDebtInput = await request.json();
    
    if (!data.productId || !data.quantity || !data.unitPrice || !data.batchData?.length) {
      return NextResponse.json({ 
        error: 'Product ID, quantity, unit price, and batch data are required' 
      }, { status: 400 });
    }

    // Validate the product belongs to the user's company
    const product = await prisma.product.findFirst({
      where: { 
        id: data.productId, 
        companyId: session.user.companyId 
      },
      include: { batches: true }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Validate batch availability using FIFO
    const availableBatches = product.batches
      .filter(batch => batch.status === 'active' && batch.currentQuantity > 0)
      .sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());

    let remainingQuantity = data.quantity;
    const batchesToUpdate: { id: string; quantityToUse: number; purchasePrice: number }[] = [];

    for (const batchData of data.batchData) {
      const batch = availableBatches.find(b => b.id === batchData.batchId);
      if (!batch) {
        return NextResponse.json({ 
          error: `Batch ${batchData.batchId} not found or not available` 
        }, { status: 400 });
      }

      if (batch.currentQuantity < batchData.quantity) {
        return NextResponse.json({ 
          error: `Not enough stock in batch ${batch.id}. Available: ${batch.currentQuantity}, Requested: ${batchData.quantity}` 
        }, { status: 400 });
      }

      batchesToUpdate.push({
        id: batch.id,
        quantityToUse: batchData.quantity,
        purchasePrice: batch.purchasePrice
      });

      remainingQuantity -= batchData.quantity;
    }

    if (remainingQuantity !== 0) {
      return NextResponse.json({ 
        error: 'Batch quantities do not match the total debt quantity' 
      }, { status: 400 });
    }

    // Calculate total amount and weighted average purchase price
    const totalAmount = data.quantity * data.unitPrice;
    const totalCost = batchesToUpdate.reduce((sum, batch) => 
      sum + (batch.quantityToUse * batch.purchasePrice), 0
    );
    const averagePurchasePrice = totalCost / data.quantity;

    // Create debt records and update batches in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create debt records for each batch
      const debts = [];
      for (const batchUpdate of batchesToUpdate) {
        const debt = await tx.debt.create({
          data: {
            quantity: batchUpdate.quantityToUse,
            unitPrice: data.unitPrice,
            totalAmount: batchUpdate.quantityToUse * data.unitPrice,
            purchasePrice: batchUpdate.purchasePrice,
            debtDate: new Date(),
            customerName: data.customerName,
            notes: data.notes,
            status: 'pending',
            productId: data.productId,
            batchId: batchUpdate.id,
            companyId: session.user.companyId!
          },
          include: {
            product: { select: { id: true, name: true, sku: true } },
            batch: { select: { id: true, purchaseDate: true, purchasePrice: true } }
          }
        });
        debts.push(debt);

        // Update batch quantity
                 // Get current quantity before update
         const currentBatch = await tx.batch.findUnique({
           where: { id: batchUpdate.id },
           select: { currentQuantity: true }
         });

         await tx.batch.update({
           where: { id: batchUpdate.id },
           data: {
             currentQuantity: {
               decrement: batchUpdate.quantityToUse
             },
             status: currentBatch!.currentQuantity - batchUpdate.quantityToUse <= 0 ? 'depleted' : 'active'
           }
         });
      }

      // Update product total stock
      await tx.product.update({
        where: { id: data.productId },
        data: {
          totalStock: {
            decrement: data.quantity
          }
        }
      });

      return debts;
    });

    return NextResponse.json({ 
      success: true, 
      debts: result.map(debt => ({
        ...debt,
        debtDate: debt.debtDate.toISOString(),
        createdAt: debt.createdAt.toISOString(),
        updatedAt: debt.updatedAt.toISOString(),
      }))
    });

  } catch (error) {
    console.error('Error creating debt:', error);
    return NextResponse.json({ 
      error: 'Failed to create debt record' 
    }, { status: 500 });
  }
} 