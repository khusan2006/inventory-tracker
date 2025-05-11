"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  TruckIcon,
  BarChart3,
  LogOut,
  ChevronDown,
  ChevronRight,
  Calendar,
  Tag,
  Layers,
  RefreshCw,
  PieChart
} from 'lucide-react';

export default function Sidebar({ className = "", isMobile = false }: { className?: string, isMobile?: boolean }) {
  const pathname = usePathname();

  const menuItems = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: <LayoutDashboard size={20} />
    },
    { 
      name: 'Inventory', 
      href: '/admin/products', 
      icon: <Package size={20} />
    },
    { 
      name: 'Categories', 
      href: '/admin/categories', 
      icon: <Tag size={20} />
    },
    { 
      name: 'Sales History', 
      href: '/admin/sales', 
      icon: <ShoppingCart size={20} />
    },
    { 
      name: 'Batch History', 
      href: '/admin/batches', 
      icon: <Layers size={20} />
    },
    { 
      name: 'Suppliers', 
      href: '/admin/suppliers', 
      icon: <TruckIcon size={20} />
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: <PieChart size={20} />
    },
    { 
      name: 'Month Rollover', 
      href: '/admin/rollover',
      icon: <RefreshCw size={20} />,
      subItems: [
        {
          name: 'Monthly Reports', 
          href: '/admin/rollover/monthly',
          icon: <Calendar size={18} />
        }
      ]
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: <Settings size={20} />
    },
  ];

  return (
    <div className={`h-full w-full bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Auto Parts Manager</h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 hide-scrollbar">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const hasActiveSubItem = item.subItems?.some(subItem => pathname === subItem.href);
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
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
                      {hasActiveSubItem ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </Link>
                
                {/* Sub items */}
                {item.subItems && (hasActiveSubItem || isActive) && (
                  <ul className="mt-1 ml-9 space-y-1">
                    {item.subItems.map(subItem => {
                      const isSubActive = pathname === subItem.href;
                      
                      return (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
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
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-800 mt-auto">
        <a 
          href="/" 
          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </a>
      </div>
    </div>
  );
} 