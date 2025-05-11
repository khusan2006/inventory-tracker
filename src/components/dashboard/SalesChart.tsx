"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useMonthlySalesData, formatCurrency } from '@/hooks/useSalesData';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();
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

        // Determine if we're on a small screen
        const isSmallScreen = window.innerWidth < 640;
        
        // Create the chart
        const chart = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: monthlySales.map(data => {
              // On small screens, use abbreviated month names
              const monthName = data.month;
              return isSmallScreen ? monthName.substring(0, 3) : monthName;
            }),
            datasets: [
              {
                label: t('dashboard.monthlySales'),
                data: monthlySales.map(data => data.total),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: gradient,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: isSmallScreen ? 3 : 4,
                pointHoverRadius: isSmallScreen ? 4 : 6,
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
                padding: isSmallScreen ? 8 : 12,
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
                    size: isSmallScreen ? 9 : 11,
                  },
                  maxRotation: isSmallScreen ? 45 : 0,
                  minRotation: isSmallScreen ? 45 : 0,
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
                    size: isSmallScreen ? 9 : 11,
                  },
                  callback: function(value: any) {
                    // Format y-axis values differently on mobile
                    if (isSmallScreen) {
                      // For mobile: abbreviate numbers (e.g., 1K, 2.5K)
                      if (value >= 1000) {
                        return '$' + (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'K';
                      }
                      return '$' + value;
                    }
                    // For desktop: full format with commas
                    return '$' + value.toLocaleString();
                  }
                },
                beginAtZero: true,
              }
            }
          }
        });
        
        setChartRendered(true);
        
        // Update chart on window resize
        const handleResize = () => {
          chart.destroy();
          loadChart();
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          chart.destroy();
          window.removeEventListener('resize', handleResize);
        };
      } catch (err) {
        console.error('Failed to load Chart.js', err);
      }
    };
    
    loadChart();
    
  }, [monthlySales, isLoading, t]);
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">{t('dashboard.salesOverview')}</h3>
        </div>
        <div className="h-48 sm:h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white">{t('dashboard.salesOverview')}</h3>
        </div>
        <div className="h-48 sm:h-64 flex items-center justify-center">
          <p className="text-red-500 text-mobile-xs">{t('common.failedToLoadData')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-6">
        <h3 className="text-mobile-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-0">{t('dashboard.salesOverview')}</h3>
        <div className="flex flex-col items-start sm:items-end">
          <p className="text-mobile-xs text-gray-600 dark:text-gray-400">{t('dashboard.totalSalesYTD')}</p>
          <div className="flex items-center">
            <span className="text-mobile-lg font-bold text-gray-900 dark:text-white">{formatCurrency(totalSales)}</span>
            {growthPercentage > 0 && (
              <div className={`flex items-center ml-2 ${isGrowthPositive ? 'text-green-500' : 'text-red-500'}`}>
                <ArrowUpRight className={`h-4 w-4 ${!isGrowthPositive && 'rotate-180'}`} />
                <span className="text-mobile-xs font-medium">{growthPercentage.toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-48 sm:h-64 relative">
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