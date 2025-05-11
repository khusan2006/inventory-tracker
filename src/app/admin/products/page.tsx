"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/admin/Header';
import { Package, Truck, Trash2, Edit, Plus, Layers, DollarSign, Calendar, MinusCircle, PlusCircle, ShoppingCart, X, AlertTriangle, XCircle } from 'lucide-react';
import BatchesModal from '@/components/inventory/BatchesModal';
import QuickSellModal from '@/components/inventory/QuickSellModal';
import { useInventory } from '@/hooks/useInventory';
import { useProductBatches } from '@/hooks/useProductBatches';

// Updated Product interface to handle category as either string or object
interface Product {
  id: string;
  sku: string;
  name: string;
  category: string | { id: string; name: string; color?: string; };
  description?: string;
  sellingPrice: number;
  totalStock: number;
  fitment?: string;
  minStockLevel?: number;
  location?: string;
  imageUrl?: string;
  supplier?: string;
  batchCount: number;
  avgPurchasePrice: number;
  monthlyQuantity: number;
  soldQuantity: number;
}

export default function ProductsPage() {
  const router = useRouter();
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
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        // We'll only calculate this for products that have batches to save API calls
        const productsWithBatches = products.filter(p => p.batchCount > 0);
        
        // No longer directly calling hooks inside useEffect
        // This was causing the "Invalid hook call" error
        
        // Mark as calculated
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
          const { search, category, stock, sort, direction } = JSON.parse(savedFilters);
          
          if (search) setSearchText(search);
          if (category) setCategoryFilter(category);
          if (stock) setStockFilter(stock);
          if (sort) setSortBy(sort);
          if (direction) setSortDirection(direction);
        }
        
        // Load saved items per page preference
        const savedItemsPerPage = localStorage.getItem('itemsPerPage');
        if (savedItemsPerPage) {
          const value = Number(savedItemsPerPage);
          // If "All" is selected (value of 0), use a large number instead of products.length
          // This prevents the infinite loop caused by dependency on products.length
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
      const filtersToSave = {
        search: searchText,
        category: categoryFilter,
        stock: stockFilter,
        sort: sortBy,
        direction: sortDirection
      };
      
      localStorage.setItem('inventoryFilters', JSON.stringify(filtersToSave));
    }
  }, [searchText, categoryFilter, stockFilter, sortBy, sortDirection]);
  
  const handleViewProduct = (id: string) => {
    router.push(`/admin/products/${id}`);
  };
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
      router.push(`/admin/products/${product.id}/add-batch`);
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
      router.push(`/admin/products/${product.id}/record-sale`);
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

  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <div className="md:block hidden">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Auto Parts Inventory</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'part' : 'parts'} found
              </p>
            </div>
            
            <Link href="/admin/products/new" className="hidden sm:flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors">
              <Plus size={18} className="mr-2" />
              Add Auto Part
            </Link>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700">
              <div className="space-y-3">
                {/* Search bar - full width on mobile */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
        </div>
                <input
                  type="text"
                    placeholder="Search parts..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-slate-600 
                             text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                             rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    ref={searchInputRef}
                  />
                  {searchText && (
                    <button 
                      onClick={() => setSearchText('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X size={16} />
                    </button>
                  )}
              </div>
              
                {/* Filter controls - scrollable horizontal row on mobile */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex-shrink-0">
                    <select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="border border-gray-300 dark:border-slate-600 
                               text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                               rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
                    >
                  <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <select 
                      value={stockFilter}
                      onChange={(e) => setStockFilter(e.target.value)}
                      className="border border-gray-300 dark:border-slate-600 
                               text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                               rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
                    >
                      <option value="all">All Stock</option>
                      <option value="inStock">In Stock</option>
                      <option value="lowStock">Low Stock</option>
                      <option value="outOfStock">Out of Stock</option>
                </select>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <select 
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="border border-gray-300 dark:border-slate-600 
                               text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                               rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
                    >
                      <option value="name">Sort: Name</option>
                      <option value="stock">Sort: Stock</option>
                      <option value="price">Sort: Price</option>
                      <option value="category">Sort: Category</option>
                      <option value="sold">Sort: Sales</option>
                </select>
                  </div>
                  
                  <button
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    className="flex-shrink-0 border border-gray-300 dark:border-slate-600 
                             text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700 
                             rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
                  >
                    {sortDirection === 'asc' ? '↑ Asc' : '↓ Desc'}
                  </button>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading inventory...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <div className="text-red-500 text-lg">Error loading inventory data</div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Please try refreshing the page</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="text-gray-500 text-lg">No products found</div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
                {searchText || categoryFilter || stockFilter !== 'all' ? (
                  <button
                    onClick={() => {
                      setSearchText('');
                      setCategoryFilter('');
                      setStockFilter('all');
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Clear Filters
                  </button>
                ) : null}
          </div>
            ) : (
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
                            Part
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
                  Category
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
                  Stock
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
                            Sold
                            {sortBy === 'sold' && (
                              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </span>
                        </th>
                        <th className="w-20 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Batches
                        </th>
                        <th className="w-32 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Avg. Price
                </th>
                        <th 
                          className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSortChange('price')}
                        >
                          <span className="flex items-center">
                  Price
                            {sortBy === 'price' && (
                              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </span>
                        </th>
                        <th className="w-28 px-3 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          SKU
                </th>
                        <th className="w-24 px-3 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
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
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(product.avgPurchasePrice || 0)}
                          </td>
                          <td className="px-3 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(product.sellingPrice)}
                  </td>
                          <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-300 font-mono">
                            {product.sku}
                  </td>
                          <td className="px-3 py-3 text-sm text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button 
                                className="p-1.5 rounded-full bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 transition-colors"
                                title="Add Inventory Batch"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewBatches({id: product.id, name: product.name}, e);
                                }}
                              >
                                <PlusCircle size={16} className="text-green-600 dark:text-green-400" />
                              </button>
                              <button 
                                className="p-1.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-colors"
                                title="Record Sale"
                                onClick={(e) => {
                                  handleQuickSell({id: product.id, name: product.name}, e);
                                }}
                              >
                                <MinusCircle size={16} className="text-amber-600 dark:text-amber-400" />
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
                                  title="More Options"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                  </svg>
                                </button>
                                
                                {/* Dropdown menu */}
                                {activeDropdown === product.id && (
                                  <div className="absolute right-0 mt-1 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-gray-200 dark:border-slate-700 z-10 w-32">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewProduct(product.id);
                                        setActiveDropdown(null);
                                      }}
                                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 w-full text-left"
                                    >
                                      <Edit size={14} className="inline mr-2 text-blue-600 dark:text-blue-400" />
                                      Edit
                      </button>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Add delete functionality here
                                        setActiveDropdown(null);
                                      }}
                                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 w-full text-left"
                                    >
                                      <Trash2 size={14} className="inline mr-2 text-red-600 dark:text-red-400" />
                                      Delete
                      </button>
                                  </div>
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
                <div className="md:hidden">
                  {currentProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="p-4 border-b border-gray-100 dark:border-slate-700 last:border-0"
                      onClick={() => handleViewProduct(product.id)}
                    >
            <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
                            {product.name}
                          </h3>
                        </div>

                        <div className="flex items-center">
                          <button 
                            className="p-2 rounded-full bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 transition-colors"
                            title="Add Inventory Batch"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewBatches({id: product.id, name: product.name}, e);
                            }}
                          >
                            <PlusCircle size={18} className="text-green-600 dark:text-green-400" />
                          </button>
                          <button 
                            className="p-2 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-colors ml-1"
                            title="Record Sale"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickSell({id: product.id, name: product.name}, e);
                            }}
                          >
                            <MinusCircle size={18} className="text-amber-600 dark:text-amber-400" />
                          </button>
                          <button 
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ml-1"
                            title="Edit Product"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewProduct(product.id);
                            }}
                          >
                            <Edit size={18} className="text-blue-600 dark:text-blue-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">Available</span>
                            <span className={`text-sm font-medium ${
                              product.totalStock <= (product.minStockLevel || 0) 
                                ? 'text-red-600 dark:text-red-400' 
                                : 'text-gray-800 dark:text-gray-200'
                            }`}>
                              {product.totalStock} units
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">Sold</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {product.soldQuantity || 0} units
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">Price</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(product.sellingPrice)}
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
                  Previous
                </button>
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 disabled:opacity-50"
                        >
                  Next
                </button>
                      </div>
                      <div className="hidden md:flex md:flex-1 md:items-center md:justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                            <span className="font-medium">
                              {Math.min(indexOfLastItem, filteredProducts.length)}
                            </span>{' '}
                            of <span className="font-medium">{filteredProducts.length}</span> products
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
                            Items per page:
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
                            <option value={0}>All</option>
                          </select>
                          
                          {isChangingPageSize && (
                            <span className="ml-2">
                              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full inline-block"></div>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
              </div>
            </div>
      </main>
      
      {/* Full page dialogs on mobile */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex p-0 md:p-4 md:items-center md:justify-center">
          <div className="bg-white dark:bg-slate-800 md:rounded-lg shadow-xl w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl overflow-y-auto">
            <BatchesModal 
              productId={selectedProduct.id}
              productName={selectedProduct.name}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
      
      {quickSellProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex p-0 md:p-4 md:items-center md:justify-center">
          <div className="bg-white dark:bg-slate-800 md:rounded-lg shadow-xl w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl overflow-y-auto">
            <QuickSellModal
              productId={quickSellProduct.id}
              productName={quickSellProduct.name}
              onClose={closeSellModal}
            />
      </div>
    </div>
      )}
    </>
  );
} 