export interface ProductMonthlyData {
  id: string;
  name: string;
  category: string;
  totalSold: number;
  totalRevenue: number;
  totalCOGS: number;
  profitMargin: number;
  productId: string;
  productName: string;
  startingInventory: number;
  purchases: number;
  sales: number;
  endingInventory: number;
  costOfGoodsSold: number;
  revenue: number;
  profit: number;
}

export interface MonthlyReportData {
  year: number;
  month: number;
  isRolledOver: boolean;
  summary: {
    totalRevenue: number;
    totalCostOfGoodsSold: number;
  };
  productsData: ProductMonthlyData[];
}

export async function fetchMonthlyReportData(year: number, month: number): Promise<MonthlyReportData> {
  const response = await fetch(`/api/reports/monthly?year=${year}&month=${month}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch monthly report: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Transform the API response to match the expected interface
  return {
    year: data.year,
    month: data.month,
    isRolledOver: data.isFinalized,
    summary: {
      totalRevenue: data.totalSales,
      totalCostOfGoodsSold: data.totalSales - data.totalProfit,
    },
    productsData: data.reportData?.productsData || [],
  };
}

export async function initiateMonthlyRollover(year: number, month: number): Promise<void> {
  const response = await fetch(`/api/reports/monthly/rollover`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ year, month }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to initiate rollover: ${response.statusText}`);
  }
  
  // No need to process response data for this operation
} 