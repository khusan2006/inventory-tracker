"use client";

import React, { useMemo } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { Loader2, Package, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/hooks/useSalesData';

export default function InventorySummary() {
  const { data: inventory, isLoading, error } = useInventory();
  
  // Calculate inventory metrics
  const metrics = useMemo(() => {
    if (!inventory || inventory.length === 0) {
      return { 
        totalProducts: 0,
        totalStock: 0,
        lowStockCount: 0,
        outOfStockCount: 0,
        totalValue: 0,
        categories: [],
      };
    }
    
    // Map to track categories and their stock
    const categoryMap = new Map<string, { count: number, stock: number }>();
    
    // Calculate metrics
    let totalStock = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let totalValue = 0;
    
    // Process each product
    inventory.forEach(product => {
      // Count total stock
      totalStock += product.totalStock;
      
      // Count low stock and out of stock products
      if (product.totalStock <= 0) {
        outOfStockCount++;
      } else if (product.totalStock <= (product.minStockLevel || 5)) {
        lowStockCount++;
      }
      
      // Calculate estimated inventory value
      totalValue += product.totalStock * (product.avgPurchasePrice || product.sellingPrice * 0.6);
      
      // Update category data
      const categoryName = typeof product.category === 'object' && product.category !== null && 'name' in product.category
        ? product.category.name
        : (product.category as string) || 'Uncategorized';
        
      const existingCategory = categoryMap.get(categoryName);
      
      if (existingCategory) {
        existingCategory.count++;
        existingCategory.stock += product.totalStock;
      } else {
        categoryMap.set(categoryName, { count: 1, stock: product.totalStock });
      }
    });
    
    // Convert category map to sorted array (by stock quantity descending)
    const categories = Array.from(categoryMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        stock: data.stock,
      }))
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 5); // Top 5 categories
    
    return {
      totalProducts: inventory.length,
      totalStock,
      lowStockCount,
      outOfStockCount,
      totalValue,
      categories,
    };
  }, [inventory]);
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Summary</h3>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (error || !inventory) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Summary</h3>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <p className="text-red-500">Failed to load inventory data.</p>
        </div>
      </div>
    );
  }
  
  // Colors for category bars
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Summary</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {metrics.totalProducts} products
        </span>
      </div>
      
      {inventory.length === 0 ? (
        <div className="h-[350px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <Package className="w-12 h-12 mb-2 opacity-50" />
          <p>No inventory data available.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Stock</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metrics.totalStock}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">units across all products</div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
              <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Inventory Value</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(metrics.totalValue)}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">based on purchase prices</div>
            </div>
          </div>
          
          {/* Alerts for low/out of stock */}
          {(metrics.lowStockCount > 0 || metrics.outOfStockCount > 0) && (
            <div className="mb-6">
              {metrics.outOfStockCount > 0 && (
                <div className="flex items-center mb-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                  <AlertTriangle size={16} className="mr-2" />
                  <span className="text-sm font-medium">{metrics.outOfStockCount} products out of stock</span>
                </div>
              )}
              
              {metrics.lowStockCount > 0 && (
                <div className="flex items-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                  <AlertTriangle size={16} className="mr-2" />
                  <span className="text-sm font-medium">{metrics.lowStockCount} products low on stock</span>
                </div>
              )}
            </div>
          )}
          
          {/* Category breakdown */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Stock by Category</h4>
            <div className="space-y-3">
              {metrics.categories.map((category, index) => {
                // Calculate percentage for the bar width
                const percentage = (category.stock / metrics.totalStock) * 100;
                
                return (
                  <div key={category.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {category.stock} units ({category.count} products)
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2.5">
                      <div 
                        className={`${colors[index % colors.length]} h-2.5 rounded-full`} 
                        style={{ width: `${percentage}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 