"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, X, AlertTriangle, Calculator, CreditCard, DollarSign, RefreshCw } from 'lucide-react';
import { Batch, calculateBatchProfit, getBatchesForSale } from '@/types/inventory';
import { toast } from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useProduct } from '@/hooks/useProducts';
import { useProductBatches } from '@/hooks/useProductBatches';
import { batchKeys } from '@/hooks/useBatches';
import { productKeys } from '@/hooks/useProducts';

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
}

interface QuickSellModalProps {
  productId: string;
  productName: string;
  onClose: () => void;
}

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

export default function QuickSellModal({ productId, productName, onClose }: QuickSellModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatchesForSale, setSelectedBatchesForSale] = useState<BatchWithSale[]>([]);
  
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
  
  // Sort batches by purchase date (oldest first - FIFO)
  const sortedBatches = [...(batches || [])].sort(
    (a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
  );
  
  // Calculate total stock from active batches
  const totalAvailableStock = sortedBatches
    .filter(batch => batch.status === 'active')
    .reduce((sum, batch) => sum + batch.currentQuantity, 0);

  // Update selected batches and profit when quantity or selling price changes
  useEffect(() => {
    // Calculate which batches will be used and update state
    if (product && sortedBatches.length > 0 && quantity > 0) {
      const availableBatches = sortedBatches.filter(b => b.status === 'active' && b.currentQuantity > 0);
      if (availableBatches.length > 0) {
        const result = getBatchesForSaleFIFO(availableBatches, quantity);
        setSelectedBatchesForSale(result.selectedBatches);
      } else {
        setSelectedBatchesForSale([]);
      }
    } else {
      setSelectedBatchesForSale([]);
    }
  }, [quantity, product, sortedBatches]);
  
  // Calculate potential profit based on current inputs
  const calculateProfit = () => {
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
  };
  
  const { profit, margin } = calculateProfit();

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
      
      // Get response data and parse it once
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
        const availableBatches = sortedBatches.filter(b => b.status === 'active' && b.currentQuantity > 0);
        const result = getBatchesForSaleFIFO(availableBatches, quantity);
        
        // Create optimistic updated batches
        const updatedBatches = batches.map(batch => {
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
        
        // Update cache with optimistic data
        queryClient.setQueryData(batchKeys.list(productId), updatedBatches);
        
        // Update product's total stock
        const newTotalStock = product.totalStock - quantity;
        queryClient.setQueryData(productKeys.detail(productId), {
          ...product,
          totalStock: newTotalStock
        });
      }
      
      // Return previous values for rollback
      return { previousBatches, previousProduct };
    },
    onError: (error, _, context) => {
      // Rollback cache to previous values
      if (context?.previousBatches) {
        queryClient.setQueryData(batchKeys.list(productId), context.previousBatches);
      }
      if (context?.previousProduct) {
        queryClient.setQueryData(productKeys.detail(productId), context.previousProduct);
      }
      
      console.error('Sale error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process sale');
      toast.error(error instanceof Error ? error.message : 'Failed to process sale');
    },
    onSuccess: () => {
      // Show success toast
      toast.success('Sale recorded successfully');
      
      // Invalidate all related queries to ensure UI is updated
      queryClient.invalidateQueries({ queryKey: batchKeys.summaries() });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      
      // Force refetch the inventory data to update rows in the table
      queryClient.refetchQueries({ queryKey: ['inventory'] });
      
      // Close modal
      onClose();
    }
  });
  
  const handleSale = () => {
    setError(null);
    
    // Validate inputs
    if (quantity <= 0) {
      setError('Please enter a valid quantity');
      return;
    }
    
    if (sellingPrice <= 0) {
      setError('Please enter a valid selling price');
      return;
    }
    
    // Check if we have enough stock
    if (quantity > totalAvailableStock) {
      setError(`Not enough stock. Only ${totalAvailableStock} units available.`);
      return;
    }
    
    // Process the sale using mutation
    saleMutation.mutate();
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Show loading state while fetching data
  if (isLoadingProduct || isLoadingBatches) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show error state if there was an error loading data
  if (productError || batchesError) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="text-center py-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Error Loading Data</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {productError instanceof Error ? productError.message : 
               batchesError instanceof Error ? batchesError.message : 
               'Failed to load required data'}
            </p>
            <button
              onClick={onClose}
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="text-center py-8">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Product Not Found</h3>
            <button
              onClick={onClose}
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Sell - {product.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Available Stock
              </label>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {totalAvailableStock} units
              </div>
              {totalAvailableStock === 0 && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  This product is out of stock
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantity to Sell
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                min="1"
                max={totalAvailableStock}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                disabled={totalAvailableStock === 0}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Selling Price (per unit)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                  min="0.01"
                  step="0.01"
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  disabled={totalAvailableStock === 0}
                />
              </div>
              {product.sellingPrice > 0 && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Suggested price: ${product.sellingPrice.toFixed(2)}
                </p>
              )}
            </div>
            
            {/* Batches to be used for this sale */}
            {selectedBatchesForSale.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Batches to be used (FIFO order):
                </h3>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-md border border-gray-200 dark:border-slate-600 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
                    <thead className="bg-gray-100 dark:bg-slate-600">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Qty</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cost</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Profit</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200 dark:divide-slate-600">
                      {selectedBatchesForSale.map((batch) => {
                        const batchProfit = (sellingPrice - batch.purchasePrice) * batch.quantityToSell;
                        const batchProfitMargin = batch.purchasePrice > 0 ? (batchProfit / (batch.purchasePrice * batch.quantityToSell)) * 100 : 0;
                        
                        return (
                          <tr key={batch.id} className="text-xs">
                            <td className="px-3 py-2 whitespace-nowrap text-gray-600 dark:text-gray-300">
                              {formatDate(batch.purchaseDate)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-600 dark:text-gray-300">
                              {batch.quantityToSell} / {batch.currentQuantity}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-600 dark:text-gray-300">
                              ${batch.purchasePrice.toFixed(2)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <span className={batchProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                ${batchProfit.toFixed(2)} ({batchProfitMargin.toFixed(1)}%)
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                <Calculator size={16} className="mr-2" />
                Sale Summary
              </h3>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600 dark:text-gray-400">Total Revenue:</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  ${(quantity * sellingPrice).toFixed(2)}
                </div>
                
                <div className="text-gray-600 dark:text-gray-400">Estimated Profit:</div>
                <div className={`font-medium ${profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ${profit.toFixed(2)}
                </div>
                
                <div className="text-gray-600 dark:text-gray-400">Profit Margin:</div>
                <div className={`font-medium ${margin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {margin.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSale}
              disabled={saleMutation.isPending || totalAvailableStock === 0 || quantity <= 0 || sellingPrice <= 0}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saleMutation.isPending ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={16} className="mr-2" />
                  Record Sale
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 