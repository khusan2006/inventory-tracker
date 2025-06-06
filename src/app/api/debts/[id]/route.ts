import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// PATCH - Update debt status (mark as paid/pending)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status, paidDate } = await request.json();
    
    if (!status || (status !== 'paid' && status !== 'pending')) {
      return NextResponse.json({ 
        error: 'Status must be either "paid" or "pending"' 
      }, { status: 400 });
    }

    // Validate the debt belongs to the user's company
    const existingDebt = await prisma.debt.findFirst({
      where: { 
        id, 
        companyId: session.user.companyId 
      }
    });

    if (!existingDebt) {
      return NextResponse.json({ error: 'Debt not found' }, { status: 404 });
    }

    const updateData: any = { status };
    
    if (status === 'paid') {
      updateData.paidDate = paidDate ? new Date(paidDate) : new Date();
    } else {
      updateData.paidDate = null;
    }

    const updatedDebt = await prisma.debt.update({
      where: { id },
      data: updateData,
      include: {
        product: { select: { id: true, name: true, sku: true } },
        batch: { select: { id: true, purchaseDate: true, purchasePrice: true } }
      }
    });

    return NextResponse.json({
      ...updatedDebt,
      debtDate: updatedDebt.debtDate.toISOString(),
      paidDate: updatedDebt.paidDate?.toISOString(),
      createdAt: updatedDebt.createdAt.toISOString(),
      updatedAt: updatedDebt.updatedAt.toISOString(),
    });

  } catch (error) {
    console.error('Error updating debt:', error);
    return NextResponse.json({ 
      error: 'Failed to update debt record' 
    }, { status: 500 });
  }
}

// DELETE - Delete a debt record
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    // Validate the debt belongs to the user's company
    const existingDebt = await prisma.debt.findFirst({
      where: { 
        id, 
        companyId: session.user.companyId 
      }
    });

    if (!existingDebt) {
      return NextResponse.json({ error: 'Debt not found' }, { status: 404 });
    }

    await prisma.debt.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting debt:', error);
    return NextResponse.json({ 
      error: 'Failed to delete debt record' 
    }, { status: 500 });
  }
} 