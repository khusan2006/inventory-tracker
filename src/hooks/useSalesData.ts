import { useQuery } from '@tanstack/react-query';

export interface SaleData {
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
}

export interface MonthlySalesData {
  month: string;
  total: number;
}

// Format currency for display
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Get total sales from the last 30 days
export function useRecentSalesData() {
  return useQuery({
    queryKey: ['recentSales'],
    queryFn: async () => {
      // Calculate dates
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      
      // Format dates for URL
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      const response = await fetch(`/api/sales?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recent sales data');
      }
      
      const data: SaleData[] = await response.json();
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Get monthly sales data for the current year for charts
export function useMonthlySalesData() {
  return useQuery({
    queryKey: ['monthlySalesChart'],
    queryFn: async () => {
      const currentYear = new Date().getFullYear();
      
      // Prepare array for all months (even those with no sales)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let monthlyData: MonthlySalesData[] = monthNames.map((month, index) => ({
        month,
        total: 0
      }));
      
      // For each month of the current year, fetch the report
      const currentMonth = new Date().getMonth();
      
      // Only fetch data for months that have passed
      for (let i = 0; i <= currentMonth; i++) {
        try {
          const response = await fetch(`/api/reports/monthly?year=${currentYear}&month=${i + 1}`);
          
          if (response.ok) {
            const reportData = await response.json();
            
            if (reportData && reportData.totalSales) {
              monthlyData[i].total = reportData.totalSales;
            }
          }
        } catch (error) {
          console.error(`Error fetching data for month ${i + 1}:`, error);
        }
      }
      
      return monthlyData;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

// Get top selling products
export function useTopSellingProducts() {
  return useQuery({
    queryKey: ['topSellingProducts'],
    queryFn: async () => {
      // Get data from last 90 days
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 90);
      
      // Format dates for URL
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      const response = await fetch(`/api/sales?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sales data');
      }
      
      const data: SaleData[] = await response.json();
      
      // Group sales by product and calculate total quantities and revenue
      const productMap = new Map<string, {
        id: string;
        name: string;
        category: string | null;
        totalQuantity: number;
        totalRevenue: number;
      }>();
      
      data.forEach(sale => {
        const existing = productMap.get(sale.productId);
        
        if (existing) {
          existing.totalQuantity += sale.quantity;
          existing.totalRevenue += sale.quantity * sale.salePrice;
        } else {
          productMap.set(sale.productId, {
            id: sale.productId,
            name: sale.productName,
            category: sale.category,
            totalQuantity: sale.quantity,
            totalRevenue: sale.quantity * sale.salePrice
          });
        }
      });
      
      // Convert to array and sort by quantity
      const topProducts = Array.from(productMap.values())
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, 5); // Top 5 products
      
      return topProducts;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

// Get recent sales activity for the dashboard
export function useRecentActivity() {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: async () => {
      // Get the most recent 10 sales
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 14); // Two weeks for recent activity
      
      // Format dates for URL
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      
      const response = await fetch(`/api/sales?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recent activity');
      }
      
      const data: SaleData[] = await response.json();
      
      // Get only the most recent sales
      const recentSales = data
        .sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime())
        .slice(0, 10);
      
      return recentSales.map(sale => ({
        id: sale.id,
        productName: sale.productName,
        quantity: sale.quantity,
        salePrice: sale.salePrice,
        revenue: sale.quantity * sale.salePrice,
        saleDate: new Date(sale.saleDate),
        timeAgo: getTimeAgo(new Date(sale.saleDate))
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Helper function to calculate relative time
function getTimeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (diffSec < 60) {
    return `${diffSec} seconds ago`;
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
  } else if (diffDay < 30) {
    return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString();
  }
} 