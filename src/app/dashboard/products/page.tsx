"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package,  Trash2, Edit, Plus, Layers,  MinusCircle, PlusCircle,  X,  XCircle, Search, Filter, XSquare, MoreHorizontal } from 'lucide-react';
import BatchesModal from '@/components/inventory/BatchesModal';
import QuickSellModal from '@/components/inventory/QuickSellModal';
import { useInventory } from '@/hooks/useInventory';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast'; // Added for notifications
import { useQueryClient } from '@tanstack/react-query'; // Added for query invalidation if needed
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"; // MODIFIED: Keep this import as is for now
import { formatCurrency } from '@/lib/utils';
import { useProductBatches } from '@/hooks/useProductBatches';




export default function ProductsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<{id: string, name: string} | null>(null);
  const [quickSellProduct, setQuickSellProduct] = useState<{id: string, name: string} | null>(null);
  
  // Search and filter state
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // all, inStock, lowStock, outOfStock
  const [sortBy, setSortBy] = useState('name'); // name, stock, price, category
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isChangingPageSize, setIsChangingPageSize] = useState(false);
  
  // Search input ref for keyboard shortcut
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Use the cached inventory data with refetch capability
  const { 
    data: products = [], 
    isLoading, 
    error,
    refetch: refetchInventory
  } = useInventory();
  
  const queryClient = useQueryClient(); // Initialize queryClient
  
  // Get unique categories from products
  const categories = [...new Set(products.map(product => {
    if (typeof product.category === 'object' && product.category !== null && 'name' in product.category) {
      return product.category.name;
    }
    return product.category as string;
  }))].sort();
  
  // Filtered and sorted products
  const filteredProducts = products.filter(product => {
    // Apply text search filter
    const searchLower = searchText.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(searchLower);
    const skuMatch = product.sku.toLowerCase().includes(searchLower);
    const descriptionMatch = product.description 
      ? product.description.toLowerCase().includes(searchLower) 
      : false;
    
    if (searchText && !nameMatch && !skuMatch && !descriptionMatch) {
      return false;
    }
    
    // Apply category filter
    if (categoryFilter) {
      const productCategory = typeof product.category === 'object' && product.category !== null && 'name' in product.category
        ? product.category.name
        : product.category as string;
      
      if (productCategory !== categoryFilter) {
        return false;
      }
    }
    
    // Apply stock filter
    if (stockFilter === 'inStock' && product.totalStock <= 0) {
      return false;
    } else if (stockFilter === 'outOfStock' && product.totalStock > 0) {
      return false;
    } else if (stockFilter === 'lowStock') {
      const minLevel = product.minStockLevel || 5; // Default to 5 if not set
      if (product.totalStock > minLevel || product.totalStock <= 0) {
        return false;
      }
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      comparison = a.sellingPrice - b.sellingPrice;
    } else if (sortBy === 'stock') {
      comparison = a.totalStock - b.totalStock;
    } else if (sortBy === 'category') {
      const aCategory = typeof a.category === 'object' && a.category !== null && 'name' in a.category
        ? a.category.name
        : a.category as string;
      const bCategory = typeof b.category === 'object' && b.category !== null && 'name' in b.category
        ? b.category.name
        : b.category as string;
      comparison = aCategory.localeCompare(bCategory);
    } else if (sortBy === 'sold') {
      comparison = (a.soldQuantity || 0) - (b.soldQuantity || 0);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Get current page of products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  // Toggle sort direction when clicking on the same sort option
  const handleSortChange = (option: string) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };
  
  // Change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll window back to top when changing pages
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };
  
  // When filters change, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, categoryFilter, stockFilter, sortBy, sortDirection]);
  
  // Set up an interval to refetch data periodically
  useEffect(() => {
    // Refetch on component mount
    refetchInventory();
    
    // Set up a polling interval for periodic refresh
    const intervalId = setInterval(() => {
      refetchInventory();
    }, 10000); // Refresh every 10 seconds
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [refetchInventory]);
  
  // Calculate monthly quantities for all products with batches
  // Using useRef to prevent unnecessary re-calculations
  const calculatedMonthlyDataRef = useRef(false);
  
  useEffect(() => {
    // Only calculate once per component lifecycle to prevent infinite loops
    if (!calculatedMonthlyDataRef.current && !isLoading && products.length > 0) {
      const calculateMonthlyData = async () => {

        calculatedMonthlyDataRef.current = true;
      };
      
      calculateMonthlyData();
    }
  // Depend only on loading state, not products array
  }, [isLoading]);
  
  // Load saved filters from localStorage on initial render
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      try {
        const savedFilters = localStorage.getItem('inventoryFilters');
        if (savedFilters) {
          const { search, category, stock, sort, direction, perPage } = JSON.parse(savedFilters);
          
          if (search) setSearchText(search);
          if (category) setCategoryFilter(category);
          if (stock) setStockFilter(stock);
          if (sort) setSortBy(sort);
          if (direction) setSortDirection(direction);
          if (perPage) setItemsPerPage(Number(perPage));
        }
        
        // Load saved items per page preference
        const savedItemsPerPage = localStorage.getItem('itemsPerPage');
        if (savedItemsPerPage) {
          const value = Number(savedItemsPerPage);
         
          if (value === 0) {
            setItemsPerPage(1000); // Use a large number instead of products.length
          } else {
            setItemsPerPage(value);
          }
        }
      } catch (error) {
        console.error('Error loading saved filters:', error);
      }
    }
  // Remove products.length from the dependency array to prevent infinite loops
  }, []);

  // Save filter preferences to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const filtersToSave = JSON.stringify({
        search: searchText,
        category: categoryFilter,
        stock: stockFilter,
        sort: sortBy,
        direction: sortDirection,
        perPage: itemsPerPage
      });
      
      localStorage.setItem('inventoryFilters', filtersToSave);
    }
  }, [searchText, categoryFilter, stockFilter, sortBy, sortDirection, itemsPerPage]);
  
  const handleViewProduct = (id: string) => {
    router.push(`/dashboard/products/${id}`);
  };
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Add this useEffect to detect mobile screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleViewBatches = (product: {id: string, name: string}, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click navigation
    
    // Use the isMobile state instead of checking window.innerWidth directly
    if (isMobile) {
      // Redirect to dedicated batch page on mobile
      router.push(`/dashboard/products/${product.id}/add-batch`);
    } else {
      // Show modal on desktop
      setSelectedProduct(product);
    }
  };
  
  // Handle quick sell
  const handleQuickSell = (product: {id: string, name: string}, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click navigation
    
    // Use the isMobile state instead of checking window.innerWidth directly
    if (isMobile) {
      // Redirect to dedicated sale page on mobile
      router.push(`/dashboard/products/${product.id}/record-sale`);
    } else {
      // Show modal on desktop
      setQuickSellProduct(product);
    }
  };

  // Handle modal close with data refresh
  const closeModal = () => {
    setSelectedProduct(null);
    // Refresh data when the modal is closed
    refetchInventory();
  };

  const closeSellModal = () => {
    setQuickSellProduct(null);
    // Refresh data when the sell modal is closed
    refetchInventory();
  };

  // When pagination settings change, reset the scroll position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [currentPage, itemsPerPage]);

  // Add this useEffect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add state to track loading for product actions
  const [loadingProductAction, setLoadingProductAction] = useState<{ [productId: string]: 'delete' | 'addBatch' | 'quickSell' | null }>({});

  const handleDeleteProduct = async (productId: string, productName: string) => {
    setLoadingProductAction((prev) => ({ ...prev, [productId]: 'delete' }));
    const confirmation = window.confirm(t('inventory.deleteProductConfirmation', { productName }));
    if (!confirmation) {
      setLoadingProductAction((prev) => ({ ...prev, [productId]: null }));
      return;
    }
    const warningConfirmation = window.confirm(t('inventory.deleteProductWarning'));
    if (!warningConfirmation) {
      setLoadingProductAction((prev) => ({ ...prev, [productId]: null }));
      return;
    }
    const toastId = toast.loading(t('common.loading'));
    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete product (${response.status})`);
      }
      toast.success(t('common.success'), { id: toastId });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      refetchInventory();
    } catch (err: any) {
      toast.error(`${t('common.error')}: ${err.message}`, { id: toastId });
      console.error("Failed to delete product:", err);
    } finally {
      setLoadingProductAction((prev) => ({ ...prev, [productId]: null }));
    }
  };

  const toggleDropdown = (productId: string) => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // ADDED: State for filters modal

  // Add batch and quick sell handlers with loading state
  const handleAddBatch = (product: {id: string, name: string}, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingProductAction((prev) => ({ ...prev, [product.id]: 'addBatch' }));
    setTimeout(() => {
      handleViewBatches(product, e);
      setLoadingProductAction((prev) => ({ ...prev, [product.id]: null }));
    }, 300); // Simulate loading for UX
  };

  const handleQuickSellWithLoading = (product: {id: string, name: string}, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingProductAction((prev) => ({ ...prev, [product.id]: 'quickSell' }));
    setTimeout(() => {
      handleQuickSell(product, e);
      setLoadingProductAction((prev) => ({ ...prev, [product.id]: null }));
    }, 300); // Simulate loading for UX
  };

  // Helper to get current month/year
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // State to store all batches for all products
  const [allBatches, setAllBatches] = useState<Record<string, any[]>>({});

  useEffect(() => {
    async function fetchAllBatches() {
      const batchesByProduct: Record<string, any[]> = {};
      for (const product of products) {
        const res = await fetch(`/api/batches/quantities?productId=${product.id}`);
        if (res.ok) {
          const batches = await res.json();
          batchesByProduct[product.id] = batches;
        }
      }
      setAllBatches(batchesByProduct);
    }
    if (products.length > 0) fetchAllBatches();
  }, [products]);

  // Helper to calculate average price for current month
  const getAvgPriceForCurrentMonth = (productId: string) => {
    const batches = allBatches[productId] || [];
    const monthBatches = batches.filter((batch: any) => {
      const date = new Date(batch.purchaseDate);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    if (monthBatches.length === 0) return 0;
    const total = monthBatches.reduce((sum: number, batch: any) => sum + batch.purchasePrice, 0);
    return total / monthBatches.length;
  };

  // If loading, show skeleton placeholders
  if (isLoading) {
    return (
      <div className="p-2 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 md:mb-0">
            {t('inventory.loadingProducts')}
          </h1>
        </div>
        {/* Simplified loading skeleton */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow animate-pulse">
          <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[calc(100vh-150px)]">
        <XCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-500 mb-2">{t('common.error')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('inventory.errorLoadingProducts')}</p>
        <Button onClick={() => refetchInventory()} variant="outline">
          <Package size={16} className="mr-2" /> {t('common.refresh')}
        </Button>
      </div>
    );
  }
  
  const handleClearFilters = () => {
    setSearchText('');
    setCategoryFilter('');
    setStockFilter('all');
    setSortBy('name');
    setSortDirection('asc');
    setCurrentPage(1);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('inventoryFilters');
    }
    setIsFiltersOpen(false); // ADDED: Close modal on clear
  };

  const formatCurrencyLocalized = (amount: number) => {
    const raw = formatCurrency(amount);
    return raw
      .replace('K', t('common.thousandAbbr'))
      .replace('M', t('common.millionAbbr'));
  };

  return (
    <> {/* Top-level React Fragment */}
      <div className="p-1 md:p-4 space-y-4"> {/* Main page content wrapper */}
        {/* Header and Add Product Button */}
        <div className="flex flex-row justify-between items-center gap-2 px-2 md:px-0">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
            {t('inventory.title')} ({filteredProducts.length})
          </h1>
          <Link href="/dashboard/products/new" passHref>
            <Button>
              <Plus size={18} className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">{t('inventory.addNewProduct')}</span>
            </Button>
          </Link>
        </div>

        {/* MODIFIED: New Search and Filters Bar */}
        <div className="bg-white dark:bg-slate-800 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 mx-2 pd:mx-0">
          <div className="flex items-center gap-3 px-1 md:px-4">
            {/* Search Input (takes flex-grow) */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400 dark:text-gray-500" />
              </div>
              <input 
                type="text" 
                id="search" 
                ref={searchInputRef}
                placeholder={t('inventory.searchPlaceholder')}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 dark:focus:ring-offset-slate-800"
              />
            </div>

            {/* Filters Button */}
            <Button variant="outline" onClick={() => setIsFiltersOpen(true)} className="shrink-0">
              <Filter size={16} className="mr-0 md:mr-2" />
              <span className="hidden md:inline">{t('inventory.filters')}</span>
            </Button>
          </div>
        </div>

        {/* Products Table / Cards - Desktop & Mobile */}
        {currentProducts.length > 0 ? (
          <>
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0 z-10">
                  <tr>
                    <th 
                      className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('name')}
                    >
                      <span className="flex items-center">
                        {t('inventory.part')}
                        {sortBy === 'name' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </span>
                    </th>
                    <th 
                      className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('category')}
                    >
                      <span className="flex items-center">
                        {t('inventory.category')}
                        {sortBy === 'category' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </span>
                    </th>
                    <th 
                      className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('stock')}
                    >
                      <span className="flex items-center">
                        {t('inventory.stock')}
                        {sortBy === 'stock' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </span>
                    </th>
                    <th 
                      className="w-16 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('sold')}
                    >
                      <span className="flex items-center">
                        {t('inventory.sold')}
                        {sortBy === 'sold' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </span>
                    </th>
                    <th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t('inventory.batches')}
                    </th>
                    <th className="w-32 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t('inventory.avgPrice')}
                    </th>
                    <th 
                      className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSortChange('price')}
                    >
                      <span className="flex items-center">
                        {t('inventory.priceHeader')}
                        {sortBy === 'price' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </span>
                    </th>
                    <th className="w-28 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t('inventory.sku')}
                    </th>
                    <th className="w-24 px-3 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t('inventory.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                  {currentProducts.map((product) => (
                    <tr 
                      key={product.id} 
                      className="hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
                      onClick={() => handleViewProduct(product.id)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {product.name}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {typeof product.category === 'object' && product.category !== null && 'name' in product.category 
                            ? product.category.name 
                            : product.category}
                        </span>
                      </td>
                      <td className={`px-3 py-3 text-sm ${
                        product.totalStock <= (product.minStockLevel || 0) 
                          ? 'text-red-600 dark:text-red-400 font-medium' 
                          : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {product.totalStock}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {product.soldQuantity || 0}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">
                        <button 
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={(e) => handleViewBatches({id: product.id, name: product.name}, e)}
                        >
                          <Layers size={14} className="mr-1" />
                          {product.batchCount || 0}
                        </button>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {formatCurrencyLocalized(getAvgPriceForCurrentMonth(product.id))}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {formatCurrencyLocalized(product.sellingPrice)}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300 font-mono">
                        {product.sku}
                      </td>
                      <td className="px-3 py-3 text-sm text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="p-1.5 rounded-full bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 transition-colors"
                            title={t('inventory.addBatchTitle')}
                            onClick={(e) => handleAddBatch({id: product.id, name: product.name}, e)}
                            disabled={loadingProductAction[product.id] === 'addBatch'}
                          >
                            {loadingProductAction[product.id] === 'addBatch' ? (
                              <span className="animate-spin border-t-2 border-b-2 border-green-600 rounded-full w-5 h-5 inline-block"></span>
                            ) : (
                              <PlusCircle size={16} className="text-green-600 dark:text-green-400" />
                            )}
                          </button>
                          <button 
                            className="p-1.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-colors"
                            title={t('sales.recordSaleTitle')}
                            onClick={(e) => handleQuickSellWithLoading({id: product.id, name: product.name}, e)}
                            disabled={loadingProductAction[product.id] === 'quickSell'}
                          >
                            {loadingProductAction[product.id] === 'quickSell' ? (
                              <span className="animate-spin border-t-2 border-b-2 border-amber-600 rounded-full w-5 h-5 inline-block"></span>
                            ) : (
                              <MinusCircle size={16} className="text-amber-600 dark:text-amber-400" />
                            )}
                          </button>
                          
                          {/* More options dropdown */}
                          <div className="relative" ref={e => {
                            // Only set the ref for the active dropdown
                            if (product.id === activeDropdown) {
                              dropdownRef.current = e;
                            }
                          }}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdown(activeDropdown === product.id ? null : product.id);
                              }}
                              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-600"
                              title={t('common.moreOptions')}
                            >
                              <MoreHorizontal size={16} className="text-gray-600 dark:text-gray-400" />
                            </button>
                            
                            {/* Dropdown menu */}
                            {activeDropdown === product.id && (
                              <DropdownMenu open={true} onOpenChange={() => setActiveDropdown(null)}>
                                <DropdownMenuTrigger asChild>
                                  {/* This button is invisible and just for positioning the DropdownMenuContent */}
                                  <button className="absolute w-full h-full top-0 left-0 opacity-0"></button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                  <DropdownMenuItem onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleViewProduct(product.id); setActiveDropdown(null); }}>
                                    <Edit size={14} className="mr-2 text-blue-600 dark:text-blue-400" />
                                    {t('common.edit')}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleDeleteProduct(product.id, product.name); setActiveDropdown(null); }} className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/30 focus:text-red-700 dark:focus:text-red-300">
                                    {loadingProductAction[product.id] === 'delete' ? (
                                      <span className="mr-2 animate-spin border-t-2 border-b-2 border-red-600 rounded-full w-4 h-4 inline-block"></span>
                                    ) : (
                                      <Trash2 size={14} className="mr-2" />
                                    )}
                                    {t('common.delete')}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile List View */}
            <div className="md:hidden px-1 md:px-4">
              {currentProducts.map((product) => (
                <div 
                  key={product.id}
                  className="p-4 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2 cursor-pointer" onClick={() => handleViewProduct(product.id)}>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center flex-wrap gap-1">
                      <button 
                        className="p-2 rounded-full bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 transition-colors"
                        title={t('inventory.addBatchTitle')}
                        onClick={(e) => handleAddBatch({id: product.id, name: product.name}, e)}
                        disabled={loadingProductAction[product.id] === 'addBatch'}
                      >
                        {loadingProductAction[product.id] === 'addBatch' ? (
                          <span className="animate-spin border-t-2 border-b-2 border-green-600 rounded-full w-5 h-5 inline-block"></span>
                        ) : (
                          <PlusCircle size={18} className="text-green-600 dark:text-green-400" />
                        )}
                      </button>
                      <button 
                        className="p-2 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-colors"
                        title={t('sales.recordSaleTitle')}
                        onClick={(e) => handleQuickSellWithLoading({id: product.id, name: product.name}, e)}
                        disabled={loadingProductAction[product.id] === 'quickSell'}
                      >
                        {loadingProductAction[product.id] === 'quickSell' ? (
                          <span className="animate-spin border-t-2 border-b-2 border-amber-600 rounded-full w-5 h-5 inline-block"></span>
                        ) : (
                          <MinusCircle size={18} className="text-amber-600 dark:text-amber-400" />
                        )}
                      </button>
                      <button 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        title={t('common.edit')}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProduct(product.id);
                        }}
                      >
                        <Edit size={18} className="text-blue-600 dark:text-blue-400" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        title={t('common.delete')}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product.id, product.name);
                        }}
                        disabled={loadingProductAction[product.id] === 'delete'}
                      >
                        {loadingProductAction[product.id] === 'delete' ? (
                          <span className="animate-spin border-t-2 border-b-2 border-red-600 rounded-full w-5 h-5 inline-block"></span>
                        ) : (
                          <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 cursor-pointer" onClick={() => handleViewProduct(product.id)}>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">{t('inventory.available')}</span>
                        <span className={`text-sm font-medium ${
                          product.totalStock <= (product.minStockLevel || 0) 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {product.totalStock} {t('inventory.units')}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">{t('inventory.sold')}</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {product.soldQuantity || 0} {t('inventory.units')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">{t('inventory.price')}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrencyLocalized(product.sellingPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {filteredProducts.length > itemsPerPage && (
              <div className="sticky bottom-0 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex-1 flex justify-between md:hidden">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 disabled:opacity-50"
                    >
                      {t('inventory.previous')}
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {t('inventory.page')} {currentPage} {t('inventory.of')} {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 disabled:opacity-50"
                    >
                      {t('inventory.next')}
                    </button>
                  </div>
                  <div className="hidden md:flex md:flex-1 md:items-center md:justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {t('inventory.showing')} <span className="font-medium">{indexOfFirstItem + 1}</span> {t('inventory.to')}{' '}
                        <span className="font-medium">
                          {Math.min(indexOfLastItem, filteredProducts.length)}
                        </span>{' '}
                        {t('inventory.of')} <span className="font-medium">{filteredProducts.length}</span> {t('inventory.products')}
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                          // Create a range of page numbers centered around current page
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
                                onClick={() => goToPage(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                  currentPage === pageNum
                                    ? 'z-10 bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300'
                                    : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          
                          return null;
                        })}
                        
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-600 disabled:opacity-50"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                    
                    <div className="flex items-center ml-4 border-l pl-4 border-gray-200 dark:border-slate-700">
                      <label htmlFor="itemsPerPage" className="text-sm text-gray-700 dark:text-gray-300 mr-2 font-medium">
                        {t('inventory.itemsPerPage')}:
                      </label>
                      <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => {
                          let newItemsPerPage = Number(e.target.value);
                          
                          // If "All" is selected (value of 0), use the total number of items
                          if (newItemsPerPage === 0) {
                            newItemsPerPage = filteredProducts.length;
                          }
                          
                          setItemsPerPage(newItemsPerPage);
                          setCurrentPage(1);
                          setIsChangingPageSize(true);
                          
                          // Save preference to localStorage
                          if (typeof window !== 'undefined') {
                            localStorage.setItem('itemsPerPage', e.target.value.toString());
                            
                            // Scroll window to top after changing items per page
                            setTimeout(() => {
                              window.scrollTo(0, 0);
                              setIsChangingPageSize(false);
                            }, 100);
                          }
                        }}
                        className="border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={0}>{t('common.all')}</option> {/* Translated "All" text */}
                      </select>
                      
                      {isChangingPageSize && (
                        <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-1 md:px-4 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 min-h-[300px]">
            <Package size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">{t('inventory.noProductsMatching')}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">{t('common.tryAdjusting')}</p>
            <Button onClick={handleClearFilters} variant="outline">
              <Filter size={16} className="mr-2" /> {t('inventory.clearAllFilters')}
            </Button>
          </div>    
        )}
      </div>

      {/* Filters Modal/Panel - Temporary Structure */}
      {isFiltersOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 flex justify-end" onClick={() => setIsFiltersOpen(false)}>
          <div 
            className="bg-white dark:bg-slate-800 w-full max-w-sm h-full shadow-xl p-6 space-y-4 overflow-y-auto transform transition-transform ease-in-out duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('inventory.filters')}</h3>
              <Button variant="outline" size="icon" onClick={() => setIsFiltersOpen(false)}>
                <X size={20} />
              </Button>
            </div>
            
            {/* Category Filter */}
            <div>
              <label htmlFor="categoryFilterModal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('inventory.filterByCategory')}
              </label>
              <select 
                id="categoryFilterModal" 
                value={categoryFilter} 
                onChange={(e) => { setCategoryFilter(e.target.value); /* setIsFiltersOpen(false); Optional: close on change */ }}
                className="w-full py-2 px-3 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 dark:focus:ring-offset-slate-800"
              >
                <option value="">{t('inventory.allCategories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Stock Status Filter */}
            <div>
              <label htmlFor="stockFilterModal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('inventory.filterByStock')}
              </label>
              <select 
                id="stockFilterModal" 
                value={stockFilter} 
                onChange={(e) => { setStockFilter(e.target.value); /* setIsFiltersOpen(false); */ }}
                className="w-full py-2 px-3 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 dark:focus:ring-offset-slate-800"
              >
                <option value="all">{t('inventory.allStock')}</option>
                <option value="inStock">{t('inventory.inStock')}</option>
                <option value="lowStock">{t('inventory.lowStock')}</option>
                <option value="outOfStock">{t('inventory.outOfStock')}</option>
              </select>
            </div>
            
            {/* Apply/View Results Button or just rely on auto-apply from selects */}
            <Button onClick={() => setIsFiltersOpen(false)} className="w-full mt-6">
              {t('common.applyFilters')} {/* Assuming a new translation key or re-use common.apply */}
            </Button>

            <Button onClick={handleClearFilters} variant="outline" className="w-full">
              <XSquare size={16} className="mr-2" /> {t('inventory.clearAllFilters')}
            </Button>
          </div>
        </div>
      )}

      {/* Other Modals (BatchesModal, QuickSellModal) */}
      {selectedProduct && (
        <BatchesModal 
          onClose={closeModal}
          productName={selectedProduct.name!} 
          productId={selectedProduct.id!}
          key={selectedProduct.id}
        />
      )}
      {quickSellProduct && (
        <QuickSellModal 
          onClose={closeSellModal} 
          productName={quickSellProduct.name!}
          productId={quickSellProduct.id!}
          key={`sell-${quickSellProduct.id}`}
        />
      )}
    </> // This is the main fragment closing tag
  );
} 