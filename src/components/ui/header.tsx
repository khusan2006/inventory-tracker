import React, { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export default function Header({ title, description, icon, actions }: HeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center">
        {icon && (
          <div className="mr-3 text-primary p-1.5 bg-primary/10 rounded-lg">
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