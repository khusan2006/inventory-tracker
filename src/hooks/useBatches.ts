import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BatchStatus } from '@/types/inventory';

export interface BatchQuantity {
  id: string;
  productId: string;
  currentQuantity: number;
  initialQuantity: number;
  purchasePrice: number;
  purchaseDate: string;
  status: BatchStatus;
  supplier?: string;
  invoiceNumber?: string;
  notes?: string;
}

export interface BatchSummary {
  productId: string;
  batchCount: number;
  totalQuantity: number;
  totalInitialQuantity: number;
}

// Cache keys for React Query
export const batchKeys = {
  all: ['batches'] as const,
  summaries: () => [...batchKeys.all, 'summaries'] as const,
  lists: () => [...batchKeys.all, 'list'] as const,
  list: (productId: string) => [...batchKeys.lists(), productId] as const,
};

// Function to fetch batch quantities summaries for all products
const fetchBatchSummaries = async (): Promise<BatchSummary[]> => {
  const response = await fetch('/api/batches/quantities');
  if (!response.ok) {
    throw new Error('Failed to fetch batch summaries');
  }
  return response.json();
};

// Hook for fetching batch summaries for all products with caching
export function useBatchSummaries() {
  return useQuery({
    queryKey: batchKeys.summaries(),
    queryFn: fetchBatchSummaries,
  });
}

// Function to update a batch
const updateBatch = async (batchData: Partial<BatchQuantity> & { id: string }): Promise<BatchQuantity> => {
  const response = await fetch('/api/batches', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(batchData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update batch');
  }
  
  return response.json();
};

// Hook for updating a batch
export function useUpdateBatch() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateBatch,
    onSuccess: (data) => {
      // Update the cache when a batch is updated
      queryClient.invalidateQueries({ queryKey: batchKeys.list(data.productId) });
      queryClient.invalidateQueries({ queryKey: batchKeys.summaries() });
    },
  });
} 