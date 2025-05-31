'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { BarChart } from 'lucide-react'; // For placeholder
import { useTranslation } from '@/hooks/useTranslation'; // Import useTranslation

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesTrendData {
  labels: string[];
  dataPoints: number[];
}

const SalesTrendChart = () => {
  const { t, i18n } = useTranslation(); // Add i18n here
  const [chartData, setChartData] = useState<SalesTrendData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/sales-trend');
        if (!response.ok) {
          throw new Error(`Failed to fetch sales trend: ${response.statusText}`);
        }
        const data: SalesTrendData = await response.json();
        setChartData(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching sales trend data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.salesTrendLast30Days')}</h3>
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-slate-700 rounded">
          <div className="animate-pulse flex space-x-4 w-full p-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !chartData) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.salesTrendLast30Days')}</h3>
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-slate-700 rounded">
          <BarChart className="w-12 h-12 text-red-400 dark:text-red-500" />
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            {error ? `${t('common.errorPrefix')}${error}` : t('dashboard.noDataChart')}
          </p>
        </div>
      </div>
    );
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: t('dashboard.salesUSD'),
        data: chartData.dataPoints,
        fill: true,
        borderColor: 'rgb(79, 70, 229)', // indigo-600
        backgroundColor: 'rgba(79, 70, 229, 0.1)', // lighter indigo for area
        tension: 0.3,
        pointBackgroundColor: 'rgb(79, 70, 229)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(79, 70, 229)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: string | number) {
            if (typeof value === 'number') return '$' + value;
            return value;
          },
          color: '#6b7280', // gray-500
        },
        grid: {
          color: '#e5e7eb', // gray-200
          borderColor: '#d1d5db' // gray-300
        }
      },
      x: {
        ticks: {
          color: '#6b7280', // gray-500
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false, // Hide x-axis grid lines for a cleaner look
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Can be set to true if multiple datasets
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1f2937', // gray-800
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat(i18n.language, { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.salesTrendLast30Days')}</h3>
      <div style={{ height: '320px' }}> {/* Or any other fixed height */}
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default SalesTrendChart; 