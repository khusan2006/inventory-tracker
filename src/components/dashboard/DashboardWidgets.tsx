import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Car
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  color: 'blue' | 'green' | 'purple' | 'amber' | 'indigo';
  unit?: string;
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
  indigo: {
    light: 'bg-indigo-50 text-indigo-600',
    dark: 'bg-indigo-900/30 text-indigo-400',
  },
};

export function StatCard({ title, value, icon, trend, color, unit }: StatCardProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
          <p className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
            {value} {unit && <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{unit}</span>}
          </p>
        </div>
        <div className={`p-3 rounded-full ${colorVariants[color].light} dark:${colorVariants[color].dark}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4">
          <div className={`flex items-center ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend.positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="text-sm font-medium ml-1">{trend.value}</span>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{t('dashboard.vsLastMonth')}</span>
        </div>
      )}
    </div>
  );
}

export function RecentActivityCard() {
  const { t } = useTranslation();
  const activities = [
    { id: 1, action: t('dashboard.mock.newOrder', {orderId: 'ORD-7824'}), time: t('dashboard.mock.timeAgo', {value: 2, unit: 'minutes'}) },
    { id: 2, action: t('dashboard.mock.productRestocked', {productName: 'Brake Pads'}), time: t('dashboard.mock.timeAgo', {value: 1, unit: 'hour'}) },
    { id: 3, action: t('dashboard.mock.lowInventoryAlert', {productName: 'Oil Filters'}), time: t('dashboard.mock.timeAgo', {value: 3, unit: 'hours'}) },
    { id: 4, action: t('dashboard.mock.newVendorAdded', {vendorName: 'Auto Parts Direct'}), time: t('dashboard.mock.timeAgo', {value: 5, unit: 'hours'}) },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.recentActivity')}</h3>
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
  const { t } = useTranslation();
  const categories = [
    { name: t('dashboard.mock.categoryBrakes'), count: 87, color: 'bg-blue-500 dark:bg-blue-600' },
    { name: t('dashboard.mock.categoryEngine'), count: 64, color: 'bg-green-500 dark:bg-green-600' },
    { name: t('dashboard.mock.categoryElectrical'), count: 45, color: 'bg-purple-500 dark:bg-purple-600' },
    { name: t('dashboard.mock.categorySuspension'), count: 28, color: 'bg-amber-500 dark:bg-amber-600' },
    { name: t('dashboard.mock.categoryFilters'), count: 53, color: 'bg-red-500 dark:bg-red-600' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.inventoryByCategory')}</h3>
      <div className="mt-4 space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{category.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('common.parts', { count: category.count })}</span>
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