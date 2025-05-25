import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/ui/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Inventory Management',
  description: 'Manage your company inventory, sales, and reports.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 