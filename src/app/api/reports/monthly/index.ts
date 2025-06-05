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
  const response = await fetch(`/api/reports/monthly?year=${year}&month=${month}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch monthly report: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.hasData || !data.report) {
    throw new Error('No data available for this period');
  }

  const report = data.report;
  
  // Handle both finalized reports (with reportData) and live reports
  const reportData = report.reportData || report;
  
  // Transform the products data from the report
  const productsData: ProductMonthlyData[] = reportData.products?.map((product: any) => ({
    id: product.productId || product.id,
    name: product.productName || product.name,
    category: product.category,
    totalSold: product.soldQuantity || 0,
    totalRevenue: product.revenue || 0,
    totalCOGS: product.cost || 0,
    profitMargin: product.profitMargin || 0,
    productId: product.productId || product.id,
    productName: product.productName || product.name,
    startingInventory: product.startingQuantity || 0,
    purchases: product.purchasedQuantity || 0,
    sales: product.soldQuantity || 0,
    endingInventory: product.endingQuantity || 0,
    costOfGoodsSold: product.cost || 0,
    revenue: product.revenue || 0,
    profit: product.profit || 0,
  })) || [];

  return {
    year: report.year,
    month: report.month,
    isRolledOver: report.isFinalized || false,
    summary: {
      totalRevenue: reportData.totalRevenue || report.totalSales || 0,
      totalCostOfGoodsSold: reportData.totalCost || (reportData.totalRevenue - reportData.totalProfit) || 0,
    },
    productsData,
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