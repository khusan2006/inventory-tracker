"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/admin/Header';
import { 
  ArrowLeft, 
  BarChart3, 
  Package, 
  Calendar, 
  DollarSign, 
  Truck, 
  FileText, 
  ShoppingCart, 
  AlertTriangle,
  Plus,
  Trash2
} from 'lucide-react';
import { Batch, calculateBatchProfit, getBatchesForSale } from '@/types/inventory';
import AddBatchForm from '@/components/inventory/AddBatchForm';
import { useProduct } from '@/hooks/useProducts';
import { useProductBatches } from '@/hooks/useProductBatches';
import { useQueryClient } from '@tanstack/react-query';
import { batchKeys } from '@/hooks/useBatches';
import { productKeys } from '@/hooks/useProducts';

// Define Product interface with the correct category type
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

// Format utilities
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quickAction = searchParams.get('action');
  const [simulationQuantity, setSimulationQuantity] = useState(1);
  const [showAddBatchForm, setShowAddBatchForm] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);

  // Use React Query hooks for cached data
  const { 
    data: product, 
    isLoading: isLoadingProduct, 
    error: productError 
  } = useProduct(id as string);
  
  const {
    data: batches = [],
    isLoading: isLoadingBatches,
    error: batchesError,
    refetch: refetchBatches
  } = useProductBatches(id as string);
  
  // Loading and error states
  const isLoading = isLoadingProduct || isLoadingBatches;
  const error = productError || batchesError ? 'Failed to load product data. Please try again.' : null;

  // Set up sale modal based on URL parameter
  useEffect(() => {
    if (quickAction === 'sell') {
      setSaleModalOpen(true);
    }
  }, [quickAction]);

  // Sort batches by purchase date (oldest first - FIFO)
  const sortedBatches = [...batches].sort(
    (a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
  );
  
  // Calculate total stock from active batches
  const totalStock = sortedBatches
    .filter(batch => batch.status === 'active')
    .reduce((sum, batch) => sum + batch.currentQuantity, 0);
  
  // Get batches needed for simulation (FIFO)
  const batchesForSale = getBatchesForSale(sortedBatches, simulationQuantity);
  
  // Calculate weighted average cost across batches that would be used for sale
  let totalCost = 0;
  let totalQuantity = 0;
  let remainingQuantity = simulationQuantity;
  
  for (const batch of batchesForSale) {
    const quantityFromBatch = Math.min(batch.currentQuantity, remainingQuantity);
    totalCost += batch.purchasePrice * quantityFromBatch;
    totalQuantity += quantityFromBatch;
    remainingQuantity -= quantityFromBatch;
    
    if (remainingQuantity <= 0) break;
  }
  
  const averageCost = totalQuantity > 0 ? totalCost / totalQuantity : 0;
  
  // Calculate profit based on first batch (FIFO)
  const simulationProfit = product && batchesForSale.length > 0 ? 
    calculateBatchProfit(
      batchesForSale[0], 
      product.sellingPrice, 
      Math.min(simulationQuantity, totalStock)
    ) : 
    { profit: 0, profitMargin: 0 };

  const handleAddBatch = async (newBatch: Batch) => {
    try {
      // Send the batch to the API
      const response = await fetch('/api/batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBatch),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add batch');
      }
      
      // Refresh batch data
      refetchBatches();
      
      setShowAddBatchForm(false);
    } catch (err) {
      console.error('Error adding batch:', err);
      alert('Failed to add batch. Please try again.');
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    try {
      // Find the batch to delete first
      const batchToDelete = batches.find(b => b.id === batchId);
      
      if (!batchToDelete) return;
      
      // Call API to delete batch
      const response = await fetch(`/api/batches?id=${batchId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete batch');
      }
      
      // Refresh batch data
      refetchBatches();
    } catch (err) {
      console.error('Error deleting batch:', err);
      alert('Failed to delete batch. Please try again.');
    }
  };

  const handleSale = async () => {
    if (simulationQuantity > totalStock || !product) return;
    
    try {
      // Get batches in FIFO order
      const batchesForSale = getBatchesForSale(sortedBatches, simulationQuantity);
      
      // Calculate sale details
      let remainingToSell = simulationQuantity;
      let totalCost = 0;
      let totalRevenue = product.sellingPrice * simulationQuantity;
      
      // Create array to track batch updates
      const batchUpdates: Batch[] = [];
      
      // Process each batch in FIFO order
      for (const batch of batchesForSale) {
        if (remainingToSell <= 0) break;
        
        // How many we can sell from this batch
        const quantityFromBatch = Math.min(batch.currentQuantity, remainingToSell);
        
        // Calculate costs
        const costFromBatch = batch.purchasePrice * quantityFromBatch;
        totalCost += costFromBatch;
        
        // Update batch quantity
        const updatedBatch = {
          ...batch,
          currentQuantity: batch.currentQuantity - quantityFromBatch,
          status: batch.currentQuantity - quantityFromBatch <= 0 ? 'depleted' as const : 'active' as const
        };
        
        // Add to updates array
        batchUpdates.push(updatedBatch);
        
        // Update remaining amount to sell
        remainingToSell -= quantityFromBatch;
      }
      
      // Calculate profit
      const profit = totalRevenue - totalCost;
      const profitMargin = (profit / totalCost) * 100;
      
      // Create sale record
      const sale = {
        productId: product.id,
        batchId: batchesForSale[0].id, // Reference primary batch
        quantity: simulationQuantity,
        salePrice: product.sellingPrice,
        purchasePrice: totalCost / simulationQuantity, // Average purchase price
        profit: profit,
        profitMargin: profitMargin,
        saleDate: new Date().toISOString(),
      };
      
      // Apply optimistic updates to the cache before API calls
      const queryClient = useQueryClient();
      
      // Store current cache data for rollback if needed
      const previousBatches = queryClient.getQueryData<Batch[]>(batchKeys.list(product.id));
      const previousProduct = queryClient.getQueryData(productKeys.detail(product.id));
      
      // Update batches in cache optimistically
      if (previousBatches) {
        const optimisticBatches = previousBatches.map((cacheBatch: Batch) => {
          const updatedBatch = batchUpdates.find(b => b.id === cacheBatch.id);
          if (updatedBatch) {
            return updatedBatch;
          }
          return cacheBatch;
        });
        
        queryClient.setQueryData(batchKeys.list(product.id), optimisticBatches);
      }
      
      // Update product's total stock in cache optimistically
      if (previousProduct) {
        const newTotalStock = product.totalStock - simulationQuantity;
        queryClient.setQueryData(productKeys.detail(product.id), {
          ...previousProduct,
          totalStock: newTotalStock
        });
      }
      
      try {
        // In a real app, this would be a single transaction on the backend
        
        // 1. Update all batches
        for (const updatedBatch of batchUpdates) {
          await fetch('/api/batches', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBatch),
          });
        }
        
        // 2. Create sale record
        await fetch('/api/sales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sale),
        });
        
        // 3. Update product total stock in API
        const newTotalStock = product.totalStock - simulationQuantity;
        await fetch('/api/products', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: product.id,
            totalStock: newTotalStock
          }),
        });
        
        // Show success and reset
        alert(`Sale of ${simulationQuantity} units recorded successfully!`);
        setSaleModalOpen(false);
        setSimulationQuantity(1);
        
        // Invalidate other affected queries
        queryClient.invalidateQueries({ queryKey: batchKeys.summaries() });
        queryClient.invalidateQueries({ queryKey: ['inventory'] });
        queryClient.invalidateQueries({ queryKey: ['sales'] });
      } catch (err) {
        // If any API calls fail, rollback the cache to previous state
        if (previousBatches) {
          queryClient.setQueryData(batchKeys.list(product.id), previousBatches);
        }
        if (previousProduct) {
          queryClient.setQueryData(productKeys.detail(product.id), previousProduct);
        }
        
        throw err;
      }
    } catch (err) {
      console.error('Error recording sale:', err);
      alert('Failed to record sale. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => router.back()} 
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold mb-4">Product not found</h1>
        <button 
          onClick={() => router.back()} 
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 overflow-y-auto">
        <div className="p-6">
          {/* Back button and header */}
          <div className="mb-6">
            <button 
              onClick={() => router.push('/admin/products')}
              className="mb-4 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center text-sm border border-gray-200 dark:border-slate-700"
            >
              <ArrowLeft className="mr-1" size={14} />
              Back to Products
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">SKU: {product.sku} | Category: {typeof product.category === 'object' && product.category !== null && 'name' in product.category 
                  ? product.category.name 
                  : product.category}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => setShowAddBatchForm(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Add New Batch
                </button>
              </div>
            </div>
          </div>
          
          {/* Product details and inventory overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.description || 'No description available'}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Selling Price</p>
                    <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(product.sellingPrice)}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fitment</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.fitment || 'Universal'}</p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Storage Location</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.location || 'Not specified'}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Min. Stock Level</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.minStockLevel || 'Not set'}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Available Stock</p>
                    <p className={`text-xl font-semibold ${totalStock < (product.minStockLevel || 0) ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {totalStock} units
                    </p>
                    
                    {totalStock < (product.minStockLevel || 0) && (
                      <div className="flex items-center mt-1 text-sm text-red-600 dark:text-red-400">
                        <AlertTriangle size={14} className="mr-1" />
                        Below minimum stock level
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Simulate Sale (FIFO)</h2>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Quantity to Sell</label>
                <input
                  type="number"
                  min="1"
                  max={totalStock}
                  value={simulationQuantity}
                  onChange={(e) => setSimulationQuantity(Math.min(parseInt(e.target.value) || 1, totalStock))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700"
                />
              </div>
              
              <button
                disabled={simulationQuantity > totalStock}
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} className="mr-2" />
                Calculate Sale
              </button>
              
              {simulationQuantity > totalStock && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
                  ⚠️ Warning: Not enough inventory. Only {totalStock} units available.
                </div>
              )}
            </div>
          </div>
          
          {/* Sales Simulation */}
          <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6 ${saleModalOpen ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Sale Simulation
              {saleModalOpen && <span className="ml-2 text-blue-500 text-sm font-normal">Record a quick sale</span>}
            </h2>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="w-full md:w-60">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity to Sell
                </label>
                <input
                  type="number"
                  min="1"
                  max={totalStock}
                  value={simulationQuantity}
                  onChange={(e) => setSimulationQuantity(Math.min(parseInt(e.target.value) || 1, totalStock))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Revenue</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ${(product.sellingPrice * Math.min(simulationQuantity, totalStock)).toFixed(2)}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Profit</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    ${simulationProfit.profit.toFixed(2)}
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Profit Margin</div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {simulationProfit.profitMargin.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
            
            {saleModalOpen && (
              <div className="mt-4 flex justify-end gap-2">
                <button 
                  onClick={() => setSaleModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button 
                  disabled={simulationQuantity > totalStock || simulationQuantity <= 0}
                  onClick={handleSale}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Complete Sale
                </button>
              </div>
            )}
            
            {simulationQuantity > totalStock && (
              <div className="text-amber-600 dark:text-amber-400 text-sm mb-4">
                ⚠️ Warning: Not enough inventory. Only {totalStock} units available.
              </div>
            )}
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Following FIFO inventory method, this sale would use {batchesForSale.length} batch(es).</p>
            </div>
          </div>
          
          {/* Batches Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inventory Batches</h2>
              <button
                onClick={() => setShowAddBatchForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
              >
                <Plus size={16} />
                Add Batch
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Batch ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Purchase Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Purchase Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Potential Profit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedBatches.map((batch) => {
                    const potentialProfit = product ? 
                      calculateBatchProfit(batch, product.sellingPrice, batch.currentQuantity) : 
                      { profit: 0, profitMargin: 0 };
                    
                    return (
                      <tr key={batch.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {batch.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {formatDate(batch.purchaseDate)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          ${batch.purchasePrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {batch.currentQuantity} / {batch.initialQuantity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {batch.supplier || '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            ${potentialProfit.profit.toFixed(2)}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 ml-1">
                            ({potentialProfit.profitMargin.toFixed(1)}%)
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <button 
                            onClick={() => handleDeleteBatch(batch.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  
                  {sortedBatches.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                        No inventory batches found. Add a batch to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Batch Form Modal */}
      {showAddBatchForm && (
        <AddBatchForm
          productId={id as string}
          onSubmit={handleAddBatch}
          onCancel={() => setShowAddBatchForm(false)}
        />
      )}
    </>
  );
} 