"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import { Calendar, ArrowDownUp, DollarSign, Search, X, Loader2, FileText, Tag, Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Sale {
  id: string;
  productId: string;
  productName: string;
  batchId: string;
  quantity: number;
  salePrice: number;
  purchasePrice: number;
  profit: number;
  profitMargin: number;
  saleDate: string;
  category: string | null;
}

export default function SalesHistoryPage() {
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Date range filter
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  // Search
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sorting
  const [sortBy, setSortBy] = useState<string>('saleDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [indexOfLastItem, setIndexOfLastItem] = useState(0);
  
  // Initialize date range filter to last 30 days
  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    
    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
  }, []);
  
  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        setIsLoading(true);
        
        let url = '/api/sales';
        const params = new URLSearchParams();
        
        if (startDate && endDate) {
          params.append('startDate', startDate);
          params.append('endDate', endDate);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        
        const data = await response.json();
        setSales(data);
      } catch (err) {
        console.error('Error fetching sales:', err);
        setError('Failed to load sales history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSales();
  }, [startDate, endDate]);
  
  // Toggle sort direction when clicking on the same sort option
  const handleSortChange = (option: string) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort sales
  const filteredSales = sales.filter(sale => {
    // Date range filter
    const saleDate = new Date(sale.saleDate);
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    endDateTime.setHours(23, 59, 59, 999);
    
    if (saleDate < startDateTime || saleDate > endDateTime) {
      return false;
    }
    
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (
        !sale.productName.toLowerCase().includes(searchLower) &&
        !sale.category?.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort sales based on sort criteria
  const sortedSales = [...filteredSales].sort((a, b) => {
    if (sortBy === 'saleDate') {
      return sortDirection === 'asc'
        ? new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime()
        : new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime();
    } else if (sortBy === 'productName') {
      return sortDirection === 'asc'
        ? a.productName.localeCompare(b.productName)
        : b.productName.localeCompare(a.productName);
    } else if (sortBy === 'category') {
      const aCategory = a.category || '';
      const bCategory = b.category || '';
      return sortDirection === 'asc'
        ? aCategory.localeCompare(bCategory)
        : bCategory.localeCompare(aCategory);
    } else if (sortBy === 'quantity') {
      return sortDirection === 'asc'
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    } else if (sortBy === 'salePrice') {
      return sortDirection === 'asc'
        ? a.salePrice - b.salePrice
        : b.salePrice - a.salePrice;
    } else if (sortBy === 'profit') {
      return sortDirection === 'asc'
        ? a.profit - b.profit
        : b.profit - a.profit;
    } else if (sortBy === 'profitMargin') {
      return sortDirection === 'asc'
        ? a.profitMargin - b.profitMargin
        : b.profitMargin - a.profitMargin;
    }
    return 0;
  });
  
  // Items to display for the current page
  const itemsPerPage = 10;
  const currentSales = sortedSales.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate pagination info when filtered sales change
  useEffect(() => {
    const pageSize = 10;
    const calculatedTotalPages = Math.ceil(filteredSales.length / pageSize);
    setTotalPages(calculatedTotalPages || 1);
    
    // Reset to first page when filters change
    if (currentPage > calculatedTotalPages) {
      setCurrentPage(1);
      setIndexOfFirstItem(0);
      setIndexOfLastItem(pageSize);
    } else {
      setIndexOfFirstItem((currentPage - 1) * pageSize);
      setIndexOfLastItem(currentPage * pageSize);
    }
  }, [filteredSales, currentPage]);
  
  // Calculate totals for the stats cards
  const totalSales = filteredSales.length;
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0);
  const totalProfit = filteredSales.reduce((sum, sale) => sum + sale.profit, 0);
  const averageMargin = totalSales > 0 
    ? filteredSales.reduce((sum, sale) => sum + sale.profitMargin, 0) / totalSales 
    : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    
    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
    setSearchTerm('');
  };
  
  // Pagination
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    const pageSize = 10; // Define pageSize
    setIndexOfFirstItem((newPage - 1) * pageSize);
    setIndexOfLastItem(newPage * pageSize);
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900 p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Sales History
          </h1>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3 sm:mr-4">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{totalSales}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-3 sm:mr-4">
                  <DollarSign size={18} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mr-3 sm:mr-4">
                  <DollarSign size={18} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Profit</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalProfit)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 mr-3 sm:mr-4">
                  <Tag size={18} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Avg. Profit Margin</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{averageMargin.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                {/* Date Range Filter */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="block w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Search Input */}
                <div className="w-full sm:max-w-[230px]">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-9 pr-8 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchTerm && (
                      <button
                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                        onClick={() => setSearchTerm('')}
                      >
                        <X size={16} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reset Filters
                </button>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Found {filteredSales.length} sales
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading sales data...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              </div>
            ) : filteredSales.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No sales found</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your filters or selecting a different date range</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                    <thead className="bg-gray-50 dark:bg-slate-700">
                      <tr>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Date
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Product
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Qty
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Price
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Total
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Profit
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Margin
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Batch
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                      {currentSales.map((sale) => (
                        <tr 
                          key={sale.id}
                          className="hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                            {formatDate(sale.saleDate)}
                          </td>
                          <td className="px-3 py-2.5 text-xs sm:text-sm text-gray-900 dark:text-gray-100 max-w-[150px] truncate">
                            {sale.productName}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                            {sale.quantity}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                            ${sale.salePrice.toFixed(2)}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                            ${(sale.salePrice * sale.quantity).toFixed(2)}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                            ${sale.profit.toFixed(2)}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                            {sale.profitMargin.toFixed(1)}%
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            <Link href={`/admin/batches/${sale.batchId}`}>View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-3 py-3 flex items-center justify-between border-t border-gray-200 dark:border-slate-700">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredSales.length)}</span> of <span className="font-medium">{filteredSales.length}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => changePage(1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">First</span>
                            <span>«</span>
                          </button>
                          <button
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Previous</span>
                            <span>‹</span>
                          </button>
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Page {currentPage} of {totalPages}
                          </span>
                          <button
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Next</span>
                            <span>›</span>
                          </button>
                          <button
                            onClick={() => changePage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Last</span>
                            <span>»</span>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 