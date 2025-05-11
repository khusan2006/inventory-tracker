'use client';

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

interface QueryClientProviderProps {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: QueryClientProviderProps) {
  // Create a client for each user session rather than on every render
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Specify default caching behavior for all queries
        staleTime: 1000 * 60 * 5, // 5 minutes - data becomes stale after 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes - unused queries are garbage collected after 30 minutes (replaces cacheTime)
        refetchOnWindowFocus: false, // Don't refetch when window regains focus (better for admin apps)
        retry: 1, // Only retry failed queries once
      },
    },
  }));

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
} 