"use client";

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, changeLanguage, t } = useTranslation();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectLanguage = (lang: 'en' | 'ru' | 'uz') => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        aria-label={t('common.language')}
        title={t('common.language')}
      >
        <Globe size={20} className="text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
          <button
            onClick={() => selectLanguage('en')}
            className={`block px-4 py-2 text-sm text-left w-full ${
              language === 'en'
                ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            {t('common.english')}
          </button>
          <button
            onClick={() => selectLanguage('ru')}
            className={`block px-4 py-2 text-sm text-left w-full ${
              language === 'ru'
                ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            {t('common.russian')}
          </button>
          <button
            onClick={() => selectLanguage('uz')}
            className={`block px-4 py-2 text-sm text-left w-full ${
              language === 'uz'
                ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            {t('common.uzbek')}
          </button>
        </div>
      )}
    </div>
  );
} 