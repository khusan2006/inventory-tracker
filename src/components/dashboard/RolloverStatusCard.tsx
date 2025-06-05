'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Download, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

interface RolloverStatus {
  currentMonth: number;
  currentYear: number;
  previousMonth: number;
  previousYear: number;
  isCurrentMonthRolledOver: boolean;
  isPreviousMonthRolledOver: boolean;
  lastRolloverDate?: string;
  nextRolloverDate: string;
}

export default function RolloverStatusCard() {
  const { t } = useTranslation();
  const [rolloverStatus, setRolloverStatus] = useState<RolloverStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRolloverStatus();
  }, []);

  const fetchRolloverStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cron/monthly-rollover');
      if (!response.ok) {
        throw new Error('Failed to fetch rollover status');
      }
      const data = await response.json();
      
      // Calculate rollover status based on the API response
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // 1-based
      const currentYear = now.getFullYear();
      
      let previousMonth = currentMonth - 1;
      let previousYear = currentYear;
      if (previousMonth === 0) {
        previousMonth = 12;
        previousYear = currentYear - 1;
      }

      // Check if current user's company is in the rollover status
      const userRolloverStatus = data.rolloverStatus?.find((status: any) => 
        status.companyId === data.userCompanyId // We'll need to add this to the API
      );

      setRolloverStatus({
        currentMonth,
        currentYear,
        previousMonth,
        previousYear,
        isCurrentMonthRolledOver: false, // Current month doesn't get rolled over until next month
        isPreviousMonthRolledOver: userRolloverStatus?.isRolledOver || false,
        lastRolloverDate: userRolloverStatus?.lastRolloverDate,
        nextRolloverDate: new Date(currentYear, currentMonth, 1).toISOString() // First day of next month
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const getMonthName = (month: number) => {
    return new Date(2024, month - 1).toLocaleDateString('en-US', { month: 'long' });
  };

  const getStatusBadge = (isRolledOver: boolean) => {
    if (isRolledOver) {
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          {t('rollover.completed')}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-orange-600 border-orange-600">
        <AlertCircle className="w-3 h-3 mr-1" />
        {t('rollover.pending')}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2" />
            {t('rollover.monthlyRollover')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2" />
            {t('rollover.monthlyRollover')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRolloverStatus}
              className="mt-2"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              {t('common.retry')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!rolloverStatus) return null;

  const nextRolloverDate = new Date(rolloverStatus.nextRolloverDate);
  const daysUntilRollover = Math.ceil((nextRolloverDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2" />
            {t('rollover.monthlyRollover')}
          </div>
          <Link href="/dashboard/rollover/monthly">
            <Button variant="outline" size="sm">
              {t('rollover.manage')}
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Previous Month Status */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {getMonthName(rolloverStatus.previousMonth)} {rolloverStatus.previousYear}
            </p>
            <p className="text-xs text-gray-500">
              {t('rollover.previousMonth')}
            </p>
          </div>
          {getStatusBadge(rolloverStatus.isPreviousMonthRolledOver)}
        </div>

        {/* Current Month Status */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {getMonthName(rolloverStatus.currentMonth)} {rolloverStatus.currentYear}
            </p>
            <p className="text-xs text-gray-500">
              {t('rollover.currentMonth')}
            </p>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            {t('rollover.inProgress')}
          </Badge>
        </div>

        {/* Next Rollover Info */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{t('rollover.nextRollover')}</span>
            <span>
              {daysUntilRollover > 0 
                ? t('rollover.inDays', { days: daysUntilRollover })
                : t('rollover.today')
              }
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        {rolloverStatus.isPreviousMonthRolledOver && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                // Open Excel download for previous month
                window.open(
                  `/api/reports/monthly/export?year=${rolloverStatus.previousYear}&month=${rolloverStatus.previousMonth}`,
                  '_blank'
                );
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              {t('rollover.downloadReport')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 