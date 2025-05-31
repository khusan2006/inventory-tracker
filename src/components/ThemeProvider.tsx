"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light initially
  const [mounted, setMounted] = useState(false);

  // Function to actually apply the theme to the DOM
  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    setMounted(true); // Set mounted to true first

    // Determine initial theme
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set the initial theme state
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme); 
    // Apply it to the DOM after state is set
    applyTheme(initialTheme);
  }, []); // Empty dependency array, runs once on mount

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // If not mounted, return null to prevent children from rendering prematurely
  if (!mounted) {
    return null; 
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 