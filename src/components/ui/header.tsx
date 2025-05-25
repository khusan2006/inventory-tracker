'use client'; // Make it a client component

import React, { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';

interface HeaderProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export default function Header({ title, description, icon, actions }: HeaderProps) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className="flex items-center justify-between mb-6 py-4 border-b">
      {(title || icon) ? (
        <div className="flex items-center">
          {icon && (
            <div className="mr-3 text-primary p-1.5 bg-primary/10 rounded-lg">
              {icon}
            </div>
          )}
          {title && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div />
      )}

      <div className="flex items-center space-x-3">
        {actions && <div className="flex space-x-2">{actions}</div>}
        
        <LanguageSelector />
        <ThemeToggle />

        {isLoading && (
            <p className="text-sm text-gray-500">Loading...</p>
        )}

        {session?.user && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {session.user.name || session.user.email}</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            >
              Sign Out
            </Button>
          </div>
        )}

        {!session && !isLoading && (
          <Link href="/auth/signin" passHref>
            <Button variant="default" size="sm">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
} 