"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import { Calendar, Truck, Filter, Search, Package, Database, Download } from 'lucide-react';

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
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Batch History</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Viewing batches from {new Date(dateRange.start).toLocaleDateString()} to {new Date(dateRange.end).toLocaleDateString()}
              </p>
            </div>
            
            <button 
              onClick={exportCSV}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Download size={18} className="mr-2" />
              Export CSV
            </button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Batches</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalBatches}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Database size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Initial Units</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalInitialQuantity}
                  </h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <Package size={24} className="text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Units</p>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalCurrentQuantity}
                  </h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Package size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totalSpent.toFixed(2)}
                  </h3>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                  <Truck size={24} className="text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search by product, supplier, or invoice..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 
                             text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                <div className="flex flex-wrap gap-2 items-center">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'depleted')}
                    className="border border-gray-300 dark:border-slate-600 
                             text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                             rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Batches</option>
                    <option value="depleted">Depleted Batches</option>
                  </select>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-300">From:</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      className="border border-gray-300 dark:border-slate-600 
                               text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                               rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-300">To:</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      className="border border-gray-300 dark:border-slate-600 
                               text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                               rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Batches Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading batch data...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <div className="text-red-500 text-lg">{error}</div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Please try refreshing the page</p>
              </div>
            ) : filteredBatches.length === 0 ? (
              <div className="py-20 text-center">
                <div className="text-gray-500 text-lg">No batch records found</div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
                    <tr>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('date')}
                      >
                        <span className="flex items-center">
                          Purchase Date
                          {sortBy === 'date' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </span>
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('product')}
                      >
                        <span className="flex items-center">
                          Product
                          {sortBy === 'product' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </span>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th 
                        className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('quantity')}
                      >
                        <span className="flex items-center">
                          Initial Qty
                          {sortBy === 'quantity' && (
                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </span>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Current Qty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Purchase Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Total Cost
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Supplier
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                    {currentBatches.map((batch) => (
                      <tr 
                        key={batch.id} 
                        className="hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
                        onClick={() => router.push(`/admin/batches/${batch.id}`)}
                      >
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          {new Date(batch.purchaseDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                          {batch.productName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          {batch.category || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          {batch.initialQuantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          {batch.currentQuantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          ${batch.purchasePrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          ${(batch.purchasePrice * batch.initialQuantity).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          {batch.supplier}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${batch.status === 'active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                          >
                            {batch.status === 'active' ? 'Active' : 'Depleted'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination Controls */}
                {filteredBatches.length > itemsPerPage && (
                  <div className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                          <span className="font-medium">
                            {Math.min(indexOfLastItem, filteredBatches.length)}
                          </span>{' '}
                          of <span className="font-medium">{filteredBatches.length}</span> batches
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => changePage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 border border-gray-300 dark:border-slate-600 rounded-md text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        
                        <div className="flex gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = idx + 1;
                            } else if (currentPage <= 3) {
                              pageNum = idx + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + idx;
                            } else {
                              pageNum = currentPage - 2 + idx;
                            }
                            
                            if (pageNum > 0 && pageNum <= totalPages) {
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => changePage(pageNum)}
                                  className={`px-3 py-1 border rounded-md text-sm ${
                                    currentPage === pageNum
                                      ? 'bg-blue-500 text-white border-blue-500'
                                      : 'border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            }
                            
                            return null;
                          })}
                        </div>
                        
                        <button
                          onClick={() => changePage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 border border-gray-300 dark:border-slate-600 rounded-md text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 