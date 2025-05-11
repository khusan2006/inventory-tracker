"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index';
import { loadTranslations } from './loadTranslations';

type Language = 'en' | 'ru' | 'uz';

type LanguageContextType = {
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load translations first
    loadTranslations();
    
    setMounted(true);
    
    // Get saved language from localStorage or use browser language if available
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'ru', 'uz'].includes(savedLanguage)) {
      setLanguage(savedLanguage as Language);
      i18n.changeLanguage(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = ['en', 'ru', 'uz'].includes(browserLang) ? browserLang : 'en';
      setLanguage(supportedLang as Language);
      i18n.changeLanguage(supportedLang);
    }
  }, [i18n]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // To avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
} 