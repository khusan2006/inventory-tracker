import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Car
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    positive: boolean;
  };
  color: 'blue' | 'green' | 'purple' | 'amber';
}

const colorVariants = {
  blue: {
    light: 'bg-blue-50 text-blue-600',
    dark: 'bg-blue-900/30 text-blue-400',
  },
  green: {
    light: 'bg-green-50 text-green-600',
    dark: 'bg-green-900/30 text-green-400',
  },
  purple: {
    light: 'bg-purple-50 text-purple-600',
    dark: 'bg-purple-900/30 text-purple-400',
  },
  amber: {
    light: 'bg-amber-50 text-amber-600',
    dark: 'bg-amber-900/30 text-amber-400',
  },
};

export function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
          <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorVariants[color].light} dark:${colorVariants[color].dark}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className={`flex items-center ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trend.positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="text-sm font-medium ml-1">{trend.value}</span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  );
}

export function RecentActivityCard() {
  const activities = [
    { id: 1, action: 'New order #ORD-7824', time: '2 minutes ago' },
    { id: 2, action: 'Product restocked: Brake Pads', time: '1 hour ago' },
    { id: 3, action: 'Low inventory alert: Oil Filters', time: '3 hours ago' },
    { id: 4, action: 'New vendor added: Auto Parts Direct', time: '5 hours ago' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex justify-between pb-3 border-b border-gray-100 dark:border-slate-700">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{activity.action}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InventorySummaryCard() {
  const categories = [
    { name: 'Brakes', count: 87, color: 'bg-blue-500 dark:bg-blue-600' },
    { name: 'Engine', count: 64, color: 'bg-green-500 dark:bg-green-600' },
    { name: 'Electrical', count: 45, color: 'bg-purple-500 dark:bg-purple-600' },
    { name: 'Suspension', count: 28, color: 'bg-amber-500 dark:bg-amber-600' },
    { name: 'Filters', count: 53, color: 'bg-red-500 dark:bg-red-600' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory by Category</h3>
      <div className="mt-4 space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{category.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{category.count} parts</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
              <div 
                className={`${category.color} h-2 rounded-full`} 
                style={{ width: `${(category.count / 100) * 100}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 