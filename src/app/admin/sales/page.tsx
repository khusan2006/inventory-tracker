"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import { 
  ArrowDownUp, 
  DollarSign, 
  Search, 
  X, 
  Loader2, 
  FileText, 
  Tag, 
  Package, 
  ShoppingCart, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { getTimeAgo, formatCurrency } from '@/hooks/useSalesData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

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

interface SortConfig {
  key: keyof Sale | null;
  direction: 'ascending' | 'descending';
}

export default function SalesHistoryPage() {
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Date range filter
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  
  // Search
  const [searchText, setSearchText] = useState('');
  
  // Sorting
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'saleDate',
    direction: 'descending'
  });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Fetch sales data
  useEffect(() => {
    async function fetchSales() {
      try {
        setIsLoading(true);
        let url = '/api/sales';
        
        // Add date filters if they exist
        const params = new URLSearchParams();
        params.append('startDate', dateRange.start);
        params.append('endDate', dateRange.end);
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        
        const data = await response.json();
        setSales(data);
        
        // Default sort by date descending (newest first)
        const sortedData = [...data].sort((a, b) => 
          new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime()
        );
        
        setFilteredSales(sortedData);
        setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
        setError(null);
      } catch (err) {
        console.error('Error fetching sales:', err);
        setError('Failed to load sales data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSales();
  }, [dateRange, itemsPerPage]);
  
  // Handle search and filtering
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredSales(sales);
    } else {
      const lowercasedSearch = searchText.toLowerCase();
      const filtered = sales.filter(sale => 
        sale.productName.toLowerCase().includes(lowercasedSearch) ||
        (sale.category && sale.category.toLowerCase().includes(lowercasedSearch))
      );
      setFilteredSales(filtered);
    }
    
    // Reset to first page when search changes
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredSales.length / itemsPerPage));
  }, [searchText, sales, itemsPerPage]);
  
  // Handle sorting
  const handleSort = (key: keyof Sale) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    const sortedData = [...filteredSales].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredSales(sortedData);
  };
  
  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSales.slice(startIndex, endIndex);
  };
  
  // Handle page changes
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const clearFilters = () => {
    setSearchText('');
    setDateRange({
      start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    });
    setSortConfig({
      key: 'saleDate',
      direction: 'descending'
    });
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };

  // Get time ago for display
  const getRelativeTime = (dateString: string) => {
    return getTimeAgo(new Date(dateString));
  };
  
  // Calculate totals
  const totalSales = filteredSales.length;
  const totalQuantity = filteredSales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0);
  const totalProfit = filteredSales.reduce((sum, sale) => sum + sale.profit, 0);
  const averageProfitMargin = totalSales > 0 
    ? filteredSales.reduce((sum, sale) => sum + sale.profitMargin, 0) / totalSales
    : 0;
  
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
        <div className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Sales History</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Viewing sales from {new Date(dateRange.start).toLocaleDateString()} to {new Date(dateRange.end).toLocaleDateString()}
              </p>
            </div>
            
            <Button 
              className="inline-flex items-center"
              onClick={() => {/* Export CSV function here */}}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3 sm:mr-4">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Sales</p>
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
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{averageProfitMargin.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                {/* Date Range Filter */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <CalendarIcon size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="block w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <CalendarIcon size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
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
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="block w-full pl-9 pr-8 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchText && (
                      <button
                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                        onClick={() => setSearchText('')}
                      >
                        <X size={16} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={clearFilters}
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
                        <th 
                          className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => handleSort('saleDate')}
                        >
                          <div className="flex items-center">
                            Date
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => handleSort('productName')}
                        >
                          <div className="flex items-center">
                            Product
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => handleSort('category')}
                        >
                          <div className="flex items-center">
                            Category
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => handleSort('quantity')}
                        >
                          <div className="flex items-center justify-end">
                            Qty
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => handleSort('salePrice')}
                        >
                          <div className="flex items-center justify-end">
                            Price
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                        <th 
                          className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => handleSort('profit')}
                        >
                          <div className="flex items-center justify-end">
                            Profit
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                      {getCurrentPageItems().map((sale) => (
                        <tr 
                          key={sale.id}
                          className="hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                            <div>{formatDate(sale.saleDate)}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{getRelativeTime(sale.saleDate)}</div>
                          </td>
                          <td className="px-3 py-2.5 text-xs sm:text-sm text-gray-900 dark:text-gray-100 max-w-[150px] truncate">
                            {sale.productName}
                          </td>
                          <td className="px-3 py-2.5 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                            {sale.category || 'Uncategorized'}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100 text-right">
                            {sale.quantity}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100 text-right">
                            {formatCurrency(sale.salePrice)}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 text-right">
                            {formatCurrency(sale.profit)}
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
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredSales.length)}</span> of <span className="font-medium">{filteredSales.length}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => handlePrevPage()}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 bg-blue-50 dark:bg-blue-900/20 text-sm font-medium text-blue-600 dark:text-blue-400">
                            {currentPage}
                          </span>
                          <button
                            onClick={() => handleNextPage()}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" />
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