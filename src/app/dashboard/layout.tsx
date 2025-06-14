'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/ui/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed inset-0 flex z-40 pointer-events-none">
        <Sidebar 
          isOpen={mobileSidebarOpen} 
          setMobileSidebarOpen={setMobileSidebarOpen} 
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header 
          wrapperClassName="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 md:px-6"
          toggleMobileSidebar={toggleMobileSidebar} 
        />
        <main className="flex-1 overflow-y-auto py-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 