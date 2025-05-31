import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// DELETE a sale
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const saleId = params.id;

    // Use a transaction to handle the deletion and stock restoration
    await prisma.$transaction(async (tx) => {
      // First, get the sale to ensure it exists and belongs to the company
      const sale = await tx.sale.findUnique({
        where: { id: saleId, companyId: userCompanyId },
        include: { batch: true, product: true }
      });

      if (!sale) {
        throw new Error('Sale not found for your company');
      }

      // Restore the batch quantity
      await tx.batch.update({
        where: { id: sale.batchId, companyId: userCompanyId },
        data: {
          currentQuantity: { increment: sale.quantity },
          status: 'active' // Reset status to active when stock is restored
        }
      });

      // Restore the product total stock
      await tx.product.update({
        where: { id: sale.productId, companyId: userCompanyId },
        data: { totalStock: { increment: sale.quantity } }
      });

      // Delete the sale
      await tx.sale.delete({
        where: { id: saleId, companyId: userCompanyId }
      });
    });

    console.log(`Sale deleted: ${saleId} for company ${userCompanyId}`);
    return NextResponse.json({ message: 'Sale deleted successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('Error deleting sale:', error);
    if (error.message.includes('not found for your company')) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete sale' }, { status: 500 });
  }
} 