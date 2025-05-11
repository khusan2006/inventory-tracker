import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Product {
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

// Cache keys for React Query
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: any) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Function to fetch all products
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

// Function to fetch a specific product
const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`/api/products?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

// Hook for fetching all products with caching
export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: fetchProducts,
  });
}

// Hook for fetching a specific product with caching
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Only run the query if an ID is provided
  });
}

// Function to update a product
const updateProduct = async (productData: Partial<Product> & { id: string }): Promise<Product> => {
  const response = await fetch('/api/products', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  
  return response.json();
};

// Hook for updating a product
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      // Update the cache when a product is updated
      queryClient.invalidateQueries({ queryKey: productKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
} 