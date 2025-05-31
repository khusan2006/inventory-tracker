"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DollarSign, 
  Search, 
  X, 
  Tag, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  RefreshCw,
  Download,
  PlusCircle,
  FileDown,
} from 'lucide-react';
import { format } from 'date-fns';
import { getTimeAgo, formatCurrency } from '@/hooks/useSalesData';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from "sonner";
import { fetchSalesData } from "@/app/api/sales";

interface SortConfig {
  key: keyof Sale | null;
  direction: 'ascending' | 'descending';
}

const ITEMS_PER_PAGE = 10;

interface SaleProduct {
  productName: string;
  quantity: number;
  // Add other relevant product properties if known/used
}

// Local Sale interface to include all used properties.
// TODO: Reconcile this with the Sale type from @/types/inventory
interface Sale {
  id: string;
  customerName?: string;
  products: SaleProduct[];
  saleDate: string;
  status?: string;
  totalAmount?: number;
  // Fields from previously seen local interface or common usage
  productName: string; // Used in some filter logic, might be legacy or part of products
  category?: string | null;
  quantity: number; // Total quantity for the sale, or sum of product quantities
  salePrice: number; // Overall sale price, or to be deprecated if using totalAmount
  profit: number; // Required to avoid undefined issues
  profitMargin: number; // Required to avoid undefined issues
}

export default function SalesPage() {
  const { t } = useTranslation();
  const [sales, setSales] = useState<Sale[]>([]);
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
  
  // Active tab
  const [activeTab, setActiveTab] = useState("all");
  
  // Fetch sales data
  const loadSales = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Pass dateRange to fetchSalesData if API supports it
      const params: Record<string, string> = {};
      if (dateRange.start) params.startDate = dateRange.start;
      if (dateRange.end) params.endDate = dateRange.end;
      
      const data = await fetchSalesData(params);
      setSales(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(t("salesPage.fetchError")));
      toast.error(String(t("salesPage.fetchErrorToast")));
    } finally {
      setIsLoading(false);
    }
  }, [t, dateRange]);
  
  useEffect(() => {
    loadSales();
  }, [loadSales]);
  
  // Handle sorting
  const handleSort = (key: keyof Sale) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
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
  
  // Get time ago for display
  const getRelativeTime = (dateString: string) => {
    return getTimeAgo(new Date(dateString));
  };
  
  const filteredSalesMemo = useMemo(() => {
    let filtered = sales.filter((sale) => {
      const searchTermLower = searchText.toLowerCase();
      return (
        sale.productName.toLowerCase().includes(searchTermLower) ||
        (sale.category && sale.category.toLowerCase().includes(searchTermLower))
      );
    });

    if (activeTab === "completed") {
      filtered = filtered.filter((sale) => sale.status === "Completed");
    } else if (activeTab === "pending") {
      filtered = filtered.filter((sale) => sale.status === "Pending");
    } else if (activeTab === "cancelled") {
      filtered = filtered.filter((sale) => sale.status === "Cancelled");
    }

    if (sortConfig.key !== null) {
      filtered.sort((a, b) => {
        const valueA = a[sortConfig.key!] ?? '';
        const valueB = b[sortConfig.key!] ?? '';
        
        if (valueA < valueB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filtered;
  }, [sales, searchText, activeTab, sortConfig]);

  const totalPagesMemo = useMemo(() => Math.ceil(filteredSalesMemo.length / ITEMS_PER_PAGE), [filteredSalesMemo.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, activeTab, filteredSalesMemo.length]);

  const currentSales = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSalesMemo.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSalesMemo, currentPage]);

  // Calculate totals using the filtered data
  const totalSales = filteredSalesMemo.length;
  const totalRevenue = filteredSalesMemo.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0);
  const totalProfit = filteredSalesMemo.reduce((sum, sale) => sum + sale.profit, 0);
  const averageProfitMargin = totalSales > 0 
    ? filteredSalesMemo.reduce((sum, sale) => sum + sale.profitMargin, 0) / totalSales
    : 0;

  // Handle page changes
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPagesMemo) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center p-4">
        <FileDown className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          {t("salesPage.errorLoadingTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
        <Button onClick={loadSales}>
          <RefreshCw className="mr-2 h-4 w-4" /> {t("salesPage.retry")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          {t('sales.salesHistory')}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t('sales.exportCSV')}
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('sales.addSale')}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">{t("salesPage.tabs.all")}</TabsTrigger>
          <TabsTrigger value="completed">{t("salesPage.tabs.completed")}</TabsTrigger>
          <TabsTrigger value="pending">{t("salesPage.tabs.pending")}</TabsTrigger>
          <TabsTrigger value="cancelled">{t("salesPage.tabs.cancelled")}</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3 sm:mr-4">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('sales.totalSales')}</p>
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
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('sales.totalRevenue')}</p>
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
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('sales.totalProfit')}</p>
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
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('sales.avgProfitMargin')}</p>
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
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t('sales.startDate')}</label>
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
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">{t('sales.endDate')}</label>
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
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">{t('common.search')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder={t('sales.searchProductName')}
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
                  {t('common.clearFilters')}
                </button>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t('sales.foundCount', { count: filteredSalesMemo.length })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Table */}
          {currentSales.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th 
                      className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => handleSort('saleDate')}
                    >
                      <div className="flex items-center">
                        {t('common.date')}
                        {sortConfig.key === 'saleDate' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => handleSort('productName')}
                    >
                      <div className="flex items-center">
                        {t('sales.product')}
                        {sortConfig.key === 'productName' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => handleSort('category')}
                    >
                      <div className="flex items-center">
                        {t('inventory.category')}
                        {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => handleSort('quantity')}
                    >
                      <div className="flex items-center justify-end">
                        {t('sales.qty')}
                        {sortConfig.key === 'quantity' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => handleSort('salePrice')}
                    >
                      <div className="flex items-center justify-end">
                        {t('common.price')}
                        {sortConfig.key === 'salePrice' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                      onClick={() => handleSort('profit')}
                    >
                      <div className="flex items-center justify-end">
                        {t('common.profit')}
                        {sortConfig.key === 'profit' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                      </div>
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
                        <div>{formatDate(sale.saleDate)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{getRelativeTime(sale.saleDate)}</div>
                      </td>
                      <td className="px-3 py-2.5 text-xs sm:text-sm text-gray-900 dark:text-gray-100 max-w-[150px] truncate">
                        {sale.productName}
                      </td>
                      <td className="px-3 py-2.5 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                        {sale.category || t('sales.uncategorized')}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100 text-right">
                        {sale.quantity}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm text-gray-900 dark:text-gray-100 text-right">
                        {formatCurrency(sale.salePrice)}
                      </td>
                      <td className={`px-3 py-2.5 whitespace-nowrap text-xs sm:text-sm font-medium text-right ${
                        sale.profit < 0 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {formatCurrency(sale.profit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                {t('sales.noResults')}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t('common.tryAdjusting')}
              </p>
            </div>
          )}
          
          {totalPagesMemo > 1 && (
            <div className="flex items-center justify-between pt-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4"/>
                {t('common.previous')}
              </Button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t('common.pageInfo', { currentPage, totalPages: totalPagesMemo })}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPagesMemo}
              >
                {t('common.next')}
                <ChevronRight className="ml-2 h-4 w-4"/>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 