import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// GET - Check for pending debts count
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const pendingDebtsCount = await prisma.debt.count({
      where: {
        companyId: session.user.companyId,
        status: 'pending'
      }
    });

    return NextResponse.json({ 
      hasPendingDebts: pendingDebtsCount > 0,
      pendingDebtsCount 
    });

  } catch (error) {
    console.error('Error checking pending debts:', error);
    return NextResponse.json({ 
      error: 'Failed to check pending debts' 
    }, { status: 500 });
  }
} 