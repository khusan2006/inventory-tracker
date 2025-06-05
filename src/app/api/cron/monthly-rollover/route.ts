import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// This endpoint should be called by a cron service on the 1st of every month
export async function POST(request: NextRequest) {
  // Check for authorization (cron service secret key)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get current date and calculate previous month
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-based
    const currentYear = now.getFullYear();
    
    // Calculate previous month for rollover
    let rolloverMonth = currentMonth - 1;
    let rolloverYear = currentYear;
    
    if (rolloverMonth < 0) {
      rolloverMonth = 11; // December
      rolloverYear = currentYear - 1;
    }

    console.log(`Starting automatic rollover for ${rolloverYear}-${rolloverMonth + 1}`);

    // Get all companies that need rollover
    const companies = await prisma.company.findMany();
    
    const rolloverResults = [];

    for (const company of companies) {
      try {
        // Check if company has already rolled over for this month
        const existingReport = await prisma.monthlyReport.findUnique({
          where: {
            year_month_companyId: {
              year: rolloverYear,
              month: rolloverMonth,
              companyId: company.id
            }
          }
        });

        if (existingReport?.isFinalized) {
          console.log(`Company ${company.name} already rolled over for ${rolloverYear}-${rolloverMonth + 1}`);
          rolloverResults.push({
            companyId: company.id,
            companyName: company.name,
            status: 'already_rolled_over'
          });
          continue;
        }

        // Trigger rollover via internal API call
        const rolloverResponse = await fetch(`${request.nextUrl.origin}/api/reports/monthly/rollover`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-company-id': company.id // Pass company context
          },
          body: JSON.stringify({
            year: rolloverYear,
            month: rolloverMonth + 1, // Convert back to 1-based
            generateExcel: true
          })
        });

        if (rolloverResponse.ok) {
          const rolloverData = await rolloverResponse.json();
          rolloverResults.push({
            companyId: company.id,
            companyName: company.name,
            status: 'success',
            reportId: rolloverData.reportId,
            summary: rolloverData.summary
          });
          console.log(`Successfully rolled over ${company.name} for ${rolloverYear}-${rolloverMonth + 1}`);
        } else {
          const errorData = await rolloverResponse.json();
          rolloverResults.push({
            companyId: company.id,
            companyName: company.name,
            status: 'error',
            error: errorData.error
          });
          console.error(`Failed to rollover ${company.name}:`, errorData.error);
        }

      } catch (companyError) {
        rolloverResults.push({
          companyId: company.id,
          companyName: company.name,
          status: 'error',
          error: companyError instanceof Error ? companyError.message : 'Unknown error'
        });
        console.error(`Error processing rollover for ${company.name}:`, companyError);
      }
    }

    // Send summary email/notification (you can implement this later)
    // await sendRolloverSummaryNotification(rolloverResults);

    return NextResponse.json({
      success: true,
      rolloverMonth: rolloverMonth + 1,
      rolloverYear,
      results: rolloverResults,
      summary: {
        total: companies.length,
        successful: rolloverResults.filter(r => r.status === 'success').length,
        alreadyRolledOver: rolloverResults.filter(r => r.status === 'already_rolled_over').length,
        failed: rolloverResults.filter(r => r.status === 'error').length
      }
    });

  } catch (error) {
    console.error('Error in automatic monthly rollover:', error);
    return NextResponse.json({
      error: 'Failed to execute automatic monthly rollover',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to check rollover status for current month
export async function GET(request: NextRequest) {
  // Check for authorization - either cron secret or user session
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  let isAuthorized = false;
  let userCompanyId: string | null = null;
  
  // Check if it's a cron request
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    isAuthorized = true;
  } else {
    // Check if it's a user session request
    const session = await getServerSession(authOptions);
    if (session?.user?.companyId) {
      isAuthorized = true;
      userCompanyId = session.user.companyId;
    }
  }
  
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Check previous month rollover status
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    
    if (previousMonth < 0) {
      previousMonth = 11;
      previousYear = currentYear - 1;
    }

    // If userCompanyId is provided, filter for that company only
    const companies = userCompanyId 
      ? await prisma.company.findMany({ where: { id: userCompanyId } })
      : await prisma.company.findMany();
    
    const rolloverStatus = [];

    for (const company of companies) {
      const report = await prisma.monthlyReport.findUnique({
        where: {
          year_month_companyId: {
            year: previousYear,
            month: previousMonth,
            companyId: company.id
          }
        }
      });

      rolloverStatus.push({
        companyId: company.id,
        companyName: company.name,
        isRolledOver: report?.isFinalized || false,
        reportExists: !!report,
        lastRolloverDate: report?.updatedAt?.toISOString()
      });
    }

    return NextResponse.json({
      previousMonth: previousMonth + 1,
      previousYear,
      rolloverStatus,
      userCompanyId // Include this for frontend to identify current user's company
    });

  } catch (error) {
    console.error('Error checking rollover status:', error);
    return NextResponse.json({
      error: 'Failed to check rollover status'
    }, { status: 500 });
  }
} 