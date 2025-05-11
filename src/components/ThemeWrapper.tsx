"use client";

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

export default function ThemeWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for dark mode preference or stored theme
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  if (!mounted) {
    // Return empty div until hydrated to prevent flicker
    return <div className="p-2"></div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <LanguageSelector />
      <ThemeToggle />
    </div>
  );
} 