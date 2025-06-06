import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { 
  Refund, 
  CreateRefundInput, 
  RefundSummary, 
  RefundFilters 
} from '@/types/refund';

interface RefundsResponse {
  refunds: Refund[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Hook to fetch refunds with pagination and filtering
export function useRefunds(
  page: number = 1,
  limit: number = 50,
  filters?: RefundFilters
) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters?.startDate && { startDate: filters.startDate }),
    ...(filters?.endDate && { endDate: filters.endDate }),
    ...(filters?.refundType && { refundType: filters.refundType }),
    ...(filters?.reason && { reason: filters.reason }),
    ...(filters?.itemCondition && { itemCondition: filters.itemCondition }),
    ...(filters?.productId && { productId: filters.productId }),
    ...(filters?.processedBy && { processedBy: filters.processedBy })
  });

  return useQuery({
    queryKey: ['refunds', page, limit, filters],
    queryFn: async (): Promise<RefundsResponse> => {
      const response = await fetch(`/api/refunds?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch refunds');
      }
      return response.json();
    }
  });
}

// Hook to fetch a single refund
export function useRefund(id: string) {
  return useQuery({
    queryKey: ['refund', id],
    queryFn: async (): Promise<Refund> => {
      const response = await fetch(`/api/refunds/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch refund');
      }
      return response.json();
    },
    enabled: !!id
  });
}

// Hook to fetch refund summary
export function useRefundSummary(filters?: { startDate?: string; endDate?: string }) {
  const queryParams = new URLSearchParams({
    ...(filters?.startDate && { startDate: filters.startDate }),
    ...(filters?.endDate && { endDate: filters.endDate })
  });

  return useQuery({
    queryKey: ['refund-summary', filters],
    queryFn: async (): Promise<RefundSummary> => {
      const response = await fetch(`/api/refunds/summary?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch refund summary');
      }
      return response.json();
    }
  });
}

// Hook to create a new refund
export function useCreateRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRefundInput): Promise<Refund> => {
      const response = await fetch('/api/refunds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create refund');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['refunds'] });
      queryClient.invalidateQueries({ queryKey: ['refund-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['batches'] });
      
      toast.success(`Refund ${data.refundNumber} created successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

// Hook to update a refund
export function useUpdateRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: string; 
      data: Partial<Pick<Refund, 'customReason' | 'itemCondition'>> 
    }): Promise<Refund> => {
      const response = await fetch(`/api/refunds/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update refund');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Update the specific refund in cache
      queryClient.setQueryData(['refund', data.id], data);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['refunds'] });
      queryClient.invalidateQueries({ queryKey: ['refund-summary'] });
      
      toast.success('Refund updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

// Hook to delete a refund
export function useDeleteRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/refunds/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete refund');
      }
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['refunds'] });
      queryClient.invalidateQueries({ queryKey: ['refund-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['batches'] });
      
      toast.success('Refund deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
} 