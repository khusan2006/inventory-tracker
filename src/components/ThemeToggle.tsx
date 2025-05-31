"use client";

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  
  // Directly use the theme and toggleTheme from context
  // The ThemeProvider will handle the initial theme loading and DOM manipulation
  const { theme, toggleTheme } = useTheme(); 
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Return a placeholder or null to avoid hydration mismatch until theme is known
    // Matching the ThemeProvider's strategy of not rendering actual UI until mounted might be good
    return (
      <button 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t('common.darkMode')} // Default or loading label
      >
        <Moon size={20} className="text-slate-800" /> 
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
      title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-amber-300" />
      ) : (
        <Moon size={20} className="text-slate-800" />
      )}
    </button>
  );
} 