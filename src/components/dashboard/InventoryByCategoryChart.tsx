'use client';

import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { BarChart } from 'lucide-react'; // For placeholder or error icon
import { useTranslation } from '@/hooks/useTranslation'; // Import useTranslation

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface InventoryByCategoryData {
  labels: string[];
  dataPoints: number[];
}

// Predefined color palette for doughnut chart segments
const CHART_COLORS = [
  'rgb(54, 162, 235)', // blue
  'rgb(255, 99, 132)', // red
  'rgb(255, 205, 86)', // yellow
  'rgb(75, 192, 192)', // green
  'rgb(153, 102, 255)', // purple
  'rgb(255, 159, 64)',  // orange
  'rgb(129, 140, 143)', // grey
  'rgb(201, 203, 207)'  // light grey
];

const InventoryByCategoryChart = () => {
  const { t } = useTranslation(); // Add this
  const [chartData, setChartData] = useState<InventoryByCategoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/inventory-by-category');
        if (!response.ok) {
          throw new Error(`Failed to fetch inventory data: ${response.statusText}`);
        }
        const data: InventoryByCategoryData = await response.json();
        setChartData(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching inventory by category data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.inventoryByCategory')}</h3>
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-slate-700 rounded">
            <div className="animate-pulse flex items-center justify-center w-48 h-48 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !chartData || chartData.dataPoints.reduce((a,b) => a+b, 0) === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.inventoryByCategory')}</h3>
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-slate-700 rounded">
          <BarChart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {error ? `${t('common.errorPrefix')}${error}` : t('dashboard.noInventoryChartData')}
          </p>
        </div>
      </div>
    );
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: t('common.products'), // Translate this label
        data: chartData.dataPoints,
        backgroundColor: chartData.labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderColor: '#fff', // White border for segments
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#4b5563', // gray-600 for dark text
          padding: 15,
          boxWidth: 12,
          font: {
            size: 13
          }
        }
      },
      title: {
        display: false, // Already have a title above the chart area
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1f2937', // gray-800
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.raw;
            if (value !== null) {
              // Use t() for pluralization
              label += value + ' ' + t('common.item', { count: parseInt(value) });
            }
            return label;
          },
          // Optional: to show percentage in tooltip
          // afterLabel: function(context: any) {
          //   const total = context.chart.getDatasetMeta(0).total;
          //   const value = context.raw;
          //   const percentage = ((value / total) * 100).toFixed(1) + '%';
          //   return '(' + percentage + ')';
          // }
        }
      }
    },
    cutout: '50%', // Makes it a doughnut chart
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.inventoryByCategory')}</h3>
      <div style={{ height: '320px' }}> {/* Consistent height with SalesTrendChart */}
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};

export default InventoryByCategoryChart; 