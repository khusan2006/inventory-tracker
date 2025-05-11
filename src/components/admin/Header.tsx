"use client";

import { Bell, Search, Car, Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Close sidebar when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // If sidebar is open, prevent body scrolling
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <>
      <header className="h-16 flex justify-between items-center px-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center">
          <button 
            className="mr-2 md:mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          {/* Hide car icon and title on mobile */}
          <Car className="hidden md:block text-blue-600 dark:text-blue-400 mr-2" size={24} />
          <h1 className="hidden md:block text-xl font-semibold text-gray-900 dark:text-gray-100">Auto Parts Manager</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search parts..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 
                       text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" size={18} />
          </div>
          
          <ThemeToggle />
          
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white">
              A
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:inline">Admin</span>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <div className="h-full w-64 bg-white dark:bg-slate-800 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center">
                <Car className="text-blue-600 dark:text-blue-400 mr-2" size={24} />
                <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Auto Parts Manager</h2>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <Sidebar isMobile={true} />
          </div>
        </div>
      )}
    </>
  );
} 