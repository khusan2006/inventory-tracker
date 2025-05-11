"use client";

import React, { useState } from 'react';
import Header from '@/components/admin/Header';
import { 
  PieChart, 
  BarChart, 
  Activity, 
  Calendar, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ArrowRight,
  Package
} from 'lucide-react';
import { useRecentSalesData, formatCurrency } from '@/hooks/useSalesData';
import { useInventory } from '@/hooks/useInventory';
import SalesOverviewChart from './components/SalesOverviewChart';
import CategoryPieChart from './components/CategoryPieChart';

export default function AnalyticsPage() {
  const { data: salesData, isLoading: salesLoading } = useRecentSalesData();
  const { data: inventory, isLoading: inventoryLoading } = useInventory();
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d, 1y
  
  // Count low stock items
  const lowStockItems = React.useMemo(() => {
    if (!inventory) return 0;
    return inventory.filter(item => 
      (item.totalStock !== undefined && 
      item.minStockLevel !== undefined &&
      item.totalStock <= item.minStockLevel)
    ).length;
  }, [inventory]);
  
  // Mock data for KPIs - replace with actual data
  const mockData = {
    kpis: {
      totalRevenue: 105600,
      growth: 12.5,
      avgOrderValue: 385,
      profit: 42200,
      profitMargin: 39.5,
      lowStockItems: lowStockItems || 5
    }
  };
  
  const TimeRangeSelector = () => (
    <div className="inline-flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
      {[
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
        { value: '1y', label: 'Year' },
      ].map(range => (
        <button
          key={range.value}
          onClick={() => setTimeRange(range.value)}
          className={`px-3 py-1 text-sm font-medium rounded-md ${
            timeRange === range.value
              ? 'bg-white dark:bg-slate-800 shadow text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Insights</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                View performance metrics and business trends
              </p>
            </div>
            <TimeRangeSelector />
          </div>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(mockData.kpis.totalRevenue)}</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                  <DollarSign size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={14} className="mr-1" />
                  <span className="text-xs font-medium">{mockData.kpis.growth}%</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs previous period</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profit</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(mockData.kpis.profit)}</p>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <span className="text-xs font-medium">{mockData.kpis.profitMargin}% margin</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">on sales</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(mockData.kpis.avgOrderValue)}</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                  <Activity size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={14} className="mr-1" />
                  <span className="text-xs font-medium">4.2%</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs previous period</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{mockData.kpis.lowStockItems}</p>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
                  <Package size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center text-amber-600 dark:text-amber-400">
                  <span className="text-xs font-medium">Needs attention</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Revenue</h2>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <Download size={18} />
                </button>
              </div>
              
              <SalesOverviewChart />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sales by Category</h2>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <Download size={18} />
                </button>
              </div>
              
              <CategoryPieChart />
            </div>
          </div>
          
          {/* Reports Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Standard Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <BarChart size={20} />
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                    View
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Sales Performance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Detailed breakdown of sales by product, category, and time period</p>
              </div>
              
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={20} />
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                    View
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Profit Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Profit margins and cost analysis across all product categories</p>
              </div>
              
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <PieChart size={20} />
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                    View
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Inventory Metrics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Stock levels, turnover rates, and inventory valuation</p>
              </div>
              
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <Activity size={20} />
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                    View
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Trend Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Historical trends and future sales projections</p>
              </div>
              
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    <TrendingDown size={20} />
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                    View
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Low Performance Alert</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Products and categories with declining sales or margins</p>
              </div>
              
              <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Calendar size={20} />
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                    View
                    <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">Seasonal Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sales patterns by season, month, and day of week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 