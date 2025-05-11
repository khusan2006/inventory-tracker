"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, ShoppingCart, X, AlertTriangle, Calculator, CreditCard, DollarSign, RefreshCw, Check } from 'lucide-react';
import { Batch, calculateBatchProfit } from '@/types/inventory';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useProduct } from '@/hooks/useProducts';
import { useProductBatches } from '@/hooks/useProductBatches';
import { batchKeys } from '@/hooks/useBatches';
import { productKeys } from '@/hooks/useProducts';
import Header from '@/components/admin/Header';

// Helper type for batches with sale quantities
interface BatchWithSale extends Batch {
  quantityToSell: number;
}

// Helper function to get batches for sale using FIFO
function getBatchesForSaleFIFO(batches: Batch[], quantity: number): { 
  selectedBatches: BatchWithSale[]; 
  remainingQuantity: number; 
} {
  const selectedBatches: BatchWithSale[] = [];
  let remainingQuantity = quantity;
  
  for (const batch of batches) {
    if (remainingQuantity <= 0) break;
    
    if (batch.currentQuantity > 0) {
      const quantityToSell = Math.min(batch.currentQuantity, remainingQuantity);
      selectedBatches.push({
        ...batch,
        quantityToSell
      });
      remainingQuantity -= quantityToSell;
    }
  }
  
  return { selectedBatches, remainingQuantity };
}

// Helper function to calculate profit from batches
function calculateBatchProfitMargin(batches: BatchWithSale[], sellingPrice: number): { 
  totalProfit: number; 
  profitMargin: number; 
} {
  let totalCost = 0;
  let totalQuantity = 0;
  
  for (const batch of batches) {
    totalCost += batch.purchasePrice * batch.quantityToSell;
    totalQuantity += batch.quantityToSell;
  }
  
  const totalRevenue = sellingPrice * totalQuantity;
  const totalProfit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  
  return { totalProfit, profitMargin };
}

