"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/admin/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import TopSellingProducts from '@/components/dashboard/TopSellingProducts';
import RecentActivity from '@/components/dashboard/RecentActivity';
import InventorySummary from '@/components/dashboard/InventorySummary';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  DollarSign,
  BarChart3,
  Percent,
  Clock,
} from 'lucide-react';
import { useRecentSalesData, formatCurrency } from '@/hooks/useSalesData';
import { useInventory } from '@/hooks/useInventory';

export default function DashboardPage() {
  const { data: inventory = [], isLoading: inventoryLoading } = useInventory();
  const { data: recentSales = [], isLoading: salesLoading } = useRecentSalesData();
  
  // Calculate dashboard metrics
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    totalStock: 0,
    avgProfitMargin: 0,
    monthlyOrders: 0,
    lowStockItems: 0
  });
  
  useEffect(() => {
    if (salesLoading || inventoryLoading) return;
    
    // Calculate revenue from recent sales (last 30 days)
    const totalRevenue = recentSales.reduce((total, sale) => total + (sale.quantity * sale.salePrice), 0);
    
    // Calculate average profit margin
    const totalProfit = recentSales.reduce((total, sale) => total + sale.profit, 0);
    const totalCost = recentSales.reduce((total, sale) => total + (sale.quantity * sale.purchasePrice), 0);
    const avgProfitMargin = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
    
    // Count products and total stock
    const totalProducts = inventory.length;
    const totalStock = inventory.reduce((total, product) => total + product.totalStock, 0);
    
    // Count low stock items
    const lowStockItems = inventory.filter(
      product => product.totalStock > 0 && product.totalStock <= (product.minStockLevel || 5)
    ).length;
    
    // Count monthly orders (unique sales)
    const uniqueSalesCount = new Set(recentSales.map(sale => sale.id)).size;
    
    setMetrics({
      totalRevenue,
      totalProducts,
      totalStock,
      avgProfitMargin,
      monthlyOrders: uniqueSalesCount,
      lowStockItems
    });
  }, [recentSales, inventory, salesLoading, inventoryLoading]);
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 overflow-y-auto pb-10">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Overview of your auto parts inventory and sales
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Total Revenue" 
              value={formatCurrency(metrics.totalRevenue)} 
              icon={<DollarSign size={22} />} 
              trend={{ value: "12%", positive: true }}
              color="blue"
              subtitle="Last 30 days"
            />
            <StatCard 
              title="Orders" 
              value={metrics.monthlyOrders.toString()} 
              icon={<ShoppingBag size={22} />} 
              trend={{ value: "8%", positive: true }}
              color="green"
              subtitle="Last 30 days"
            />
            <StatCard 
              title="Products In Stock" 
              value={metrics.totalStock.toString()} 
              icon={<Package size={22} />} 
              trend={{ value: "4%", positive: true }}
              color="purple"
              subtitle={`Across ${metrics.totalProducts} products`}
            />
            <StatCard 
              title="Profit Margin" 
              value={`${metrics.avgProfitMargin.toFixed(1)}%`} 
              icon={<Percent size={22} />} 
              trend={{ value: "2.5%", positive: true }}
              color="amber"
              subtitle="Average on all sales"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <div className="lg:col-span-1">
              <TopSellingProducts />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InventorySummary />
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  );
} 