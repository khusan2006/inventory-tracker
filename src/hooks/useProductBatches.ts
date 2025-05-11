import { useQuery } from '@tanstack/react-query';
import { BatchQuantity, batchKeys } from './useBatches';

// Function to fetch batch quantities for a specific product
const fetchProductBatches = async (productId: string): Promise<BatchQuantity[]> => {
  const response = await fetch(`/api/batches/quantities?productId=${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product batches');
  }
  return response.json();
};

// Hook for fetching batches for a specific product with caching
export function useProductBatches(productId: string) {
  return useQuery({
    queryKey: batchKeys.list(productId),
    queryFn: () => fetchProductBatches(productId),
    enabled: !!productId, // Only run the query if a productId is provided
  });
} 