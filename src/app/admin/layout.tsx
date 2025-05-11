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
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <div className="hidden md:block w-64 h-full flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
} 