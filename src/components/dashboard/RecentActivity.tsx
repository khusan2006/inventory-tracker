"use client";

import React from 'react';
import { useRecentActivity, formatCurrency } from '@/hooks/useSalesData';
import { Loader2, Clock, ShoppingCart, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function RecentActivity() {
  const { data: recentActivity, isLoading, error } = useRecentActivity();
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (error || !recentActivity) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <p className="text-red-500">Failed to load activity data.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
        <Link 
          href="/admin/sales" 
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
        >
          View all sales
          <ArrowUpRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
      
      {recentActivity.length === 0 ? (
        <div className="h-[350px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <Clock className="w-12 h-12 mb-2 opacity-50" />
          <p>No recent activity found.</p>
        </div>
      ) : (
        <div className="space-y-0 divide-y divide-gray-100 dark:divide-slate-700">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Sale: {activity.productName}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                      {formatCurrency(activity.revenue)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium mr-1">{activity.quantity} units</span>
                      <span>•</span>
                      <span className="mx-1">{activity.timeAgo}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatCurrency(activity.salePrice)} each
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {recentActivity.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-center">
          <Link 
            href="/admin/sales" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View full sales history
          </Link>
        </div>
      )}
    </div>
  );
} 