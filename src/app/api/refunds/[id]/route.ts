import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prismadb';

interface Params {
  params: Promise<{ id: string }>;
}

// GET - Get single refund details
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const refund = await prisma.refund.findFirst({
      where: {
        id,
        companyId: session.user.companyId
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

    if (!refund) {
      return NextResponse.json({ error: 'Refund not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...refund,
      unitPrice: Number(refund.unitPrice),
      totalRefundAmount: Number(refund.totalRefundAmount)
    });
  } catch (error) {
    console.error('Error fetching refund:', error);
    return NextResponse.json(
      { error: 'Failed to fetch refund' },
      { status: 500 }
    );
  }
}

// PATCH - Update refund details (limited fields)
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    // Only allow updating specific fields after creation
    const allowedUpdates = ['customReason', 'itemCondition'];
    const updates: any = {};

    for (const key of allowedUpdates) {
      if (key in data) {
        updates[key] = data[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    const refund = await prisma.refund.update({
      where: {
        id,
        companyId: session.user.companyId
      },
      data: updates,
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

    return NextResponse.json({
      ...refund,
      unitPrice: Number(refund.unitPrice),
      totalRefundAmount: Number(refund.totalRefundAmount)
    });
  } catch (error: any) {
    console.error('Error updating refund:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Refund not found' }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: 'Failed to update refund' },
      { status: 500 }
    );
  }
}

// DELETE - Delete refund and reverse inventory changes
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const result = await prisma.$transaction(async (tx: any) => {
      // Get the refund to delete
      const refund = await tx.refund.findFirst({
        where: {
          id,
          companyId: session.user!.companyId
        }
      });

      if (!refund) {
        throw new Error('Refund not found');
      }

      // If the refund returned items to inventory, reverse the changes
      if (refund.returnToInventory && (refund.itemCondition === 'NEW' || refund.itemCondition === 'OPENED')) {
        // Remove from batch quantity
        await tx.batch.update({
          where: { id: refund.batchId },
          data: {
            currentQuantity: {
              decrement: refund.quantity
            }
          }
        });

        // Remove from product total stock
        await tx.product.update({
          where: { id: refund.productId },
          data: {
            totalStock: {
              decrement: refund.quantity
            }
          }
        });
      }

      // Delete the refund
      await tx.refund.delete({
        where: { id }
      });

      return refund;
    });

    return NextResponse.json({ message: 'Refund deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting refund:', error);
    
    if (error.message === 'Refund not found') {
      return NextResponse.json({ error: 'Refund not found' }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: 'Failed to delete refund' },
      { status: 500 }
    );
  }
} 