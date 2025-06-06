import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prismadb';
import { RefundType, RefundReason, ItemCondition } from '@/types/refund';

// GET - Fetch refunds with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const refundType = searchParams.get('refundType') as RefundType | null;
    const reason = searchParams.get('reason') as RefundReason | null;
    const itemCondition = searchParams.get('itemCondition') as ItemCondition | null;
    const productId = searchParams.get('productId');
    const processedBy = searchParams.get('processedBy');

    const skip = (page - 1) * limit;

    const whereClause: any = {
      companyId: session.user.companyId,
      ...(startDate && endDate && {
        refundDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }),
      ...(refundType && { refundType }),
      ...(reason && { reason }),
      ...(itemCondition && { itemCondition }),
      ...(productId && { productId }),
      ...(processedBy && { processedBy })
    };

    const [refunds, totalCount] = await Promise.all([
      prisma.refund.findMany({
        where: whereClause,
        include: {
          originalSale: {
            select: {
              id: true,
              saleDate: true,
              customerId: true,
              invoiceNumber: true,
              quantity: true,
              salePrice: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
              sellingPrice: true
            }
          },
          batch: {
            select: {
              id: true,
              purchasePrice: true,
              supplier: true
            }
          },
          processedByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          refundDate: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.refund.count({
        where: whereClause
      })
    ]);

    return NextResponse.json({
      refunds: refunds.map((refund: any) => ({
        ...refund,
        unitPrice: Number(refund.unitPrice),
        totalRefundAmount: Number(refund.totalRefundAmount)
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching refunds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch refunds' },
      { status: 500 }
    );
  }
}

// POST - Create new refund
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId || !session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const {
      originalSaleId,
      productId,
      batchId,
      quantity,
      unitPrice,
      refundType,
      reason,
      customReason,
      itemCondition,
      returnToInventory
    } = data;

    // Validate required fields
    if (!originalSaleId || !productId || !batchId || !quantity || !unitPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate quantity is positive
    if (quantity <= 0) {
      return NextResponse.json({ error: 'Quantity must be positive' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx: any) => {
      // Verify the original sale exists and belongs to the company
      const originalSale = await tx.sale.findFirst({
        where: {
          id: originalSaleId,
          companyId: session.user!.companyId,
          productId,
          batchId
        }
      });

      if (!originalSale) {
        throw new Error('Original sale not found or access denied');
      }

      // Check if we're trying to refund more than what was sold
      const existingRefunds = await tx.refund.findMany({
        where: {
          originalSaleId,
          productId,
          batchId
        }
      });

      const totalRefundedQuantity = existingRefunds.reduce((sum: number, refund: any) => sum + refund.quantity, 0);
      
      if (totalRefundedQuantity + quantity > originalSale.quantity) {
        throw new Error(`Cannot refund ${quantity} items. Only ${originalSale.quantity - totalRefundedQuantity} remaining from original sale.`);
      }

      // Generate refund number
      const now = new Date();
      const year = now.getFullYear();
      
      const refundCount = await tx.refund.count({
        where: {
          companyId: session.user!.companyId,
          refundDate: {
            gte: new Date(year, 0, 1),
            lt: new Date(year + 1, 0, 1)
          }
        }
      });

      const refundNumber = `REF-${year}-${String(refundCount + 1).padStart(3, '0')}`;

      // Calculate total refund amount
      const totalRefundAmount = unitPrice * quantity;

      // Create the refund
      const refund = await tx.refund.create({
        data: {
          refundNumber,
          originalSaleId,
          productId,
          batchId,
          quantity,
          unitPrice,
          totalRefundAmount,
          refundType,
          reason,
          customReason,
          itemCondition,
          returnToInventory,
          processedBy: session.user!.id,
          companyId: session.user!.companyId
        },
        include: {
          originalSale: {
            select: {
              id: true,
              saleDate: true,
              customerId: true,
              invoiceNumber: true,
              quantity: true,
              salePrice: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
              sellingPrice: true
            }
          },
          batch: {
            select: {
              id: true,
              purchasePrice: true,
              supplier: true
            }
          },
          processedByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      // If returning to inventory, update the batch quantity
      if (returnToInventory && (itemCondition === 'NEW' || itemCondition === 'OPENED')) {
        await tx.batch.update({
          where: { id: batchId },
          data: {
            currentQuantity: {
              increment: quantity
            }
          }
        });

        // Update product total stock
        await tx.product.update({
          where: { id: productId },
          data: {
            totalStock: {
              increment: quantity
            }
          }
        });
      }

      return refund;
    });

    return NextResponse.json({
      ...result,
      unitPrice: Number(result.unitPrice),
      totalRefundAmount: Number(result.totalRefundAmount)
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating refund:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json(
      { error: 'Failed to create refund' },
      { status: 500 }
    );
  }
} 