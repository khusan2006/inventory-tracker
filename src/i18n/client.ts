"use client";

import { useTranslation as useI18nTranslation } from 'react-i18next';
import i18n from './index';
import englishTranslation from './translations/en';
import russianTranslation from './translations/ru';
import uzbekTranslation from './translations/uz';

// Set interpolation options if needed
if (i18n.options && i18n.options.interpolation) {
  i18n.options.interpolation.prefix = '{{';
  i18n.options.interpolation.suffix = '}}';
}

// Ensure translations are loaded
if (!i18n.hasResourceBundle('en', 'translation')) {
  i18n.addResourceBundle('en', 'translation', englishTranslation);
}
if (!i18n.hasResourceBundle('ru', 'translation')) {
  i18n.addResourceBundle('ru', 'translation', russianTranslation);
}
if (!i18n.hasResourceBundle('uz', 'translation')) {
  i18n.addResourceBundle('uz', 'translation', uzbekTranslation);
}

export function useTranslation() {
  return useI18nTranslation();
} 