'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity as ActivityIcon,
  ShoppingBag, 
  PackagePlus, 
  ArchiveRestore, 
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ru, uz } from 'date-fns/locale';
import { useTranslation } from '@/hooks/useTranslation';

interface ActivityItemDto {
  id: string;
  type: 'sale' | 'new_product' | 'new_stock';
  timestamp: string; // ISO string from server
  description: string;
  productName?: string;
  quantity?: number;
  value?: number;
  details?: Record<string, any>; 
}

interface ActivityItem extends Omit<ActivityItemDto, 'timestamp'> {
  timestamp: Date;
}

const ActivityTypeIcon = ({ type }: { type: ActivityItem['type'] }) => {
  switch (type) {
    case 'sale':
      return <ShoppingBag size={18} className="text-green-500" />;
    case 'new_product':
      return <PackagePlus size={18} className="text-blue-500" />;
    case 'new_stock':
      return <ArchiveRestore size={18} className="text-indigo-500" />;
    default:
      return <ActivityIcon size={18} className="text-gray-500" />;
  }
};

const RecentActivityFeed = () => {
  const { t, i18n } = useTranslation();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard/recent-activity');
        if (!response.ok) {
          throw new Error(`Failed to fetch recent activity: ${response.statusText}`);
        }
        const data: ActivityItemDto[] = await response.json();
        // Convert timestamp string to Date object
        const formattedData: ActivityItem[] = data.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })); 
        setActivities(formattedData);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching recent activity data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.recentActivity')}</h3>
        <ul className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <li key={i} className="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-md animate-pulse">
              <div className="w-5 h-5 bg-gray-300 dark:bg-slate-600 rounded-full mr-3"></div>
              <div className="flex-grow space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-3/4"></div>
                <div className="h-2 bg-gray-300 dark:bg-slate-600 rounded w-1/2"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.recentActivity')}</h3>
        <div className="flex flex-col items-center justify-center h-40 bg-gray-50 dark:bg-slate-700/50 rounded-md p-4">
          <AlertCircle size={32} className="text-red-500 mb-2" />
          <p className="text-sm text-red-500">{t('dashboard.errorLoadingActivity')}{error}</p>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
       <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.recentActivity')}</h3>
        <div className="flex flex-col items-center justify-center h-40 bg-gray-50 dark:bg-slate-700/50 rounded-md p-4">
          <ActivityIcon size={32} className="text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard.noRecentActivity')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{t('dashboard.recentActivity')}</h3>
      <ul className="space-y-1">
        {activities.map((activity) => {
          let locale;
          switch (i18n.language) {
            case 'ru':
              locale = ru;
              break;
            case 'uz':
              locale = uz;
              break;
            default:
              locale = enUS;
          }
          return (
            <li 
              key={activity.id} 
              className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-md transition-colors duration-150 ease-in-out"
            >
              <div className="mt-1 mr-3 flex-shrink-0">
                   <ActivityTypeIcon type={activity.type} />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {(() => {
                    switch (activity.type) {
                      case 'sale':
                        return t('dashboard.activity.soldItem', { 
                          quantity: activity.quantity || 0, 
                          itemName: activity.productName || 'N/A' 
                        });
                      case 'new_product':
                        return t('dashboard.activity.newProduct', { 
                          itemName: activity.productName || 'N/A' 
                        });
                      case 'new_stock':
                        return t('dashboard.activity.addedStock', { 
                          quantity: activity.quantity || 0, 
                          itemName: activity.productName || 'N/A' 
                        });
                      // Add more cases here for other activity types if they are introduced
                      default:
                        // Use the generic key if description is somehow still present, or a default
                        return activity.description ? t('dashboard.activity.generic', { message: activity.description }) : t('dashboard.activity.generic', {message: 'Unhandled activity type'});
                    }
                  })()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale })}
                </p>
              </div>
              {/* Future: Link to product/sale page based on activity.details */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivityFeed; 