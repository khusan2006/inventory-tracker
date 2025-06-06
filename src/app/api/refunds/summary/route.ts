import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prismadb';
import { RefundType, RefundReason, ItemCondition } from '@/types/refund';

// GET - Get refund summary statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Calculate date range for this month
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const whereClause: any = {
      companyId: session.user.companyId,
      ...(startDate && endDate && {
        refundDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    };

    const thisMonthWhereClause = {
      companyId: session.user.companyId,
      refundDate: {
        gte: thisMonthStart,
        lte: thisMonthEnd
      }
    };

    // Get all refunds for the period
    const [allRefunds, thisMonthRefunds] = await Promise.all([
      prisma.refund.findMany({
        where: whereClause,
        select: {
          totalRefundAmount: true,
          refundType: true,
          reason: true,
          itemCondition: true
        }
      }),
      prisma.refund.findMany({
        where: thisMonthWhereClause,
        select: {
          totalRefundAmount: true
        }
      })
    ]);

    // Calculate totals
    const totalRefunds = allRefunds.length;
    const totalRefundAmount = allRefunds.reduce(
      (sum, refund) => sum + Number(refund.totalRefundAmount),
      0
    );

    const thisMonthRefundsCount = thisMonthRefunds.length;
    const thisMonthRefundAmount = thisMonthRefunds.reduce(
      (sum, refund) => sum + Number(refund.totalRefundAmount),
      0
    );

    // Calculate breakdowns
    const refundsByType: Record<RefundType, number> = {
      [RefundType.CASH]: 0,
      [RefundType.STORE_CREDIT]: 0,
      [RefundType.EXCHANGE]: 0
    };

    const refundsByReason: Record<RefundReason, number> = {
      [RefundReason.DEFECTIVE]: 0,
      [RefundReason.WRONG_ITEM]: 0,
      [RefundReason.CUSTOMER_CHANGE_MIND]: 0,
      [RefundReason.DUPLICATE_ORDER]: 0,
      [RefundReason.NOT_AS_DESCRIBED]: 0,
      [RefundReason.OTHER]: 0
    };

    const refundsByCondition: Record<ItemCondition, number> = {
      [ItemCondition.NEW]: 0,
      [ItemCondition.OPENED]: 0,
      [ItemCondition.DAMAGED]: 0,
      [ItemCondition.DEFECTIVE]: 0
    };

    // Count occurrences
    allRefunds.forEach(refund => {
      refundsByType[refund.refundType as RefundType]++;
      refundsByReason[refund.reason as RefundReason]++;
      refundsByCondition[refund.itemCondition as ItemCondition]++;
    });

    const summary = {
      totalRefunds,
      totalRefundAmount,
      refundsByType,
      refundsByReason,
      refundsByCondition,
      thisMonthRefunds: thisMonthRefundsCount,
      thisMonthRefundAmount
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching refund summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch refund summary' },
      { status: 500 }
    );
  }
} 