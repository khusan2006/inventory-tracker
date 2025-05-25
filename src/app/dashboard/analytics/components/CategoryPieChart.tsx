"use client";

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useRecentSalesData } from '@/hooks/useSalesData';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function CategoryPieChart() {
  const { data: salesData, isLoading, error } = useRecentSalesData();
  
  const chartData = useMemo(() => {
    if (!salesData || salesData.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };
    }
    
    // Group sales by category
    const categoryMap = new Map();
    
    salesData.forEach(sale => {
      const category = sale.category || 'Uncategorized';
      const currentAmount = categoryMap.get(category) || 0;
      categoryMap.set(category, currentAmount + (sale.quantity * sale.salePrice));
    });
    
    // Sort by sales amount (descending)
    const sortedCategories = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1]);
    
    // Colors for categories (adjust as needed)
    const colors = [
      'rgba(59, 130, 246, 0.7)',  // blue
      'rgba(16, 185, 129, 0.7)',  // emerald
      'rgba(139, 92, 246, 0.7)',  // purple
      'rgba(245, 158, 11, 0.7)',  // amber
      'rgba(239, 68, 68, 0.7)',   // red
      'rgba(14, 165, 233, 0.7)',  // sky
      'rgba(168, 85, 247, 0.7)',  // fuchsia
      'rgba(20, 184, 166, 0.7)',  // teal
    ];
    
    const borderColors = [
      'rgba(59, 130, 246, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(239, 68, 68, 1)',
      'rgba(14, 165, 233, 1)',
      'rgba(168, 85, 247, 1)',
      'rgba(20, 184, 166, 1)',
    ];
    
    return {
      labels: sortedCategories.map(([category]) => category),
      datasets: [
        {
          data: sortedCategories.map(([, amount]) => amount),
          backgroundColor: sortedCategories.map((_, index) => colors[index % colors.length]),
          borderColor: sortedCategories.map((_, index) => borderColors[index % borderColors.length]),
          borderWidth: 1,
        },
      ],
    };
  }, [salesData]);
  
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const total = (context.chart.data.datasets[0].data as number[]).reduce((a, b) => (a as number) + (b as number), 0) as number;
            const percentage = Math.round((value / total) * 100);
            
            return `${label}: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(value)} (${percentage}%)`;
          }
        }
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="animate-pulse text-gray-400">Loading chart data...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-64 flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="text-red-500">Failed to load chart data</div>
      </div>
    );
  }
  
  return (
    <div className="h-64 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <Pie data={chartData} options={options} />
    </div>
  );
} 