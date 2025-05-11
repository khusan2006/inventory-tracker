"use client";

import { useTranslation as useI18nTranslation } from 'react-i18next';

// Custom hook that combines the functionality but doesn't depend on LanguageProvider
export function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  // We'll try to get language info from i18n directly
  const language = i18n.language as 'en' | 'ru' | 'uz';
  const changeLanguage = (newLanguage: 'en' | 'ru' | 'uz') => {
    i18n.changeLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  return {
    t,
    i18n,
    language,
    changeLanguage,
  };
} 