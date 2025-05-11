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
  Trash2,
  MinusCircle,
  X
} from 'lucide-react';
import { Batch, calculateBatchProfit, getBatchesForSale } from '@/types/inventory';
import AddBatchForm from '@/components/inventory/AddBatchForm';
import { useProduct } from '@/hooks/useProducts';
import { useProductBatches } from '@/hooks/useProductBatches';
import { useQueryClient } from '@tanstack/react-query';
import { batchKeys } from '@/hooks/useBatches';
import { productKeys } from '@/hooks/useProducts';
import { useTranslation } from '@/hooks/useTranslation';

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

// Helper type for batches with sale quantities
interface BatchWithSale {
  batch: Batch;
  quantityToUse: number;
}

// Helper function to get batches for sale using FIFO
function getBatchesForSaleFIFO(batches: Batch[], quantity: number): BatchWithSale[] {
  const selectedBatches: BatchWithSale[] = [];
  let remainingQuantity = quantity;
  
  for (const batch of batches) {
    if (remainingQuantity <= 0) break;
    
    if (batch.currentQuantity > 0) {
      const quantityToUse = Math.min(batch.currentQuantity, remainingQuantity);
      selectedBatches.push({
        batch,
        quantityToUse
      });
      remainingQuantity -= quantityToUse;
    }
  }
  
  return selectedBatches;
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function ProductDetailPage() {
  const { t } = useTranslation();
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
  const error = productError || batchesError ? t('common.failedToLoadData') : null;

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
  const batchesForSale = getBatchesForSaleFIFO(
    sortedBatches.filter(batch => batch.status === 'active' && batch.currentQuantity > 0),
    simulationQuantity
  );
  
  // Calculate simulation profit
  let simulationProfit = { profit: 0, profitMargin: 0 };
  
  if (product && batchesForSale.length > 0) {
    let costBasis = 0;
    let usedQuantity = 0;
    
    batchesForSale.forEach(batchInfo => {
      costBasis += batchInfo.batch.purchasePrice * batchInfo.quantityToUse;
      usedQuantity += batchInfo.quantityToUse;
    });
    
    const revenue = product.sellingPrice * Math.min(usedQuantity, simulationQuantity);
    const profit = revenue - costBasis;
    
    simulationProfit = {
      profit,
      profitMargin: (profit / revenue) * 100
    };
  }

  // Handle delete batch
  const queryClient = useQueryClient();
  
  const handleDeleteBatch = async (batchId: string) => {
    if (!window.confirm(t('batches.confirmDeleteBatch'))) {
      return;
    }
    
    try {
      const response = await fetch(`/api/batches/${batchId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete batch');
      }
      
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: batchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: batchKeys.list(id as string) });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id as string) });
      
    } catch (err) {
      console.error('Error deleting batch:', err);
      alert(t('batches.failedToDeleteBatch'));
    }
  };
  
  const handleSale = async () => {
    if (!product) return;
    
    if (simulationQuantity <= 0) {
      alert(t('sales.enterValidQuantity'));
      return;
    }
    
    if (totalStock < simulationQuantity) {
      alert(t('sales.notEnoughStock', { available: totalStock }));
      return;
    }
    
    try {
      // Gather batch information
      const saleData = {
        productId: product.id,
        quantity: simulationQuantity,
        unitPrice: product.sellingPrice,
        batches: batchesForSale.map(b => ({
          batchId: b.batch.id,
          quantityUsed: b.quantityToUse
        })),
        date: new Date().toISOString(),
        customer: "Walk-in Customer",  // Default customer
        paymentMethod: "cash",
        notes: "Quick sale"
      };
      
      // Make API call to create the sale
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create sale');
      }
      
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: batchKeys.lists() });
      queryClient.invalidateQueries({ queryKey: batchKeys.list(id as string) });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id as string) });
      
      // Refresh batches
      refetchBatches();
      
      // Reset simulation quantity
      setSimulationQuantity(1);
      
      // Show success message
      alert(t('sales.saleRecordedSuccess'));
      
    } catch (err) {
      console.error('Error recording sale:', err);
      alert(t('sales.failedToRecordSale'));
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
          <span>{t('common.back')}</span>
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold mb-4">{t('inventory.productNotFound')}</h1>
        <button 
          onClick={() => router.back()} 
          className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          <span>{t('common.back')}</span>
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
              {t('common.back')}
            </button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t('inventory.sku')}: {product.sku} | {t('inventory.category')}: {typeof product.category === 'object' && product.category !== null && 'name' in product.category 
                  ? product.category.name 
                  : product.category}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => setShowAddBatchForm(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  {t('batches.addNewBatch')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Product details and inventory overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('inventory.productDetails')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('common.description')}</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.description || t('inventory.noDescriptionAvailable')}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('inventory.currentSellingPrice')}</p>
                    <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(product.sellingPrice)}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('inventory.fitment')}</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.fitment || t('inventory.universal')}</p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('inventory.storageLocation')}</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.location || t('inventory.notSpecified')}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('inventory.minStockLevel')}</p>
                    <p className="text-gray-800 dark:text-gray-200">{product.minStockLevel || t('inventory.notSet')}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('inventory.totalAvailableStock')}</p>
                    <p className={`text-xl font-semibold ${totalStock < (product.minStockLevel || 0) ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {totalStock} {t('inventory.units')}
                    </p>
                    
                    {totalStock < (product.minStockLevel || 0) && (
                      <div className="flex items-center mt-1 text-sm text-red-600 dark:text-red-400">
                        <AlertTriangle size={14} className="mr-1" />
                        {t('inventory.belowMinimumStockLevel')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('sales.quickSell')}</h2>
                <button 
                  onClick={() => router.push(`/admin/products/${id}/record-sale`)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('sales.advancedSaleOptions')}
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('sales.quantity')}
                  </label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setSimulationQuantity(Math.max(1, simulationQuantity - 1))}
                      className="p-2 rounded-l-md bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                      disabled={simulationQuantity <= 1}
                    >
                      <MinusCircle size={16} />
                    </button>
                    <input 
                      type="number" 
                      min="1"
                      value={simulationQuantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1) {
                          setSimulationQuantity(val);
                        }
                      }}
                      className="w-16 text-center py-2 border-y border-gray-300 dark:border-slate-600 dark:bg-slate-800 text-gray-900 dark:text-white"
                    />
                    <button 
                      onClick={() => setSimulationQuantity(simulationQuantity + 1)}
                      className="p-2 rounded-r-md bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                      disabled={simulationQuantity >= totalStock}
                    >
                      <Plus size={16} />
                    </button>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      / {totalStock} {t('inventory.available')}
                    </span>
                  </div>
                </div>
                
                <div className="my-4 h-px bg-gray-200 dark:bg-slate-700"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                  <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('sales.revenue')}</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ${(product.sellingPrice * Math.min(simulationQuantity, totalStock)).toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('sales.profit')}</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${simulationProfit.profit.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('sales.profitMargin')}</div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {simulationProfit.profitMargin.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleSale}
                  disabled={simulationQuantity <= 0 || simulationQuantity > totalStock}
                  className={`w-full mt-4 py-2 px-4 rounded-md flex items-center justify-center gap-2 
                    ${simulationQuantity <= 0 || simulationQuantity > totalStock
                      ? 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white'}`}
                >
                  <ShoppingCart size={18} />
                  {t('sales.sellNow')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('batches.inventoryBatches')}</h2>
              <button
                onClick={() => setShowAddBatchForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
              >
                <Plus size={16} />
                {t('batches.addBatch')}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.batchId')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.purchaseDate')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.purchasePrice')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.quantity')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.supplier')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.potentialProfit')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('common.actions')}
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
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="text-green-600 dark:text-green-400">
                            ${potentialProfit.profit.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {potentialProfit.profitMargin.toFixed(1)}% {t('common.margin')}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <button
                            onClick={() => handleDeleteBatch(batch.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                            title={t('batches.deleteBatch')}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  
                  {sortedBatches.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                        <Package className="mx-auto mb-2" size={24} />
                        <p>{t('batches.noBatchesFound')}</p>
                        <button
                          onClick={() => setShowAddBatchForm(true)}
                          className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {t('batches.addFirstBatch')}
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add batch form modal */}
      {showAddBatchForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('batches.addNewBatch')}
              </h2>
              <button 
                onClick={() => setShowAddBatchForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <AddBatchForm 
                productId={id as string} 
                onSubmit={(newBatch) => {
                  setShowAddBatchForm(false);
                  refetchBatches();
                }}
                onCancel={() => setShowAddBatchForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 