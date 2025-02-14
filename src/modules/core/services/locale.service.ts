import { Injectable } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeNbExtra from '@angular/common/locales/extra/nb';
import localeNb from '@angular/common/locales/nb';

registerLocaleData(localeNb, 'nb', localeNbExtra);

import('dayjs/locale/nb')
const defaultLocale = 'en';
const supportedLocales: string[] = ['nb', 'en'];

function normalizeLocale(browserLocale: string) {
  if (!browserLocale) return defaultLocale;

  // Convert to lowercase and ensure proper format
  const normalized = browserLocale.toLowerCase().replace('_', '-');

  // Check for direct match
  if (supportedLocales.includes(normalized)) {
    return normalized;
  }

  // Extract language code (e.g., "nb" from "nb-NO")
  const primaryLang = normalized.split('-')[0];

  if (supportedLocales.includes(primaryLang)) {
    return primaryLang;
  }

  // Fallback to English if nothing matches
  return 'en';
}

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  getLocale(): string {
    return normalizeLocale(navigator.language);
  }
}
