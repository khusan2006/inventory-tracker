'use client'; // Make it a client component

import React, { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import Link from 'next/link';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import { Menu } from "lucide-react"; // Import Menu icon

export interface HeaderProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  wrapperClassName?: string;
  toggleMobileSidebar?: () => void; // Add prop type
}

export default function Header({
  title,
  description,
  icon,
  actions,
  wrapperClassName,
  toggleMobileSidebar,
}: HeaderProps) {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header className={`flex items-center justify-between ${wrapperClassName ? wrapperClassName : 'py-4 border-b'}`}>
      <div className="flex items-center">
        {/* Hamburger Menu for Mobile */}
        {toggleMobileSidebar && (
          <Button 
            variant="outline"
            size="icon" 
            className="md:hidden mr-3 ml-1"
            onClick={toggleMobileSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {/* Original icon prop handling - if you decide to use it alongside title */}
        {icon && !title && (
           <div className="mr-3 text-primary p-1.5 bg-primary/10 rounded-lg md:hidden">
             {icon}
           </div>
        )}
        {icon && title && (
          <div className="mr-3 text-primary p-1.5 bg-primary/10 rounded-lg hidden md:block">
            {icon}
          </div>
        )}
        {title && (
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-semibold text-foreground">{title}</h1>
            {description && (
              <p className="text-xs md:text-sm text-muted-foreground hidden md:block">{description}</p>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 md:space-x-3">
        {actions && <div className="flex space-x-2">{actions}</div>}
        
        <LanguageSelector />
        <ThemeToggle />

        {isLoading && (
            <div className="w-20 h-8 bg-gray-200 dark:bg-slate-700 rounded animate-pulse md:w-24"></div>
        )}

        {session?.user && !isLoading && (
          <div className="flex items-center space-x-2 md:space-x-3">
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
          <Link href="/auth/signin" passHref legacyBehavior={false}>
            <Button variant="default" size="sm">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
} 