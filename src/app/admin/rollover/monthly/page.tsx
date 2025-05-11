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
import { MonthlyReport as MonthlyReportType, MonthlyProductReport } from '@/types/inventory';

// Extended interface that includes API fields
interface MonthlyReportResponse {
  id: string;
  year: number;
  month: number;
  totalSales: number;
  totalProfit: number;
  averageProfitMargin: number;
  isFinalized: boolean;
  reportData: MonthlyReportType;
  createdAt: string;
  updatedAt: string;
}

export default function MonthlyRolloverPage() {
  const router = useRouter();
  const [report, setReport] = useState<MonthlyReportResponse | null>(null);
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
    if (!report?.reportData) return;
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Header row
    csvContent += "Product ID,Product Name,SKU,Category,Starting Qty,Ending Qty,Purchased Qty,Sold Qty,Revenue,Cost,Profit,Margin\n";
    
    // Data rows
    report.reportData.products.forEach(product => {
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
      <div className="h-screen overflow-auto bg-gray-50 dark:bg-slate-900 p-6 pb-32">
        {/* Back button */}
        <button 
          onClick={() => router.push('/admin/rollover')} 
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          <span>Back to Rollover</span>
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
                   selectedMonth === currentDate.getMonth() + 1) ||
                  report?.isFinalized
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
          ) : report?.reportData ? (
            <div className="space-y-8" style={{ paddingBottom: "100px" }}>
              {/* Finalized Status */}
              {report.isFinalized && (
                <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>This report has been finalized and cannot be modified. Any new transactions will be recorded in the next month.</span>
                  </p>
                </div>
              )}
              
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Revenue</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(report.reportData.totalRevenue)}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    From {report.reportData.totalSold} items sold
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Profit</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(report.reportData.totalProfit)}
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {report.reportData.avgProfitMargin.toFixed(2)}% margin
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Inventory Added</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {report.reportData.totalPurchased} items
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Cost: {formatCurrency(report.reportData.totalCost)}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Inventory Change</h3>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {report.reportData.totalEndingInventory - report.reportData.totalStartingInventory >= 0 ? '+' : ''}
                    {report.reportData.totalEndingInventory - report.reportData.totalStartingInventory} items
                  </p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    From {report.reportData.totalStartingInventory} to {report.reportData.totalEndingInventory}
                  </div>
                </div>
              </div>
              
              {/* Product List - Fixed scrolling */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Unsold Inventory for Rollover</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  These items will be transferred to the next month when you perform the rollover.
                </p>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-auto" style={{ maxHeight: "460px" }}>
                    <table className="w-full table-fixed">
                      <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '30%' }}>
                            Product
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '14%' }}>
                            Remaining Quantity
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '14%' }}>
                            Current Value
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '14%' }}>
                            Sold This Month
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '14%' }}>
                            Purchased This Month
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '14%' }}>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {report.reportData.products
                          .filter(product => product.endingQuantity > 0)
                          .map((product) => {
                            // Calculate the current value (based on average cost from batches)
                            const avgCost = product.cost / (product.soldQuantity || 1);
                            const currentValue = product.endingQuantity * avgCost;
                            
                            // Determine inventory status
                            const getStockStatus = () => {
                              if (product.endingQuantity <= 0) return 'Out of Stock';
                              if (product.endingQuantity < 5) return 'Low Stock';
                              return 'In Stock';
                            };
                            
                            // Get status color
                            const getStatusColor = () => {
                              if (product.endingQuantity <= 0) return 'text-red-600 dark:text-red-400';
                              if (product.endingQuantity < 5) return 'text-amber-600 dark:text-amber-400';
                              return 'text-green-600 dark:text-green-400';
                            };
                            
                            return (
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
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {product.endingQuantity}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  {formatCurrency(currentValue)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  <span className={product.soldQuantity > 0 ? 'text-amber-600 dark:text-amber-400' : ''}>
                                    {product.soldQuantity || 0}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  <span className={product.purchasedQuantity > 0 ? 'text-green-600 dark:text-green-400' : ''}>
                                    {product.purchasedQuantity || 0}
                                  </span>
                                </td>
                                <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${getStatusColor()}`}>
                                  {getStockStatus()}
                                </td>
                              </tr>
                            );
                          })}
                        
                        {report.reportData.products.filter(p => p.endingQuantity > 0).length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                              No unsold inventory available for this month.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Out of Stock Products - Fixed scrolling */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Out of Stock Products</h2>
                  <button 
                    onClick={() => {
                      const element = document.getElementById("out-of-stock");
                      if (element) {
                        element.style.display = element.style.display === "none" ? "block" : "none";
                      }
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <span>Toggle View</span>
                  </button>
                </div>
                
                <div id="out-of-stock" style={{ display: "none" }}>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="overflow-auto" style={{ maxHeight: "300px" }}>
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '40%' }}>
                              Product
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '20%' }}>
                              Last Sale Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '20%' }}>
                              Total Sold
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '20%' }}>
                              Total Revenue
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {report.reportData.products
                            .filter(product => product.endingQuantity === 0)
                            .map((product) => (
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
                                  -
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  {product.soldQuantity || 0}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                  {formatCurrency(product.revenue)}
                                </td>
                              </tr>
                            ))}
                          
                          {report.reportData.products.filter(p => p.endingQuantity === 0).length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                No out of stock products for this month.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">No report data available. Select a different month or try again later.</p>
            </div>
          )}
        </div>
        
        {/* Instructions section with margin bottom */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-16">
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
                Additionally, you cannot rollover a month that has already been finalized.
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