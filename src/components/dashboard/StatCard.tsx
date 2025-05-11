import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  color: 'blue' | 'green' | 'purple' | 'amber' | 'rose';
  subtitle?: string;
}

const colorVariants = {
  blue: {
    light: 'bg-blue-50 text-blue-600',
    dark: 'dark:bg-blue-900/30 dark:text-blue-400',
    border: 'border-blue-100 dark:border-blue-900/50',
    ring: 'from-blue-400/20 to-transparent',
    trendPositive: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  },
  green: {
    light: 'bg-emerald-50 text-emerald-600',
    dark: 'dark:bg-emerald-900/30 dark:text-emerald-400',
    border: 'border-emerald-100 dark:border-emerald-900/50',
    ring: 'from-emerald-400/20 to-transparent',
    trendPositive: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  },
  purple: {
    light: 'bg-purple-50 text-purple-600',
    dark: 'dark:bg-purple-900/30 dark:text-purple-400',
    border: 'border-purple-100 dark:border-purple-900/50',
    ring: 'from-purple-400/20 to-transparent',
    trendPositive: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  },
  amber: {
    light: 'bg-amber-50 text-amber-600',
    dark: 'dark:bg-amber-900/30 dark:text-amber-400',
    border: 'border-amber-100 dark:border-amber-900/50',
    ring: 'from-amber-400/20 to-transparent',
    trendPositive: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  },
  rose: {
    light: 'bg-rose-50 text-rose-600',
    dark: 'dark:bg-rose-900/30 dark:text-rose-400',
    border: 'border-rose-100 dark:border-rose-900/50',
    ring: 'from-rose-400/20 to-transparent',
    trendPositive: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20',
    trendNegative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  },
};

export function StatCard({ title, value, icon, trend, color, subtitle }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl shadow-sm border ${colorVariants[color].border} p-6`}>
      {/* Decorative ring background */}
      <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-radial ${colorVariants[color].ring} opacity-40 rounded-full`} />
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold mt-1 text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorVariants[color].light} ${colorVariants[color].dark} z-10`}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center mt-4">
          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            trend.positive 
              ? colorVariants[color].trendPositive
              : colorVariants[color].trendNegative
          }`}>
            {trend.positive ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
            {trend.value}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last period</span>
        </div>
      )}
    </div>
  );
} 