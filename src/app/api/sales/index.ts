export interface Sale {
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
  category: string | null;
  customerId?: string;
  invoiceNumber?: string;
  companyId: string;
  customerName?: string;
  products: { productName: string; quantity: number }[];
  status?: string;
  totalAmount?: number;
}

export async function fetchSalesData(params: Record<string, string> = {}): Promise<Sale[]> {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(`/api/sales?${searchParams}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch sales data: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Transform API response to match component expectations
  return data.map((sale: any) => ({
    ...sale,
    // Ensure profit and profitMargin are never undefined
    profit: sale.profit ?? 0,
    profitMargin: sale.profitMargin ?? 0,
    // Add properties expected by component
    customerName: sale.customerId ? `Customer ${sale.customerId}` : undefined,
    products: [{
      productName: sale.productName,
      quantity: sale.quantity
    }],
    status: 'Completed', // Default status since API doesn't provide this
    totalAmount: sale.salePrice * sale.quantity
  }));
}

export async function deleteSale(saleId: string): Promise<void> {
  const response = await fetch(`/api/sales/${saleId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete sale: ${response.statusText}`);
  }
} 