export type BatchStatus = 'active' | 'depleted' | 'archived';

export interface Batch {
  id: string;
  productId: string;
  purchaseDate: string; // ISO date string
  purchasePrice: number; // Cost per unit
  initialQuantity: number;
  currentQuantity: number;
  status: BatchStatus;
  supplier?: string;
  invoiceNumber?: string;
  notes?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  description?: string;
  sellingPrice: number; // Current selling price regardless of batch
  totalStock: number; // Sum of all active batches
  fitment?: string;
  minStockLevel?: number;
  location?: string;
  imageUrl?: string;
}

export interface Sale {
  id: string;
  productId: string;
  batchId: string;
  quantity: number;
  salePrice: number; // Price per unit at time of sale
  purchasePrice: number; // Cost per unit from the batch
  profit: number; // Total profit for this sale item
  profitMargin: number; // Percentage
  saleDate: string; // ISO date string
  customerId?: string;
  invoiceNumber?: string;
}

export interface ProductWithBatches extends Product {
  batches: Batch[];
}

export interface MonthlyReport {
  month: number; // 0-11
  year: number;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  products: MonthlyProductReport[];
  totalStartingInventory: number;
  totalEndingInventory: number;
  totalPurchased: number;
  totalSold: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  totalSales: number; // Alias for totalRevenue to match DB schema
  averageProfitMargin: number; // Alias for avgProfitMargin to match DB schema
  avgProfitMargin: number;
}

export interface MonthlyProductReport {
  productId: string;
  productName: string;
  category: string;
  sku: string;
  startingQuantity: number;
  endingQuantity: number;
  purchasedQuantity: number;
  soldQuantity: number;
  revenue: number;
  cost: number;
  profit: number;
  profitMargin: number;
  batches: BatchSummary[];
}

export interface BatchSummary {
  batchId: string;
  purchaseDate: string;
  purchasePrice: number;
  initialQuantity: number;
  remainingQuantity: number;
  supplier?: string;
}

export const calculateBatchProfit = (
  batch: Batch, 
  salePrice: number, 
  quantity: number
): { profit: number; profitMargin: number } => {
  const totalCost = batch.purchasePrice * quantity;
  const totalRevenue = salePrice * quantity;
  const profit = totalRevenue - totalCost;
  const profitMargin = (profit / totalCost) * 100;
  
  return {
    profit,
    profitMargin
  };
};

// FIFO logic - get oldest batches first
export const getBatchesForSale = (batches: Batch[], quantity: number): Batch[] => {
  const activeBatches = [...batches]
    .filter(batch => batch.status === 'active' && batch.currentQuantity > 0)
    .sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());
  
  const batchesForSale: Batch[] = [];
  let remainingQuantity = quantity;
  
  for (const batch of activeBatches) {
    if (remainingQuantity <= 0) break;
    
    batchesForSale.push(batch);
    remainingQuantity -= batch.currentQuantity;
  }
  
  return batchesForSale;
};

// Get start and end date for a month
export const getMonthDateRange = (year: number, month: number): { startDate: string, endDate: string } => {
  // Month is 0-indexed (0 = January, 11 = December)
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0); // Last day of month
  
  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
};

// Check if a date is within a specific month
export const isDateInMonth = (dateString: string, year: number, month: number): boolean => {
  const date = new Date(dateString);
  return date.getFullYear() === year && date.getMonth() === month;
};

// Generate a monthly report
export const generateMonthlyReport = (
  products: Product[],
  batches: Batch[],
  sales: Sale[],
  year: number,
  month: number
): MonthlyReport => {
  const { startDate, endDate } = getMonthDateRange(year, month);
  
  // Filter for the specific month
  const monthSales = sales.filter(sale => isDateInMonth(sale.saleDate, year, month));
  const monthBatches = batches.filter(batch => isDateInMonth(batch.purchaseDate, year, month));
  
  // Product reports
  const productReports: MonthlyProductReport[] = [];
  let totalStartingInventory = 0;
  let totalEndingInventory = 0;
  let totalPurchased = 0;
  let totalSold = 0;
  let totalRevenue = 0;
  let totalCost = 0;
  
  for (const product of products) {
    // Get product batches
    const productBatches = batches.filter(batch => batch.productId === product.id);
    
    // Get product sales for the month
    const productSales = monthSales.filter(sale => sale.productId === product.id);
    
    // Calculate quantity purchased this month
    const purchasedQuantity = monthBatches
      .filter(batch => batch.productId === product.id)
      .reduce((sum, batch) => sum + batch.initialQuantity, 0);
    
    // Calculate quantity sold this month
    const soldQuantity = productSales.reduce((sum, sale) => sum + sale.quantity, 0);
    
    // Calculate revenue, cost, and profit
    const revenue = productSales.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0);
    const cost = productSales.reduce((sum, sale) => sum + (sale.purchasePrice * sale.quantity), 0);
    const profit = revenue - cost;
    const profitMargin = cost > 0 ? (profit / cost) * 100 : 0;
    
    // Calculate starting and ending inventory
    // For simplicity, approximating starting inventory as current total - purchased + sold
    const endingQuantity = product.totalStock;
    const startingQuantity = endingQuantity - purchasedQuantity + soldQuantity;
    
    // Batch summaries
    const batchSummaries: BatchSummary[] = productBatches
      .map(batch => ({
        batchId: batch.id,
        purchaseDate: batch.purchaseDate,
        purchasePrice: batch.purchasePrice,
        initialQuantity: batch.initialQuantity,
        remainingQuantity: batch.currentQuantity,
        supplier: batch.supplier
      }))
      .sort((a, b) => new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime());
    
    productReports.push({
      productId: product.id,
      productName: product.name,
      category: product.category,
      sku: product.sku,
      startingQuantity,
      endingQuantity,
      purchasedQuantity,
      soldQuantity,
      revenue,
      cost,
      profit,
      profitMargin,
      batches: batchSummaries
    });
    
    // Add to totals
    totalStartingInventory += startingQuantity;
    totalEndingInventory += endingQuantity;
    totalPurchased += purchasedQuantity;
    totalSold += soldQuantity;
    totalRevenue += revenue;
    totalCost += cost;
  }
  
  const totalProfit = totalRevenue - totalCost;
  const avgProfitMargin = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
  
  return {
    month,
    year,
    startDate,
    endDate,
    products: productReports,
    totalStartingInventory,
    totalEndingInventory,
    totalPurchased,
    totalSold,
    totalRevenue,
    totalCost,
    totalProfit,
    totalSales: totalRevenue,
    averageProfitMargin: avgProfitMargin,
    avgProfitMargin
  };
}; 