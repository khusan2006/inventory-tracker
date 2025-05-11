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
  AlertTriangle,
  Loader2,
  CalendarPlus,
  XCircle,
  Check
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
      <div className="h-screen overflow-auto bg-gray-50 dark:bg-slate-900 p-4 sm:p-6 pb-32">
        {/* Back button */}
        <button 
          onClick={() => router.push('/admin/rollover')} 
          className="mb-4 sm:mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          <span>Back to Rollover</span>
        </button>
        
        {/* Report header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          {/* Report header content */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Monthly Rollover</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span>{monthNames[selectedMonth-1]} {selectedYear}</span>
                </div>
                
                <div className="flex items-center text-sm space-x-2">
                  <button
                    onClick={() => handlePreviousMonth()}
                    disabled={(selectedMonth === currentDate.getMonth() + 1 && selectedYear === currentDate.getFullYear()) && !report?.isFinalized}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center">
                      <ChevronLeft size={16} />
                      <span className="hidden sm:inline">Previous</span>
                    </span>
                  </button>
                  <span className="text-gray-600 dark:text-gray-400">|</span>
                  <button
                    onClick={() => handleNextMonth()}
                    disabled={!report?.isFinalized}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center">
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleMonthRollover}
                disabled={(selectedMonth === currentDate.getMonth() + 1 && selectedYear === currentDate.getFullYear()) || report?.isFinalized || isLoading || isRollingOver}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                         text-white rounded-lg transition-colors text-sm font-medium disabled:cursor-not-allowed"
              >
                {isRollingOver ? (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                ) : (
                  <CalendarPlus className="w-4 h-4 mr-2" />
                )}
                {isRollingOver ? 'Processing...' : 'Rollover to Next Month'}
              </button>
            </div>
          </div>
          
          {/* Content based on report status */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading report data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">Error loading report</p>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                {typeof error === 'string' ? error : 'An unexpected error occurred.'}
              </p>
              <button
                onClick={() => setSelectedMonth(selectedMonth)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Try Again
              </button>
            </div>
          ) : report?.reportData ? (
            <div className="space-y-6 sm:space-y-8" style={{ paddingBottom: "100px" }}>
              {/* Finalized Status */}
              {report.isFinalized && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300 flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>This report has been finalized and cannot be modified. Any new transactions will be recorded in the next month.</span>
                  </p>
                </div>
              )}
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white dark:bg-slate-700 p-3 sm:p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Total Revenue</h3>
                  <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(report.reportData.totalRevenue)}
                  </p>
                  <div className="mt-1 sm:mt-2 text-xs text-gray-500 dark:text-gray-400">
                    From {report.reportData.totalSold} items sold
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-3 sm:p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Total Profit</h3>
                  <p className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(report.reportData.totalProfit)}
                  </p>
                  <div className="mt-1 sm:mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {report.reportData.avgProfitMargin.toFixed(2)}% margin
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-3 sm:p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Inventory Added</h3>
                  <p className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {report.reportData.totalPurchased} items
                  </p>
                  <div className="mt-1 sm:mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Cost: {formatCurrency(report.reportData.totalCost)}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-3 sm:p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Inventory Value</h3>
                  <p className="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(report.reportData.totalEndingInventory * (report.reportData.totalCost / Math.max(report.reportData.totalSold, 1)))}
                  </p>
                  <div className="mt-1 sm:mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Across {report.reportData.totalEndingInventory} items
                  </div>
                </div>
              </div>
              
              {/* Product List - Fixed scrolling */}
              <div className="mb-8 sm:mb-12">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-4">Unsold Inventory for Rollover</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  These items will be transferred to the next month when you perform the rollover.
                </p>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="overflow-auto" style={{ maxHeight: "460px" }}>
                    <table className="w-full table-fixed">
                      <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
                        <tr>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '35%' }}>
                            Product
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '15%' }}>
                            <span className="hidden sm:inline">Remaining</span> Qty
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '15%' }}>
                            Value
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell" style={{ width: '15%' }}>
                            Sold
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell" style={{ width: '15%' }}>
                            Purchased
                          </th>
                          <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '20%' }}>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {report.reportData.products
                          .filter(product => product.endingQuantity > 0)
                          .map(product => {
                            const currentValue = product.endingQuantity * (product.cost / (product.soldQuantity || 1));
                            let stockStatus;
                            
                            if (product.endingQuantity <= 0) {
                              stockStatus = {
                                label: "Out of Stock",
                                color: "text-red-600 dark:text-red-400",
                                icon: <XCircle size={14} className="mr-1" />
                              };
                            } else if (product.endingQuantity <= 5) {
                              stockStatus = {
                                label: "Low Stock",
                                color: "text-amber-600 dark:text-amber-400",
                                icon: <AlertTriangle size={14} className="mr-1" />
                              };
                            } else {
                              stockStatus = {
                                label: "In Stock",
                                color: "text-green-600 dark:text-green-400",
                                icon: <Check size={14} className="mr-1" />
                              };
                            }
                          
                            return (
                              <tr key={product.productId} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="px-2 sm:px-4 py-3">
                                  <div className="flex items-center">
                                    <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                                      {product.productName}
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {product.category}
                                  </div>
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                                  {product.endingQuantity}
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-white">
                                  {formatCurrency(currentValue)}
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                                  {product.soldQuantity || 0}
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                                  {product.purchasedQuantity || 0}
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                                  <span className={`inline-flex items-center text-xs sm:text-sm ${stockStatus.color}`}>
                                    {stockStatus.icon}
                                    {stockStatus.label}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Out of Stock Products - Fixed scrolling */}
              <div className="mb-8 sm:mb-16">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Out of Stock Products</h2>
                  <button 
                    onClick={() => {
                      const element = document.getElementById("out-of-stock");
                      if (element) {
                        element.style.display = element.style.display === "none" ? "block" : "none";
                      }
                    }}
                    className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
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
                            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '40%' }}>
                              Product
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '20%' }}>
                              Last Sale
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '20%' }}>
                              Total Sold
                            </th>
                            <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ width: '20%' }}>
                              Revenue
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {report.reportData.products
                            .filter(product => product.endingQuantity <= 0)
                            .map(product => (
                              <tr key={product.productId} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="px-2 sm:px-4 py-3">
                                  <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                                    {product.productName}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {product.category}
                                  </div>
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                  {/* Use a dash as fallback for last sale date */}
                                  {'-'}
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                  {product.soldQuantity || 0}
                                </td>
                                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                  {formatCurrency(product.revenue || 0)}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <Calendar className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Report Available</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  There is no report data available for this month yet. Reports are generated when sales or inventory changes occur.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Instructions section with margin bottom */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6 mb-8 sm:mb-16">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Month-End Rollover Procedure</h2>
          
          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-2 sm:space-y-4">
            <p>
              The month-end rollover process finalizes your inventory and sales data for the month, creating a permanent record 
              for accounting purposes. After rollover, any new transactions will be applied to the next month.
            </p>
            
            <div className="pl-4 border-l-2 border-blue-500 dark:border-blue-400">
              <p className="text-sm">
                <strong className="text-gray-800 dark:text-gray-200">Important:</strong> Before performing the rollover, ensure that all sales and inventory
                transactions for the month are correctly entered. You cannot edit a month's data after it has been rolled over.
              </p>
            </div>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Verify all inventory counts and sales are accurate</li>
              <li>Check that all shipments have been properly recorded</li>
              <li>Click the "Rollover to Next Month" button when ready</li>
              <li>Wait for confirmation that the process has completed</li>
            </ol>
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