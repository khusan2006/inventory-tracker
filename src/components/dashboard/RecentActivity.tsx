"use client";

import React from 'react';
import { useRecentActivity, formatCurrency } from '@/hooks/useSalesData';
import { Clock, ShoppingBag, Package, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function RecentActivity() {
  const { data: activities, isLoading, error } = useRecentActivity();
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="flex items-center justify-center h-[250px]">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (error || !activities) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="flex items-center justify-center h-[250px]">
          <p className="text-red-500 text-mobile-xs">Failed to load recent activity.</p>
        </div>
      </div>
    );
  }
  
  // Get activity icon based on product type
  const getActivityIcon = (activity: any) => {
    // Using ShoppingBag as the default icon for sales
    return <ShoppingBag className="h-4 w-4 text-green-500" />;
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-6">
        <div className="flex items-center">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2" />
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
      </div>
      
      <div className="space-y-4">
        {activities && activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <div key={activity.id} className="flex group">
                <div className="relative mr-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700">
                    {getActivityIcon(activity)}
                  </div>
                  {/* Vertical line connecting icons */}
                  <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -ml-px bg-gray-200 dark:bg-slate-700 group-last:hidden"></div>
                </div>
                
                <div className="flex-1 min-w-0 pt-1 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-mobile-xs font-medium text-gray-900 dark:text-white">
                      Sale: {activity.productName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                      {activity.timeAgo}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <p className="text-mobile-xs text-gray-600 dark:text-gray-400">
                      {activity.quantity} units at {formatCurrency(activity.salePrice)} each
                    </p>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <p className="text-mobile-xs font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(activity.revenue)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          
            <Link 
              href="/admin/sales" 
              className="mt-4 flex items-center justify-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline py-2"
            >
              View All Activity
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Clock className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-mobile-xs text-gray-500 dark:text-gray-400">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
} 