export default function RecordSalePage() {
  // Use the useParams hook to get the id parameter from the URL
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatchesForSale, setSelectedBatchesForSale] = useState<BatchWithSale[]>([]);
  const [saleComplete, setSaleComplete] = useState(false);
  
  // Get the query client
  const queryClient = useQueryClient();
  
  // Fetch product data using React Query
  const { 
    data: product, 
    isLoading: isLoadingProduct,
    error: productError
  } = useProduct(productId);
  
  // Fetch batch data using React Query
  const {
    data: batches = [],
    isLoading: isLoadingBatches,
    error: batchesError
  } = useProductBatches(productId);

  useEffect(() => {
    if (product) {
      setSellingPrice(product.sellingPrice);
    }
  }, [product]);
  
  // Use useMemo to prevent recalculation of sortedBatches on every render
  const sortedBatches = useMemo(() => {
    return [...(batches || [])].sort(
      (a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
    );
  }, [batches]);
  
  // Calculate total stock from active batches - also memoized
  const totalAvailableStock = useMemo(() => {
    return sortedBatches
      .filter(batch => batch.status === 'active')
      .reduce((sum, batch) => sum + batch.currentQuantity, 0);
  }, [sortedBatches]);

  // Add a ref to prevent unnecessary batch calculations
  const calculatedBatches = useRef(false);

  // Update selected batches and profit when quantity or selling price changes
  useEffect(() => {
    // Skip if already calculated in this render cycle or missing data
    if (!product || !sortedBatches.length || quantity <= 0) {
      setSelectedBatchesForSale([]);
      return;
    }

    const availableBatches = sortedBatches.filter(b => b.status === 'active' && b.currentQuantity > 0);
    if (availableBatches.length > 0) {
      const result = getBatchesForSaleFIFO(availableBatches, quantity);
      setSelectedBatchesForSale(result.selectedBatches);
    } else {
      setSelectedBatchesForSale([]);
    }
  // Use a more stable dependency list to avoid infinite re-renders
  // Use product?.id instead of product, use batches.length instead of sortedBatches to avoid reference changes
  }, [quantity, product?.id, batches?.length]);
  
  // Calculate potential profit based on current inputs - now memoized
  const { profit, margin } = useMemo(() => {
    if (!product || !sortedBatches.length) return { profit: 0, margin: 0 };
    
    // Use only active batches with stock
    const availableBatches = sortedBatches.filter(b => b.status === 'active' && b.currentQuantity > 0);
    if (!availableBatches.length) return { profit: 0, margin: 0 };
    
    // Get batches for this sale following FIFO
    const result = getBatchesForSaleFIFO(availableBatches, quantity);
    
    if (result.remainingQuantity > 0) {
      // Not enough stock
      return { profit: 0, margin: 0 };
    }
    
    // Calculate profit
    const profitResult = calculateBatchProfitMargin(result.selectedBatches, sellingPrice);
    return { profit: profitResult.totalProfit, margin: profitResult.profitMargin };
  }, [product, sortedBatches, quantity, sellingPrice]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Mutation for processing sales with optimistic updates
  const saleMutation = useMutation({
    mutationFn: async () => {
      if (!product || !sortedBatches.length) {
        throw new Error('Product or batch data is missing');
      }
      
      const availableBatches = sortedBatches.filter(b => b.status === 'active' && b.currentQuantity > 0);
      if (!availableBatches.length) {
        throw new Error('No available batches for this product');
      }
      
      const result = getBatchesForSaleFIFO(availableBatches, quantity);
      
      if (result.remainingQuantity > 0) {
        throw new Error(`Not enough stock. Only ${quantity - result.remainingQuantity} units available.`);
      }
      
      const profitResult = calculateBatchProfitMargin(result.selectedBatches, sellingPrice);
      
      // Create the sale record
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
          salePrice: sellingPrice,
          profit: profitResult.totalProfit,
          profitMargin: profitResult.profitMargin,
          saleDate: new Date().toISOString(),
          batchData: result.selectedBatches.map(b => ({
            batchId: b.id,
            quantity: b.quantityToSell
          }))
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to process sale');
      }
      
      const responseData = await response.json();
      
      return {
        sale: responseData,
        batchesToUpdate: result.selectedBatches,
        newTotalStock: product.totalStock - quantity
      };
    },
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: batchKeys.list(productId) });
      await queryClient.cancelQueries({ queryKey: productKeys.detail(productId) });
      
      // Get current data from cache
      const previousBatches = queryClient.getQueryData(batchKeys.list(productId));
      const previousProduct = queryClient.getQueryData(productKeys.detail(productId));
      
      // Prepare optimistic update data
      if (product && batches) {
        // IMPORTANT: Create stable refs to prevent further updates during render
        const stableBatches = [...batches];
        const stableProduct = {...product};
        const stableQuantity = quantity;
        
        const availableBatches = stableBatches.filter(b => b.status === 'active' && b.currentQuantity > 0);
        const result = getBatchesForSaleFIFO(availableBatches, stableQuantity);
        
        // Create optimistic updated batches
        const updatedBatches = stableBatches.map(batch => {
          const selectedBatch = result.selectedBatches.find(b => b.id === batch.id);
          if (selectedBatch) {
            return {
              ...batch,
              currentQuantity: batch.currentQuantity - selectedBatch.quantityToSell,
              status: batch.currentQuantity - selectedBatch.quantityToSell <= 0 ? 'depleted' : 'active'
            };
          }
          return batch;
        });
        
        // Update batches in cache
        queryClient.setQueryData(batchKeys.list(productId), updatedBatches);
        
        // Update product in cache
        if (stableProduct) {
          queryClient.setQueryData(productKeys.detail(productId), {
            ...stableProduct,
            totalStock: stableProduct.totalStock - stableQuantity
          });
        }
      }
      
      return { previousBatches, previousProduct };
    },
    onError: (error, _, context) => {
      // Roll back to previous data on error
      if (context?.previousBatches) {
        queryClient.setQueryData(batchKeys.list(productId), context.previousBatches);
      }
      if (context?.previousProduct) {
        queryClient.setQueryData(productKeys.detail(productId), context.previousProduct);
      }
      
      setError(error instanceof Error ? error.message : 'Failed to process sale');
    },
    onSuccess: () => {
      // Invalidate affected queries
      queryClient.invalidateQueries({ queryKey: batchKeys.summaries() });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      
      // Force refetch to update UI
      queryClient.refetchQueries({ queryKey: ['inventory'] });
      
      // Show success state
      setSaleComplete(true);
      
      // Reset after a delay
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  });
  
  const handleSale = () => {
    setError(null);
    
    // Validation
    if (quantity <= 0) {
      setError('Quantity must be greater than zero');
      return;
    }
    
    if (sellingPrice <= 0) {
      setError('Selling price must be greater than zero');
      return;
    }
    
    if (quantity > totalAvailableStock) {
      setError(`Not enough stock. Only ${totalAvailableStock} units available.`);
      return;
    }
    
    // Process sale
    saleMutation.mutate();
  };
  
  // Loading state
  const isLoading = isLoadingProduct || isLoadingBatches;
  
  // Error state
  const loadingError = productError || batchesError;
  
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="p-3 sm:p-6">
          <div className="mb-4">
            <button 
              onClick={() => router.back()} 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back to Product
            </button>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Record Sale {product ? `for ${product.name}` : ''}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter details to record a product sale
              </p>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading product data...</p>
              </div>
            ) : loadingError ? (
              <div className="p-8 text-center">
                <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                <p className="text-red-500 text-lg font-medium">Failed to load product data</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Please try again later</p>
                <button 
                  onClick={() => router.back()} 
                  className="mt-4 px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-md hover:bg-gray-300 dark:hover:bg-slate-600"
                >
                  Go Back
                </button>
              </div>
            ) : saleComplete ? (
              <div className="p-8 text-center">
                <div className="bg-green-100 dark:bg-green-900/20 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={48} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sale Recorded Successfully!</h3>
                <p className="text-gray-600 dark:text-gray-400">The inventory has been updated.</p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Redirecting to product page...</p>
              </div>
            ) : (
              <div className="p-4">
                {/* Error message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
                    <p className="flex items-center">
                      <AlertTriangle size={18} className="mr-2" />
                      {error}
                    </p>
                  </div>
                )}
                
                {/* Quantity and Price Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity to Sell <span className="text-red-600">*</span>
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <ShoppingCart size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        max={totalAvailableStock}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {totalAvailableStock} units available
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Selling Price <span className="text-red-600">*</span>
                    </label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSign size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Sale Summary */}
                <div className="mt-6 p-5 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Sale Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Total Quantity:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{quantity} units</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Unit Price:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${sellingPrice.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Total Revenue:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${(quantity * sellingPrice).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-gray-200 dark:border-slate-600 flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Estimated Profit:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        ${profit.toFixed(2)} ({margin.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Batch Details */}
                {selectedBatchesForSale.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Batch Details (FIFO Method)</h3>
                    
                    <div className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                          <thead className="bg-gray-50 dark:bg-slate-700">
                            <tr>
                              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Cost
                              </th>
                              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Qty
                              </th>
                              <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Profit
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                            {selectedBatchesForSale.map((batch) => (
                              <tr key={batch.id}>
                                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                  {formatDate(batch.purchaseDate)}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                  ${batch.purchasePrice.toFixed(2)}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                  {batch.quantityToSell}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                                  ${((sellingPrice - batch.purchasePrice) * batch.quantityToSell).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-md sm:mr-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSale}
                    disabled={saleMutation.isPending || quantity <= 0 || sellingPrice <= 0 || quantity > totalAvailableStock}
                    className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saleMutation.isPending ? (
                      <>
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} className="mr-2" />
                        Record Sale
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 