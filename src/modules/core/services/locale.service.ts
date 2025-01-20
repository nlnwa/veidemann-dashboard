import { Injectable } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeNbExtra from '@angular/common/locales/extra/nb';
import localeNb from '@angular/common/locales/nb';
registerLocaleData(localeNb, 'nb', localeNbExtra);
import('dayjs/locale/nb')
const defaultLocale = 'en-US';
const supportedLocales: string[] = ['nb-NO'];
@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  getLocale(): string {
    const browserLocale = navigator.language || defaultLocale;
    return supportedLocales.includes(browserLocale) ? browserLocale : defaultLocale;
  }
}
