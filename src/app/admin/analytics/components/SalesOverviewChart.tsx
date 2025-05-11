"use client";

import React, { useMemo } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMonthlySalesData } from '@/hooks/useSalesData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesOverviewChart() {
  const { data: monthlySalesData, isLoading, error } = useMonthlySalesData();
  
  const chartData = useMemo(() => {
    if (!monthlySalesData) return {
      labels: [],
      datasets: []
    };
    
    return {
      labels: monthlySalesData.map(item => item.month),
      datasets: [
        {
          label: 'Monthly Revenue',
          data: monthlySalesData.map(item => item.total),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 4,
          hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)'
        }
      ]
    };
  }, [monthlySalesData]);
  
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6
        }
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
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
      <Bar data={chartData} options={options} />
    </div>
  );
} 