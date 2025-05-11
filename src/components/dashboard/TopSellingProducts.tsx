"use client";

import React from 'react';
import { useTopSellingProducts, formatCurrency } from '@/hooks/useSalesData';
import { Package, Loader2, TrendingUp } from 'lucide-react';

export default function TopSellingProducts() {
  const { data: topProducts, isLoading, error } = useTopSellingProducts();
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (error || !topProducts) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <p className="text-red-500">Failed to load product data.</p>
        </div>
      </div>
    );
  }
  
  // Calculate total quantity for percentage calculation
  const totalQuantity = topProducts.reduce((acc, product) => acc + product.totalQuantity, 0);
  
  // Colors for the bars
  const colors = [
    'bg-blue-500 dark:bg-blue-600',
    'bg-emerald-500 dark:bg-emerald-600',
    'bg-purple-500 dark:bg-purple-600',
    'bg-amber-500 dark:bg-amber-600',
    'bg-rose-500 dark:bg-rose-600',
  ];
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          Last 90 days
        </span>
      </div>
      
      {topProducts.length === 0 ? (
        <div className="h-[350px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <Package className="w-12 h-12 mb-2 opacity-50" />
          <p>No sales data available.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {topProducts.map((product, index) => {
            const percentage = totalQuantity > 0 
              ? (product.totalQuantity / totalQuantity) * 100 
              : 0;
              
            return (
              <div key={product.id} className="space-y-1">
                <div className="flex justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </span>
                    {product.category && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.totalQuantity} units
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(product.totalRevenue)}
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2.5">
                    <div 
                      className={`${colors[index % colors.length]} h-2.5 rounded-full`} 
                      style={{ width: `${percentage}%` }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 