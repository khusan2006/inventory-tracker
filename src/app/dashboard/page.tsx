import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingCart, TrendingUp, List } from 'lucide-react'; // Simplified icons

export default async function DashboardHomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.companyId) {
    // This should ideally be caught by middleware,
    // but good to have a fallback or for direct page access scenarios.
    redirect('/auth/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Welcome back, {session.user.name || session.user.email}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your company's inventory and sales activity.
        </p>
      </div>

      {/* Stat Cards Section - Removed */}
      
      {/* Other Dashboard Widgets - Removed */}
      
      {/* Quick Links or Further Actions could go here */}
      <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <LinkButton href="/dashboard/products/new" icon={<Package className="mr-2" />} text="Add New Product" />
          <LinkButton href="/dashboard/sales" icon={<ShoppingCart className="mr-2" />} text="View Sales History" />
          <LinkButton href="/dashboard/categories" icon={<List className="mr-2" />} text="Manage Categories" />
          <LinkButton href="/dashboard/reports/monthly" icon={<TrendingUp className="mr-2" />} text="Monthly Reports" />
        </div>
      </div>
    </div>
  );
}

// Helper component for quick links (optional, can be inlined or moved)
interface LinkButtonProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

// Refactored LinkButton to use Next.js Link component
function LinkButton({ href, icon, text }: LinkButtonProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <a className="flex items-center justify-center w-full p-4 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
        {icon}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{text}</span>
      </a>
    </Link>
  );
} 