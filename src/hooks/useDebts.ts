import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import type { Debt, CreateDebtInput, DebtSummary } from '@/types/debt';

interface DebtsResponse {
  debts: Debt[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  summary: DebtSummary;
}

export const debtKeys = {
  all: ['debts'] as const,
  lists: () => [...debtKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...debtKeys.lists(), filters] as const,
  details: () => [...debtKeys.all, 'detail'] as const,
  detail: (id: string) => [...debtKeys.details(), id] as const,
};

// Hook to fetch debts
export function useDebts(
  page: number = 1, 
  limit: number = 50, 
  status?: 'pending' | 'paid'
) {
  return useQuery({
    queryKey: debtKeys.list({ page, limit, status }),
    queryFn: async (): Promise<DebtsResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (status) {
        params.append('status', status);
      }

      const response = await fetch(`/api/debts?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch debts');
      }
      return response.json();
    }
  });
}

// Hook to create a new debt
export function useCreateDebt() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data: CreateDebtInput) => {
      const response = await fetch('/api/debts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('debt.failedToRecordDebt'));
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch debt queries
      queryClient.invalidateQueries({ queryKey: debtKeys.all });
      // Also invalidate inventory queries since stock has changed
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['batches'] });
      
      const customerName = variables.customerName;
      if (customerName) {
        toast.success(t('debt.debtCreatedForCustomer', { customer: customerName }));
      } else {
        toast.success(t('debt.debtCreatedAnonymously'));
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Hook to update debt status
export function useUpdateDebt() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      paidDate 
    }: { 
      id: string; 
      status: 'paid' | 'pending'; 
      paidDate?: string 
    }) => {
      const response = await fetch(`/api/debts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, paidDate }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('debt.failedToUpdateDebt'));
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: debtKeys.all });
      toast.success(t('debt.debtStatusUpdated'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Hook to delete a debt
export function useDeleteDebt() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/debts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('debt.failedToDeleteDebt'));
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: debtKeys.all });
      toast.success(t('debt.debtDeleted'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
} 