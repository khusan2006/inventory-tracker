"use client";

import i18n from './index';
import enTranslation from './translations/en';
import ruTranslation from './translations/ru';
import uzTranslation from './translations/uz';

export function loadTranslations() {
  // Add resources to i18n after it's initialized
  i18n.addResourceBundle('en', 'translation', enTranslation, true, true);
  i18n.addResourceBundle('ru', 'translation', ruTranslation, true, true);
  i18n.addResourceBundle('uz', 'translation', uzTranslation, true, true);
} 