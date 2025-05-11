"use client";

import { useState } from 'react';
import { useTopSellingProducts, formatCurrency } from '@/hooks/useSalesData';
import { Package, BarChart2, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  quantity: number;
  revenue: number;
  profit: number;
}

export default function TopSellingProducts() {
  const { data: products, isLoading, error } = useTopSellingProducts();
  const [timeFrame, setTimeFrame] = useState<'week' | 'month'>('month');
  
  // Display top 5 products
  const displayProducts = products?.slice(0, 5) || [];
  
  // Get the highest quantity for progress bar scaling
  const maxQuantity = products?.[0]?.totalQuantity || 0;
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-6">
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
        </div>
        <div className="flex items-center justify-center min-h-[250px]">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (error || !products) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-6">
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
        </div>
        <div className="flex items-center justify-center min-h-[250px]">
          <p className="text-red-500 text-mobile-xs">Failed to load product data.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
      <div className="flex justify-between items-center mb-3 sm:mb-6">
        <div className="flex items-center">
          <BarChart2 className="text-blue-500 mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
        </div>
        
        <div className="flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 text-xs sm:text-sm">
          <button 
            className={`px-2 sm:px-3 py-1 ${timeFrame === 'week' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setTimeFrame('week')}
          >
            Week
          </button>
          <button 
            className={`px-2 sm:px-3 py-1 ${timeFrame === 'month' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}
            onClick={() => setTimeFrame('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {displayProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-4 min-h-[200px]">
          <Package className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-mobile-xs text-gray-500 dark:text-gray-400">No products sold in this period.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayProducts.map((product, index) => (
            <div key={product.id} className="flex items-start sm:items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h4 className="text-mobile-xs font-medium text-gray-900 dark:text-white truncate pr-4">
                    {product.name}
                  </h4>
                  <div className="flex items-center mt-1 sm:mt-0">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2">
                      {product.totalQuantity} sold
                    </span>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(product.totalRevenue)}
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mb-1">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${(product.totalQuantity / maxQuantity) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-2">{product.category}</span>
                  <span className="hidden sm:inline mx-1">•</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {((product.totalRevenue * 0.3) / product.totalRevenue * 100).toFixed(1)}% profit margin
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          <Link 
            href="/admin/sales" 
            className="flex items-center justify-center mt-4 text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline py-2"
          >
            View All Sales
            <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
} 