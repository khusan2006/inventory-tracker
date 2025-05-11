import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useProducts, Product } from './useProducts';
import { useBatchSummaries, BatchSummary } from './useBatches';
import { useEffect } from 'react';

export interface ProductWithStats extends Product {
  batchCount: number;
  soldQuantity: number;
  avgPurchasePrice: number;
  monthlyQuantity?: number;
  profitMargin?: number;
}

// Function to combine product and batch data
const combineData = (
  products: Product[], 
  batchSummaries: BatchSummary[]
): ProductWithStats[] => {
  return products.map(product => {
    // Find batch summary for this product
    const summary = batchSummaries.find(s => s.productId === product.id);
    
    if (!summary) {
      // No batches for this product
      return {
        ...product,
        batchCount: 0,
        soldQuantity: 0,
        avgPurchasePrice: 0,
        monthlyQuantity: 0,
      };
    }
    
    // Calculate sold quantity (difference between initial and current)
    const soldQuantity = summary.totalInitialQuantity - summary.totalQuantity;
    
    return {
      ...product,
      batchCount: summary.batchCount,
      soldQuantity,
      avgPurchasePrice: 0, // Will be populated with more detailed fetch if needed
      monthlyQuantity: 0, // Will be populated with more detailed fetch if needed
    };
  });
};

// Hook to get combined product and batch data with caching
export function useInventory() {
  // Get cached products data
  const productsQuery = useProducts();
  
  // Get cached batch summaries
  const batchSummariesQuery = useBatchSummaries();
  
  // Get the query client
  const queryClient = useQueryClient();
  
  // Combine the data with a derived query
  const query = useQuery({
    queryKey: ['inventory'],
    queryFn: () => {
      if (!productsQuery.data || !batchSummariesQuery.data) {
        return [];
      }
      
      return combineData(productsQuery.data, batchSummariesQuery.data);
    },
    // This query depends on the results of the other queries
    enabled: !!productsQuery.data && !!batchSummariesQuery.data,
    // Use a shorter staleTime to refresh more frequently
    staleTime: 1000 * 30, // 30 seconds
    // Add refetchOnWindowFocus to refresh data when the user returns to the tab
    refetchOnWindowFocus: true,
    // Add a retry mechanism for failed requests
    retry: 3
  });
  
  // Set up a useEffect to update the query data when dependencies change
  useEffect(() => {
    if (productsQuery.data && batchSummariesQuery.data) {
      const combinedData = combineData(productsQuery.data, batchSummariesQuery.data);
      queryClient.setQueryData(['inventory'], combinedData);
    }
  }, [productsQuery.data, batchSummariesQuery.data, queryClient]);
  
  return query;
} 