"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/admin/Header';
import { Calendar, DollarSign, Package, ChevronLeft, Tag, Truck, FileText, AlertCircle } from 'lucide-react';

interface BatchDetails {
  id: string;
  productId: string;
  productName: string;
  purchaseDate: string;
  purchasePrice: number;
  initialQuantity: number;
  currentQuantity: number;
  status: string;
  supplier: string | null;
  invoiceNumber: string | null;
  category: string | null;
}

interface Sale {
  id: string;
  productId: string;
  productName: string;
  batchId: string;
  quantity: number;
  salePrice: number;
  purchasePrice: number;
  profit: number;
  profitMargin: number;
  saleDate: string;
}

export default function BatchDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.id as string;
  
  const [batch, setBatch] = useState<BatchDetails | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        // Fetch the batch details
        const batchResponse = await fetch(`/api/batches/${batchId}`);
        
        if (!batchResponse.ok) {
          throw new Error('Failed to fetch batch details');
        }
        
        const batchData = await batchResponse.json();
        setBatch(batchData);
        
        // Fetch sales related to this batch
        const salesResponse = await fetch(`/api/sales?batchId=${batchId}`);
        
        if (!salesResponse.ok) {
          throw new Error('Failed to fetch sales data');
        }
        
        const salesData = await salesResponse.json();
        setSales(salesData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load batch details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (batchId) {
      fetchBatchDetails();
    }
  }, [batchId]);
  
  // Calculate total sales, revenue, profit for this batch
  const totalQuantitySold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0);
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0);
  
  // Calculate utilization percentage
  const utilizationPercentage = batch ? (totalQuantitySold / batch.initialQuantity) * 100 : 0;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900 p-6">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-400">Loading batch details...</p>
          </div>
        </main>
      </>
    );
  }
  
  if (error || !batch) {
    return (
      <>
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900 p-6">
          <div className="flex justify-center items-center h-full flex-col">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {error || 'Batch not found'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The requested batch details could not be loaded
            </p>
            <Link 
              href="/admin/batches"
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ChevronLeft size={18} className="mr-2" />
              Back to Batches
            </Link>
          </div>
        </main>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Link 
              href="/admin/batches"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mr-4"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Batches
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Batch Details
            </h1>
          </div>
          
          {/* Batch Info Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {batch.productName}
                </h2>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                  <Tag size={16} className="mr-2" />
                  <span>{batch.category || 'Uncategorized'}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                  <Calendar size={16} className="mr-2" />
                  <span>Purchased on {formatDate(batch.purchaseDate)}</span>
                </div>
                {batch.supplier && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                    <Truck size={16} className="mr-2" />
                    <span>Supplier: {batch.supplier}</span>
                  </div>
                )}
                {batch.invoiceNumber && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <FileText size={16} className="mr-2" />
                    <span>Invoice: {batch.invoiceNumber}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 md:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                  ${batch.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                >
                  {batch.status === 'active' ? 'Active' : 'Depleted'}
                </span>
              </div>
            </div>
            
            {/* Batch Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Initial Quantity</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{batch.initialQuantity}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Quantity</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{batch.currentQuantity}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Units Sold</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{totalQuantitySold}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Utilization</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {utilizationPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Purchase Price</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(batch.purchasePrice)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Total: {formatCurrency(batch.purchasePrice * batch.initialQuantity)}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Profit</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalProfit)}
                </p>
                {batch.initialQuantity > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ROI: {((totalProfit / (batch.purchasePrice * batch.initialQuantity)) * 100).toFixed(1)}%
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Sales History */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales History</h3>
            </div>
            
            {sales.length === 0 ? (
              <div className="p-6 text-center">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No sales recorded for this batch yet
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Sale Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Margin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                    {sales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(sale.saleDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {sale.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatCurrency(sale.salePrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatCurrency(sale.salePrice * sale.quantity)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                          {formatCurrency(sale.profit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {sale.profitMargin.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 