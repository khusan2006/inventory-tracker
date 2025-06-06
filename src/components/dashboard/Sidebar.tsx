"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Settings, 
  Calendar,
  FileText,
  ChevronDown,
  LogOut,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  setMobileSidebarOpen?: (open: boolean) => void;
}

export default function Sidebar({ className = "", isOpen, setMobileSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menuItems = [
    { 
      name: t('admin.dashboard'), 
      href: '/dashboard',
      icon: <Home size={20} />
    },
    { 
      name: t('admin.inventory'), 
      href: '/dashboard/products',
      icon: <Package size={20} />
    },
    { 
      name: t('admin.categories'), 
      href: '/dashboard/categories',
      icon: <FileText size={20} />
    },
    { 
      name: t('admin.salesHistory'), 
      href: '/dashboard/sales',
      icon: <ShoppingCart size={20} />
    },
    { 
      name: t('admin.debtsManagement'), 
      href: '/dashboard/debts',
      icon: <CreditCard size={20} />
    },
    { 
      name: 'Refund Management', 
      href: '/dashboard/refunds',
      icon: <FileText size={20} />
    },
    { 
      name: t('admin.batchHistory'), 
      href: '/dashboard/batches',
      icon: <FileText size={20} />
    },
    { 
      name: t('admin.suppliers'), 
      href: '/dashboard/suppliers',
      icon: <FileText size={20} />
    },
    { 
      name: t('admin.reports'), 
      href: '/dashboard/analytics',
      icon: <FileText size={20} />
    },
    { 
      name: t('admin.monthRollover'), 
      href: '/dashboard/rollover',
      icon: <FileText size={20} />,
      subItems: [
        {
          name: t('admin.monthlyReports'), 
          href: '/dashboard/rollover/monthly',
          icon: <Calendar size={18} />
        }
      ]
    },
    { 
      name: t('admin.settings'), 
      href: '/dashboard/settings',
      icon: <Settings size={20} />
    },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  const isMobile = typeof isOpen !== 'undefined';

  const sidebarContent = (
    <div className={`h-full w-full bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col ${className}`}>
      <div className="h-16 flex items-center p-4 border-b border-gray-200 dark:border-slate-700">
        <Home className="text-blue-600 dark:text-blue-400 mr-2" size={24} />
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{t('home.title')}</h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 hide-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard' 
              : pathname.startsWith(item.href);
            const hasActiveSubItem = item.subItems?.some(subItem => pathname === subItem.href);
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => {
                    if (isMobile && setMobileSidebarOpen) {
                      setMobileSidebarOpen(false);
                    }
                  }}
                  className={`flex items-center px-4 py-2 text-sm transition-colors ${
                    isActive || hasActiveSubItem
                      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 dark:bg-slate-700 dark:text-blue-400 dark:border-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className={`mr-3 ${isActive || hasActiveSubItem ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.name}</span>
                  {item.subItems && (
                    <span className="ml-auto">
                      {hasActiveSubItem || (isActive && item.subItems) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  )}
                </Link>
                {item.subItems && (hasActiveSubItem || (isActive && item.subItems)) && (
                  <ul className="mt-1 ml-9 space-y-1">
                    {item.subItems.map(subItem => {
                      const isSubActive = pathname === subItem.href;
                      
                      return (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            onClick={() => {
                              if (isMobile && setMobileSidebarOpen) {
                                setMobileSidebarOpen(false);
                              }
                            }}
                            className={`flex items-center px-4 py-2 text-sm transition-colors rounded-md ${
                              isSubActive
                                ? 'bg-blue-100 text-blue-600 dark:bg-slate-600 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                            }`}
                          >
                            {subItem.icon && (
                              <span className="mr-2">{subItem.icon}</span>
                            )}
                            {subItem.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-800 mt-auto">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('common.logout')}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <React.Fragment>
        {isOpen && setMobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        <div 
          className={`fixed inset-y-0 left-0 z-40 transform transition-transform ease-in-out duration-300 md:hidden 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            ${className || ''}`
          }
        >
          {sidebarContent}
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={className}>
      {sidebarContent}
    </div>
  );
} 