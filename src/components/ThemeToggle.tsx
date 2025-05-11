"use client";

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  
  // Safety mechanism to prevent error
  let theme: 'light' | 'dark' = 'light';
  let toggleTheme = () => {};
  
  try {
    // Attempt to use the ThemeProvider context
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    // If ThemeProvider context isn't available, use direct DOM manipulation
    const toggle = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setCurrentTheme('light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setCurrentTheme('dark');
      }
    };
    
    toggleTheme = toggle;
  }
  
  // Check if we're mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Set initial theme if we're not using the context
    try {
      useTheme();
    } catch (error) {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    }
  }, []);
  
  if (!mounted) {
    // Return a placeholder while we wait for client-side hydration
    return (
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Theme toggle"
      >
        <Moon size={20} className="text-slate-800" />
      </button>
    );
  }

  const displayTheme = currentTheme !== 'light' ? currentTheme : theme;
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={displayTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={displayTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {displayTheme === 'dark' ? (
        <Sun size={20} className="text-amber-300" />
      ) : (
        <Moon size={20} className="text-slate-800" />
      )}
    </button>
  );
} 