"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import { Calendar, Truck, Filter, Search, Package, Database, Download, X } from 'lucide-react';

interface Batch {
  id: string;
  productId: string;
  productName: string;
  purchaseDate: string;
  purchasePrice: number;
  initialQuantity: number;
  currentQuantity: number;
  status: 'active' | 'depleted';
  supplier: string;
  invoiceNumber: string;
  category?: string;
}

export default function BatchHistoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'depleted'>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [sortBy, setSortBy] = useState<'date' | 'product' | 'quantity'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  
  // Fetch batch data
  useEffect(() => {
    const fetchBatches = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/batches?' + new URLSearchParams({
          startDate: dateRange.start,
          endDate: dateRange.end,
          status: statusFilter !== 'all' ? statusFilter : ''
        }));
        
        if (!response.ok) {
          throw new Error('Failed to fetch batch data');
        }
        
        const data = await response.json();
        setBatches(data);
      } catch (err) {
        console.error('Error fetching batch data:', err);
        setError('Failed to load batch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBatches();
  }, [dateRange, statusFilter]);
  
  // Filter and sort batches
  const filteredBatches = batches.filter(batch => {
    if (!searchText) return true;
    
    const searchLower = searchText.toLowerCase();
    return (
      batch.productName.toLowerCase().includes(searchLower) ||
      batch.supplier.toLowerCase().includes(searchLower) ||
      batch.invoiceNumber.toLowerCase().includes(searchLower) ||
      (batch.category && batch.category.toLowerCase().includes(searchLower))
    );
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
        : new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
    } else if (sortBy === 'product') {
      return sortDirection === 'asc'
        ? a.productName.localeCompare(b.productName)
        : b.productName.localeCompare(a.productName);
    } else {
      return sortDirection === 'asc' 
        ? a.initialQuantity - b.initialQuantity 
        : b.initialQuantity - a.initialQuantity;
    }
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBatches = filteredBatches.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate totals
  const totalBatches = filteredBatches.length;
  const totalInitialQuantity = filteredBatches.reduce((sum, batch) => sum + batch.initialQuantity, 0);
  const totalCurrentQuantity = filteredBatches.reduce((sum, batch) => sum + batch.currentQuantity, 0);
  const totalSpent = filteredBatches.reduce((sum, batch) => sum + (batch.purchasePrice * batch.initialQuantity), 0);
  
  // Handle page change
  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  
  // Handle sorting
  const handleSort = (column: 'date' | 'product' | 'quantity') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };
  
  // Export CSV
  const exportCSV = () => {
    const headers = [
      'Purchase Date', 
      'Product', 
      'Category',
      'Initial Quantity', 
      'Current Quantity', 
      'Purchase Price', 
      'Total Cost',
      'Supplier',
      'Invoice Number',
      'Status'
    ];
    
    const rows = filteredBatches.map(batch => [
      new Date(batch.purchaseDate).toLocaleDateString(),
      batch.productName,
      batch.category || 'N/A',
      batch.initialQuantity.toString(),
      batch.currentQuantity.toString(),
      batch.purchasePrice.toFixed(2),
      (batch.purchasePrice * batch.initialQuantity).toFixed(2),
      batch.supplier,
      batch.invoiceNumber,
      batch.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `batches_${dateRange.start}_to_${dateRange.end}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
        <div className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Batch History</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Viewing batches from {new Date(dateRange.start).toLocaleDateString()} to {new Date(dateRange.end).toLocaleDateString()}
              </p>
            </div>
            
            <button 
              onClick={exportCSV}
              className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Batches</p>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{totalBatches}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 sm:p-3 rounded-full">
                  <Database size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Initial Units</p>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{totalInitialQuantity}</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 sm:p-3 rounded-full">
                  <Package size={16} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Current Stock</p>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{totalCurrentQuantity}</h3>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 sm:p-3 rounded-full">
                  <Package size={16} className="text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                    ${totalSpent.toFixed(2)}
                  </h3>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 sm:p-3 rounded-full">
                  <Truck size={16} className="text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Date Range */}
                <div className="grid grid-cols-2 gap-2 sm:flex-1 sm:flex sm:gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
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
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        className="block w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Status Filter */}
                <div className="flex-1 sm:max-w-[200px]">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'depleted')}
                    className="w-full py-1.5 pr-8 pl-3 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Batches</option>
                    <option value="active">Active Only</option>
                    <option value="depleted">Depleted Only</option>
                  </select>
                </div>
                
                {/* Search */}
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Search</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search product, supplier..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="block w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              
              <div className="mt-3 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                <span>Found {filteredBatches.length} batches</span>
                <div className="flex items-center gap-2">
                  <span>Sort by:</span>
                  <button 
                    className={`px-2 py-1 rounded-md ${sortBy === 'date' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                    onClick={() => handleSort('date')}
                  >
                    Date
                  </button>
                  <button 
                    className={`px-2 py-1 rounded-md ${sortBy === 'product' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                    onClick={() => handleSort('product')}
                  >
                    Product
                  </button>
                </div>
              </div>
            </div>
            
            {/* Batch Table */}
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading batches...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              </div>
            ) : currentBatches.length === 0 ? (
              <div className="p-8 text-center">
                <Package size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No batches found</p>
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
                          Supplier
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Initial
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Current
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Price
                        </th>
                        <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                      {currentBatches.map((batch) => (
                        <tr 
                          key={batch.id}
                          className="hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {new Date(batch.purchaseDate).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-2.5 max-w-[150px] truncate text-sm text-gray-900 dark:text-gray-100">
                            {batch.productName}
                          </td>
                          <td className="px-3 py-2.5 max-w-[120px] truncate text-sm text-gray-900 dark:text-gray-100">
                            {batch.supplier || 'N/A'}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {batch.initialQuantity}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {batch.currentQuantity}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            ${batch.purchasePrice.toFixed(2)}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              batch.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {batch.status === 'active' ? 'Active' : 'Depleted'}
                            </span>
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
                          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredBatches.length)}</span> of <span className="font-medium">{filteredBatches.length}</span> results
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