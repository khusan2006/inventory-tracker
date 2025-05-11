"use client";

import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import { BarChart3, Calendar, TrendingUp, Download, ArrowRight } from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();
  
  const reports = [
    {
      title: 'Monthly Inventory Reports',
      description: 'Track inventory movement, sales, and profits by month with FIFO accounting',
      icon: <Calendar size={36} className="text-blue-500 dark:text-blue-400" />,
      link: '/admin/reports/monthly',
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Performance Analytics',
      description: 'Analyze product performance, profit margins, and inventory turnover',
      icon: <TrendingUp size={36} className="text-green-500 dark:text-green-400" />,
      link: '#',
      color: 'bg-green-50 dark:bg-green-900/20',
      disabled: true
    },
    {
      title: 'Export Data',
      description: 'Export inventory and sales data for use in external systems',
      icon: <Download size={36} className="text-purple-500 dark:text-purple-400" />,
      link: '#',
      color: 'bg-purple-50 dark:bg-purple-900/20',
      disabled: true
    }
  ];
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Access reports, analytics, and data exports to track your inventory performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <div 
              key={index}
              className={`${report.color} border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden ${report.disabled ? 'opacity-60' : ''}`}
            >
              <div className="p-6">
                <div className="mb-4">
                  {report.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {report.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {report.description}
                </p>
                <button
                  onClick={() => !report.disabled && router.push(report.link)}
                  disabled={report.disabled}
                  className={`flex items-center text-sm ${
                    report.disabled
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
                  }`}
                >
                  {report.disabled ? 'Coming Soon' : 'View Report'}
                  {!report.disabled && <ArrowRight size={16} className="ml-1" />}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <BarChart3 size={24} className="text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Understanding Your Reports</h2>
          </div>
          
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Your <strong>Monthly Inventory Reports</strong> provide a comprehensive view of your inventory movement and financial performance each month.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">FIFO Inventory Tracking</h3>
                <p className="text-sm">
                  Our system tracks inventory using the First-In-First-Out (FIFO) method, ensuring accurate cost accounting and profit calculations.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Month-End Procedures</h3>
                <p className="text-sm">
                  Use the monthly rollover feature to finalize each month's data and carry over your inventory to the next month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 