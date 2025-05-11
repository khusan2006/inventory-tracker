import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Auto Parts Inventory System',
  description: 'Admin dashboard for auto parts inventory management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
      <div className="hidden md:block md:w-64 h-full flex-shrink-0 z-20">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {children}
      </div>
    </div>
  );
} 