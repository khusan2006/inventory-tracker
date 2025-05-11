"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useMonthlySalesData, formatCurrency } from '@/hooks/useSalesData';
import { ArrowUpRight, Loader2 } from 'lucide-react';

// Use a different approach for Chart.js import
import dynamic from 'next/dynamic';
const ChartComponent = dynamic(() => import('chart.js/auto').then((mod) => {
  // Required to avoid SSR issues with Chart.js
  if (typeof window === 'undefined') return () => null;
  return function ChartRenderer({ chartRef, data }: any) {
    useEffect(() => {
      if (!chartRef.current) return;

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;
      
      const chart = new mod.Chart(ctx, data);
      
      return () => {
        chart.destroy();
      };
    }, [chartRef, data]);
    
    return null;
  };
}), { ssr: false });

export default function SalesChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { data: monthlySales, isLoading, error } = useMonthlySalesData();
  const [chartRendered, setChartRendered] = useState(false);
  
  // Calculate total sales and growth
  const totalSales = monthlySales ? monthlySales.reduce((acc, curr) => acc + curr.total, 0) : 0;
  
  // Calculate growth (compare last two available months with data)
  let growthPercentage = 0;
  let isGrowthPositive = true;
  
  if (monthlySales && monthlySales.length > 0) {
    const nonZeroMonths = monthlySales.filter(m => m.total > 0);
    
    if (nonZeroMonths.length >= 2) {
      const currentMonth = nonZeroMonths[nonZeroMonths.length - 1];
      const previousMonth = nonZeroMonths[nonZeroMonths.length - 2];
      
      if (previousMonth.total > 0) {
        growthPercentage = ((currentMonth.total - previousMonth.total) / previousMonth.total) * 100;
        isGrowthPositive = growthPercentage >= 0;
        growthPercentage = Math.abs(growthPercentage);
      }
    }
  }

  // Direct chart rendering using a script approach
  useEffect(() => {
    if (!chartRef.current || !monthlySales || isLoading) return;
    
    // Load Chart.js directly
    const loadChart = async () => {
      try {
        const ChartJS = (await import('chart.js/auto')).default;
        
        // Get the context for the canvas
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
        
        // Create the chart
        const chart = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: monthlySales.map(data => data.month),
            datasets: [
              {
                label: 'Monthly Sales',
                data: monthlySales.map(data => data.total),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: gradient,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                displayColors: false,
                callbacks: {
                  label: function(context: any) {
                    return formatCurrency(context.parsed.y);
                  }
                }
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#9ca3af',
                  font: {
                    size: 11,
                  },
                },
              },
              y: {
                grid: {
                  color: 'rgba(156, 163, 175, 0.1)',
                },
                border: {
                  dash: [5, 5],
                },
                ticks: {
                  color: '#9ca3af',
                  font: {
                    size: 11,
                  },
                  callback: function(value: any) {
                    return '$' + value.toLocaleString();
                  }
                },
                beginAtZero: true,
              }
            }
          }
        });
        
        setChartRendered(true);
        
        return () => {
          chart.destroy();
        };
      } catch (err) {
        console.error('Failed to load Chart.js', err);
      }
    };
    
    loadChart();
    
  }, [monthlySales, isLoading]);
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
        </div>
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-red-500">Failed to load sales data.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales (YTD)</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalSales)}</span>
            {growthPercentage > 0 && (
              <div className={`flex items-center ml-2 ${isGrowthPositive ? 'text-green-500' : 'text-red-500'}`}>
                <ArrowUpRight className={`h-4 w-4 ${!isGrowthPositive && 'rotate-180'}`} />
                <span className="text-sm font-medium">{growthPercentage.toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-64 relative">
        {!chartRendered && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-slate-700 bg-opacity-50 rounded-lg">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
} 