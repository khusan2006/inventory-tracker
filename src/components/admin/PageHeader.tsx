import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export default function PageHeader({ title, description, icon, actions }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center">
        {icon && (
          <div className="mr-3 text-blue-600 dark:text-blue-400 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex space-x-2">{actions}</div>}
    </div>
  );
} 