"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, DollarSign, Package, Plus, Truck, FilePlus, RefreshCw } from 'lucide-react';
import { Batch } from '@/types/inventory';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { batchKeys } from '@/hooks/useBatches';
import { productKeys } from '@/hooks/useProducts';
import { useProduct } from '@/hooks/useProducts';
import Header from '@/components/admin/Header';
import { useTranslation } from '@/hooks/useTranslation';

interface BatchFormData {
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  supplier: string;
  invoiceNumber: string;
  notes: string;
}

export default function AddBatchPage() {
  const { t } = useTranslation();
  // Use the useParams hook to get the id parameter from the URL
  const params = useParams();
  const productId = params.id as string;
  const router = useRouter();
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
  
  // Fetch product data using React Query
  const { 
    data: product, 
    isLoading: isLoadingProduct 
  } = useProduct(productId);
  
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
      const previousProduct = queryClient.getQueryData<{
        id: string;
        totalStock: number;
        [key: string]: any;
      }>(productKeys.detail(productId));
      
      // Update product stock optimistically
      if (previousProduct) {
        const updatedProduct = {
          ...previousProduct,
          totalStock: (previousProduct.totalStock || 0) + (newBatch.initialQuantity || 0)
        };
        queryClient.setQueryData(productKeys.detail(productId), updatedProduct);
      }
      
      return { previousProduct };
    },
    onError: (error, _, context) => {
      // Roll back to previous data on error
      if (context?.previousProduct) {
        queryClient.setQueryData(productKeys.detail(productId), context.previousProduct);
      }
      
      setFormError(error instanceof Error ? error.message : 'Failed to add batch');
    },
    onSuccess: () => {
      // Invalidate all affected queries
      queryClient.invalidateQueries({ queryKey: batchKeys.summaries() });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      
      // Force refetch to update UI immediately
      queryClient.refetchQueries({ queryKey: ['inventory'] });
      
      // Go back to the product page
      router.back();
    }
  });
  
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
        throw new Error(t('batches.enterValidQuantity'));
      }
      
      if (isNaN(purchasePrice) || purchasePrice <= 0) {
        throw new Error(t('batches.enterValidPrice'));
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
      setFormError(err instanceof Error ? err.message : t('batches.failedToAddBatch'));
    }
  };
  
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
              {t('common.back')}
            </button>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('batches.addBatch')} {product ? `${t('common.for')} ${product.name}` : ''}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t('batches.addNewBatchDescription')}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              {formError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md">
                  <p className="flex items-center">
                    <span className="mr-2">⚠️</span>
                    {formError}
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.quantity')} <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package size={18} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('batches.purchasePrice')} <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={18} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="purchasePrice"
                        min="0.01"
                        step="0.01"
                        value={formData.purchasePrice}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('batches.purchaseDate')} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="purchaseDate"
                      value={formData.purchaseDate}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('batches.supplier')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Truck size={18} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('batches.invoiceNumber')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FilePlus size={18} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('batches.notes')}
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-md mr-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={addBatchMutation.isPending}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md transition-colors flex items-center"
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
        </div>
      </main>
    </>
  );
} 