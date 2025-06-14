'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { StatCard } from '@/components/dashboard/DashboardWidgets';
import { Package, ListChecks, DollarSign, AlertTriangle } from 'lucide-react';
import SalesTrendChart from '@/components/dashboard/SalesTrendChart';
import InventoryByCategoryChart from '@/components/dashboard/InventoryByCategoryChart';
import RecentActivityFeed from '@/components/dashboard/RecentActivityFeed';
import RolloverStatusCard from '@/components/dashboard/RolloverStatusCard';
import { useTranslation } from '@/hooks/useTranslation';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  salesThisMonth: number;
  lowStockItems: number;
}

export default function DashboardHomePage() {
  const { data: session, status } = useSession();
  const { t, i18n } = useTranslation();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.companyId) {
      async function fetchStats() {
        try {
          setLoadingStats(true);
          const response = await fetch('/api/dashboard/stats');
          if (!response.ok) {
            throw new Error(`Failed to fetch stats: ${response.statusText}`);
          }
          const data = await response.json();
          setStats(data);
        } catch (err: any) {
          setErrorStats(err.message);
          console.error('Error fetching dashboard stats:', err);
        } finally {
          setLoadingStats(false);
        }
      }
      fetchStats();
    } else if (status === "unauthenticated") {
      redirect('/auth/signin');
    }
  }, [session, status]);

  if (status === "loading" || (status === "authenticated" && loadingStats)) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
    );
  }

  if (status === "authenticated" && !session?.user?.companyId) {
    redirect('/auth/signin');
    return null;
  }

  const statCardData = [
    { title: t('dashboard.stat.totalProducts'), value: stats?.totalProducts?.toString() ?? "-", icon: <Package size={24} />, color: "blue" as const, unit: t('common.items_label') },
    { title: t('dashboard.stat.totalCategories'), value: stats?.totalCategories?.toString() ?? "-", icon: <ListChecks size={24} />, color: "indigo" as const, unit: t('common.categories_label') },
    { title: t('dashboard.stat.salesThisMonth'), value: stats?.salesThisMonth?.toLocaleString(i18n.language, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) ?? "-", icon: <DollarSign size={24} />, color: "green" as const /* unit is part of value */ },
    { title: t('dashboard.stat.lowStockItems'), value: stats?.lowStockItems?.toString() ?? "-", icon: <AlertTriangle size={24} />, color: "amber" as const, unit: t('common.items_label') },
  ];

  if (errorStats) {
    return (
        <div className="flex flex-col justify-center items-center h-screen text-red-500">
            <AlertTriangle size={48} className="mb-4"/>
            <p className="text-xl">{t('dashboard.errorLoadingData')}</p>
            <p>{errorStats}</p>
        </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {t('dashboard.welcomeBack', { user: session?.user?.name || session?.user?.email || 'User' })}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('dashboard.performanceOverview')}
        </p>
      </div>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCardData.map(stat => (
          <StatCard 
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            unit={stat.title === t('dashboard.stat.salesThisMonth') ? undefined : stat.unit}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTrendChart />
        <InventoryByCategoryChart />
      </div>

      {/* Rollover Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RolloverStatusCard />
        </div>
        <div className="lg:col-span-2">
          {/* Quick Actions or additional info can go here */}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <RecentActivityFeed />
      </div>
    </div>
  );
} 