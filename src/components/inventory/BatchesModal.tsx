"use client";

import { useState } from 'react';
import { X, Calendar, DollarSign, Package, Plus, Truck, FilePlus, RefreshCw } from 'lucide-react';
import { Batch } from '@/types/inventory';
import { useProductBatches } from '@/hooks/useProductBatches';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { batchKeys } from '@/hooks/useBatches';
import { productKeys } from '@/hooks/useProducts';
import { useTranslation } from '@/i18n/client';

interface BatchesModalProps {
  productId: string;
  productName: string;
  onClose: () => void;
}

interface BatchFormData {
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  supplier: string;
  invoiceNumber: string;
  notes: string;
}

export default function BatchesModal({ productId, productName, onClose }: BatchesModalProps) {
  const { t } = useTranslation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BatchFormData>({
    quantity: 1,
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    supplier: '',
    invoiceNumber: '',
    notes: ''
  });
  
  // Get the query client
  const queryClient = useQueryClient();
  
  // Use React Query hook to fetch batches
  const { 
    data: batches = [], 
    isLoading, 
    error 
  } = useProductBatches(productId);
  
  // Mutation for adding a new batch
  const addBatchMutation = useMutation({
    mutationFn: async (newBatch: Partial<Batch>) => {
      // Add batch to API
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
      
      const createdBatch = await response.json();
      
      // Update product stock in API
      await fetch('/api/products', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          totalStock: newBatch.initialQuantity // This will be added to the existing stock in the backend
        }),
      });
      
      return createdBatch;
    },
    onMutate: async (newBatch) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: batchKeys.list(productId) });
      await queryClient.cancelQueries({ queryKey: productKeys.detail(productId) });
      
      // Get current data from cache
      const previousBatches = queryClient.getQueryData<Batch[]>(batchKeys.list(productId)) || [];
      const previousProduct = queryClient.getQueryData<{
        id: string;
        totalStock: number;
        [key: string]: any;
      }>(productKeys.detail(productId));
      
      // Create optimistic batch with temporary ID
      const optimisticBatch: Batch = {
        id: `temp-${Date.now()}`, // Temporary ID that will be replaced by server-generated ID
        productId: newBatch.productId || '',
        purchaseDate: newBatch.purchaseDate || new Date().toISOString(),
        purchasePrice: newBatch.purchasePrice || 0,
        initialQuantity: newBatch.initialQuantity || 0,
        currentQuantity: newBatch.initialQuantity || 0,
        status: 'active',
        supplier: newBatch.supplier,
        invoiceNumber: newBatch.invoiceNumber,
        notes: newBatch.notes
      };
      
      // Update product stock optimistically
      if (previousProduct) {
        const updatedProduct = {
          ...previousProduct,
          totalStock: (previousProduct.totalStock || 0) + (newBatch.initialQuantity || 0)
        };
        queryClient.setQueryData(productKeys.detail(productId), updatedProduct);
      }
      
      // Add new batch to the cached data
      queryClient.setQueryData(batchKeys.list(productId), [...previousBatches, optimisticBatch]);
      
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
      
      setFormError(error instanceof Error ? error.message : 'Failed to add batch');
    },
    onSuccess: (newBatch) => {
      // Update cache with the actual server data (replacing the optimistic entry)
      const currentBatches = queryClient.getQueryData<Batch[]>(batchKeys.list(productId)) || [];
      const updatedBatches = currentBatches
        .filter(batch => !batch.id.toString().startsWith('temp-')) // Remove the optimistic entry
        .concat(newBatch); // Add the actual server-returned batch
      
      queryClient.setQueryData(batchKeys.list(productId), updatedBatches);
      
      // Invalidate all affected queries
      queryClient.invalidateQueries({ queryKey: batchKeys.summaries() });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      
      // Force refetch to update UI immediately
      queryClient.refetchQueries({ queryKey: ['inventory'] });
      
      // Reset form and hide
      setFormData({
        quantity: 1,
        purchasePrice: 0,
        purchaseDate: new Date().toISOString().split('T')[0],
        supplier: '',
        invoiceNumber: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      const initialQuantity = parseInt(formData.quantity.toString());
      const purchasePrice = parseFloat(formData.purchasePrice.toString());
      
      if (isNaN(initialQuantity) || initialQuantity <= 0) {
        throw new Error('Quantity must be a positive number');
      }
      
      if (isNaN(purchasePrice) || purchasePrice <= 0) {
        throw new Error('Purchase price must be a positive number');
      }
      
      const newBatch: Partial<Batch> = {
        productId,
        purchaseDate: formData.purchaseDate,
        purchasePrice,
        initialQuantity,
        currentQuantity: initialQuantity,
        status: 'active',
        supplier: formData.supplier || undefined,
        invoiceNumber: formData.invoiceNumber || undefined,
        notes: formData.notes || undefined
      };
      
      // Use the mutation to add the batch
      addBatchMutation.mutate(newBatch);
      
    } catch (err) {
      console.error('Error adding batch:', err);
      setFormError(err instanceof Error ? err.message : 'Failed to add batch');
    }
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the actual overlay, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('batches.batchesFor', { product: productName })}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={t('common.close')}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {!showAddForm && (
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('batches.manageInventoryBatches')}
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md transition-colors text-sm"
              >
                <Plus size={16} className="mr-1" />
                {t('batches.addNewBatch')}
              </button>
            </div>
          )}
          
          {showAddForm && (
            <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-blue-900 dark:text-blue-300 flex items-center">
                  <FilePlus size={18} className="mr-2" />
                  {t('batches.addNewBatch')}
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label={t('common.close')}
                >
                  <X size={18} />
                </button>
              </div>
              
              {formError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-800">
                  {formError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.quantity')} *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.purchasePrice')} *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        name="purchasePrice"
                        value={formData.purchasePrice}
                        onChange={handleInputChange}
                        min="0.01"
                        step="0.01"
                        required
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.purchaseDate')} *
                    </label>
                    <input
                      type="date"
                      name="purchaseDate"
                      value={formData.purchaseDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.supplier')}
                    </label>
                    <input
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.invoiceNumber')}
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.notes')}
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 rounded-md"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={addBatchMutation.isPending}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {addBatchMutation.isPending ? (
                      <>
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        {t('common.loading')}
                      </>
                    ) : (
                      <>
                        <Plus size={16} className="mr-2" />
                        {t('batches.addBatch')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">{t('batches.loading')}</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-red-600 dark:text-red-400">{error.message || t('common.failedToLoadData')}</p>
            </div>
          ) : batches.length === 0 ? (
            <div className="py-16 text-center">
              <Package size={40} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">{t('batches.noResults')}</p>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  <Plus size={16} className="mr-2" />
                  {t('batches.addBatch')}
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.batchId')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.purchaseDate')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.purchaseAmount')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.initial')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.current')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.sold')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('common.status')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('batches.supplier')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {batches
                    .sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime())
                    .map((batch) => {
                      const soldQuantity = batch.initialQuantity - batch.currentQuantity;
                      
                      return (
                        <tr key={batch.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {batch.id}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1 text-gray-400 dark:text-gray-500" />
                              {formatDate(batch.purchaseDate)}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <div className="flex items-center">
                              <DollarSign size={14} className="mr-1 text-gray-400 dark:text-gray-500" />
                              ${batch.purchasePrice.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {batch.initialQuantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {batch.currentQuantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {soldQuantity > 0 ? (
                              <span className="text-amber-600 dark:text-amber-400 font-medium">
                                {soldQuantity}
                              </span>
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400">0</span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              batch.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : batch.status === 'depleted'
                                ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            }`}>
                              {batch.status === 'active' ? t('common.active') : 
                               batch.status === 'depleted' ? t('common.depleted') : 
                               batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {batch.supplier || '-'}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 rounded-md"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
} 