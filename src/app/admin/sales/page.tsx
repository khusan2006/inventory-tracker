"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import { Calendar, ArrowDownUp, DollarSign, Search, X, Loader2, FileText, Tag, Package } from 'lucide-react';

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
  const filteredSales = sales.filter(sale => 
    sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sale.category && sale.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const sortedSales = [...filteredSales].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'saleDate') {
      comparison = new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime();
    } else if (sortBy === 'productName') {
      comparison = a.productName.localeCompare(b.productName);
    } else if (sortBy === 'category') {
      comparison = (a.category || '').localeCompare(b.category || '');
    } else if (sortBy === 'quantity') {
      comparison = a.quantity - b.quantity;
    } else if (sortBy === 'salePrice') {
      comparison = a.salePrice - b.salePrice;
    } else if (sortBy === 'profit') {
      comparison = a.profit - b.profit;
    } else if (sortBy === 'profitMargin') {
      comparison = a.profitMargin - b.profitMargin;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Calculate totals
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
  
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Sales History
          </h1>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-4">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSales}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mr-4">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mr-4">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Profit</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalProfit)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mr-4">
                  <ArrowDownUp size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Profit Margin</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageMargin.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by product or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Sales Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 size={36} className="animate-spin text-blue-500" />
                <p className="ml-4 text-gray-600 dark:text-gray-400">Loading sales data...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center p-12">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : sortedSales.length === 0 ? (
              <div className="flex flex-col justify-center items-center p-12">
                <Package size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">No sales found</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                  Try adjusting your filters or adding some sales
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700 text-left">
                    <tr>
                      <th 
                        className="px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('saleDate')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Date</span>
                          {sortBy === 'saleDate' && (
                            <ArrowDownUp size={14} className={`${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('productName')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Product</span>
                          {sortBy === 'productName' && (
                            <ArrowDownUp size={14} className={`${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('category')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Category</span>
                          {sortBy === 'category' && (
                            <ArrowDownUp size={14} className={`${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('quantity')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Qty</span>
                          {sortBy === 'quantity' && (
                            <ArrowDownUp size={14} className={`${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('salePrice')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Sale Price</span>
                          {sortBy === 'salePrice' && (
                            <ArrowDownUp size={14} className={`${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('profit')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Profit</span>
                          {sortBy === 'profit' && (
                            <ArrowDownUp size={14} className={`${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSortChange('profitMargin')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Margin</span>
                          {sortBy === 'profitMargin' && (
                            <ArrowDownUp size={14} className={`${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {sortedSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(sale.saleDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {sale.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {sale.category || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {sale.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatCurrency(sale.salePrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          {formatCurrency(sale.profit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {sale.profitMargin.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 