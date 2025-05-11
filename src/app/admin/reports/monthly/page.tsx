"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  Package, 
  BarChart3, 
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { MonthlyReport, MonthlyProductReport } from '@/types/inventory';

export default function MonthlyReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRollingOver, setIsRollingOver] = useState(false);
  
  // Default to current month
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1); // 1-indexed for UI
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  useEffect(() => {
    fetchMonthlyReport();
  }, [selectedYear, selectedMonth]);
  
  const fetchMonthlyReport = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/reports/monthly?year=${selectedYear}&month=${selectedMonth}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch monthly report');
      }
      
      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      console.error('Error fetching report:', err);
      setError(err.message || 'Failed to load report data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePreviousMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear = selectedYear - 1;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };
  
  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear = selectedYear + 1;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };
  
  const handleMonthRollover = async () => {
    if (isRollingOver) return;
    
    // Confirm before proceeding
    const confirmRollover = confirm(
      `Are you sure you want to finalize the report for ${monthNames[selectedMonth-1]} ${selectedYear} and roll over to the next month? This action cannot be undone.`
    );
    
    if (!confirmRollover) return;
    
    setIsRollingOver(true);
    
    try {
      const response = await fetch('/api/reports/monthly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: selectedYear,
          month: selectedMonth,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process month rollover');
      }
      
      const data = await response.json();
      
      // Update to the next month
      setSelectedMonth(data.nextMonth);
      setSelectedYear(data.nextYear);
      
      alert(`Month successfully rolled over from ${monthNames[selectedMonth-1]} ${selectedYear} to ${monthNames[data.nextMonth-1]} ${data.nextYear}`);
      
    } catch (err: any) {
      console.error('Error during rollover:', err);
      alert(`Failed to process month rollover: ${err.message}`);
    } finally {
      setIsRollingOver(false);
    }
  };
  
  const handleExportReport = () => {
    if (!report) return;
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header row
    csvContent += "Product ID,Product Name,SKU,Category,Starting Qty,Ending Qty,Purchased Qty,Sold Qty,Revenue,Cost,Profit,Margin\n";
    
    // Data rows
    report.products.forEach(product => {
      csvContent += `${product.productId},`;
      csvContent += `"${product.productName}",`;
      csvContent += `${product.sku},`;
      csvContent += `${product.category},`;
      csvContent += `${product.startingQuantity},`;
      csvContent += `${product.endingQuantity},`;
      csvContent += `${product.purchasedQuantity},`;
      csvContent += `${product.soldQuantity},`;
      csvContent += `${product.revenue.toFixed(2)},`;
      csvContent += `${product.cost.toFixed(2)},`;
      csvContent += `${product.profit.toFixed(2)},`;
      csvContent += `${product.profitMargin.toFixed(2)}%\n`;
    });
    
    // Create a download link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Inventory_Report_${selectedYear}_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Format currency values for display
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };
  
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
        {/* Back button */}
        <button 
          onClick={() => router.back()} 
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
        
        {/* Report header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Monthly Inventory Report</h1>
              <div className="flex items-center mt-1">
                <Calendar size={18} className="text-gray-500 dark:text-gray-400 mr-1" />
                <span className="text-gray-600 dark:text-gray-300">
                  {monthNames[selectedMonth-1]} {selectedYear}
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePreviousMonth}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                >
                  {monthNames.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                >
                  {Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i).map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                
                <button 
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <button 
                onClick={handleExportReport}
                disabled={!report || isLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} className="mr-2" />
                Export
              </button>
              
              <button 
                onClick={handleMonthRollover}
                disabled={
                  isRollingOver || 
                  isLoading || 
                  !report || 
                  (selectedYear === currentDate.getFullYear() && 
                   selectedMonth === currentDate.getMonth() + 1)
                }
                className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={18} className={`mr-2 ${isRollingOver ? 'animate-spin' : ''}`} />
                Rollover to Next Month
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading report data...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Error Loading Report</h2>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          ) : report ? (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Revenue</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(report.totalRevenue)}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    From {report.totalSold} items sold
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Profit</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(report.totalProfit)}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {report.avgProfitMargin.toFixed(2)}% margin
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Inventory Added</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {report.totalPurchased} items
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Cost: {formatCurrency(report.totalCost)}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Inventory Change</h3>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {report.totalEndingInventory - report.totalStartingInventory >= 0 ? '+' : ''}
                    {report.totalEndingInventory - report.totalStartingInventory} items
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    From {report.totalStartingInventory} to {report.totalEndingInventory}
                  </div>
                </div>
              </div>
              
              {/* Product List */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Product Performance</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Starting Inventory
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Purchased
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Sold
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Ending Inventory
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Profit
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {report.products.map((product) => (
                        <tr key={product.productId} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                                <Package size={20} className="text-gray-500 dark:text-gray-400" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{product.productName}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{product.sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {product.startingQuantity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <span className={product.purchasedQuantity > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                              {product.purchasedQuantity > 0 ? '+' : ''}{product.purchasedQuantity}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <span className={product.soldQuantity > 0 ? 'text-amber-600 dark:text-amber-400' : ''}>
                              {product.soldQuantity > 0 ? '-' : ''}{product.soldQuantity}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {product.endingQuantity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {formatCurrency(product.revenue)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                            {formatCurrency(product.profit)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                            {product.profitMargin.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                      
                      {report.products.length === 0 && (
                        <tr>
                          <td colSpan={8} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                            No product data available for this month.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">No report data available. Select a different month or try again later.</p>
            </div>
          )}
        </div>
        
        {/* Instructions for month rollover */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <InfoIcon size={20} className="mr-2 text-blue-500" />
            Month-End Procedure
          </h2>
          
          <div className="text-gray-700 dark:text-gray-300 space-y-3">
            <p>At the end of each month, use the "Rollover to Next Month" button to:</p>
            
            <ol className="list-decimal ml-5 space-y-2">
              <li>Finalize the current month's inventory report</li>
              <li>Transfer your current inventory quantities to the next month</li>
              <li>Archive completed transactions for the month</li>
              <li>Start tracking new inventory and sales for the next month</li>
            </ol>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-4">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Note:</strong> The rollover button is enabled only for past months. You cannot rollover the current month until it ends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// InfoIcon component
const InfoIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}; 