import {inject, Injectable, InjectionToken} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';

import dayjs from 'dayjs';
import arraySupport from 'dayjs/plugin/arraySupport';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

// https://day.js.org/docs/en/parse/utc
dayjs.extend(utc);
// https://day.js.org/docs/en/display/format#localized-formats
dayjs.extend(localizedFormat);
// https://day.js.org/docs/en/parse/string-format
dayjs.extend(customParseFormat);
// https://day.js.org/docs/en/plugin/locale-data
dayjs.extend(localeData);
// https://day.js.org/docs/en/plugin/array-support
dayjs.extend(arraySupport);

declare const ngDevMode: object | null;

export interface DayJsDateAdapterOptions {
  /**
   * When enabled, the dates have to match the format exactly.
   * See https://day.js.org/docs/en/parse/string-format
   */
  strict?: boolean;

  /**
   * Turns the use of utc dates on or off.
   * Changing this will change how Angular Material DatePicker outputs dates.
   * {@default false}
   */
  useUtc?: boolean;
}

export function MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY(): DayJsDateAdapterOptions {
  return {
    useUtc: false
  };
}

/** InjectionToken for dayjs.Dayjs date adapter to configure options. */
export const MAT_DAYJS_DATE_ADAPTER_OPTIONS =
  new InjectionToken<DayJsDateAdapterOptions>(
    'MAT_DAYJS_DATE_ADAPTER_OPTIONS',
    {
      providedIn: 'root',
      factory: MAT_DAYJS_DATE_ADAPTER_OPTIONS_FACTORY
    }
  );

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

export type DateStyles = 'long' | 'short' | 'narrow';

/** Adapts dayjs.Dayjs Dates for use with Angular Material. */
@Injectable()
export class DayjsDateAdapter extends DateAdapter<dayjs.Dayjs> {
  private _options = inject<DayJsDateAdapterOptions>(MAT_DAYJS_DATE_ADAPTER_OPTIONS, {
    optional: true,
  });

  private _localeData: {
    firstDayOfWeek: number;
    longMonths: string[];
    shortMonths: string[];
    dates: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
  };

  constructor() {
    super();
    const dateLocale = inject<string>(MAT_DATE_LOCALE, {optional: true});
    this.setLocale(dateLocale || dayjs.locale());
  }

  override setLocale(locale: string) {
    super.setLocale(locale);

    const localeData = dayjs().locale(locale).localeData();
    this._localeData = {
      firstDayOfWeek: localeData.firstDayOfWeek(),
      longMonths: localeData.months(),
      shortMonths: localeData.monthsShort(),
      longDaysOfWeek: localeData.weekdays(),
      shortDaysOfWeek: localeData.weekdaysShort(),
      narrowDaysOfWeek: localeData.weekdaysMin(),
      dates: (() => {
        const dtf =
          typeof Intl !== 'undefined'
            ? new Intl.DateTimeFormat(this.locale, {
              day: 'numeric',
              timeZone: 'utc'
            })
            : null;

        return range(31, (i) => {
          if (dtf) {
            // dayjs doesn't appear to support this functionality.
            // Fall back to `Intl` on supported browsers.
            const date = new Date();
            date.setUTCFullYear(2017, 0, i + 1);
            date.setUTCHours(0, 0, 0, 0);
            return dtf.format(date).replace(/[\u200e\u200f]/g, '');
          }

          return i + '';
        });
      })(),
    };
  }

  getYear(date: dayjs.Dayjs): number {
    return this.clone(date).year();
  }

  getMonth(date: dayjs.Dayjs): number {
    return this.clone(date).month();
  }

  getDate(date: dayjs.Dayjs): number {
    return this.clone(date).date();
  }

  getDayOfWeek(date: dayjs.Dayjs): number {
    return this.clone(date).day();
  }

  getMonthNames(style: DateStyles): string[] {
    return style === 'long'
      ? this._localeData.longMonths
      : this._localeData.shortMonths;
  }

  getDateNames(): string[] {
    return this._localeData.dates;
  }

  getDayOfWeekNames(style: DateStyles): string[] {
    if (style === 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style === 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  getYearName(date: dayjs.Dayjs): string {
    return this.clone(date).format('YYYY');
  }

  getFirstDayOfWeek(): number {
    return this._localeData.firstDayOfWeek;
  }

  getNumDaysInMonth(date: dayjs.Dayjs): number {
    return this.clone(date).daysInMonth();
  }

  clone(date: dayjs.Dayjs): dayjs.Dayjs {
    return date.clone().locale(this.locale);
  }

  createDate(year: number, month: number, date: number): dayjs.Dayjs {
    // dayjs will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (month < 0 || month > 11) {
        throw Error(
          `Invalid month index "${month}". Month index has to be between 0 and 11.`
        );
      }

      if (date < 1) {
        throw Error(
          `Invalid date "${date}". Date has to be greater than 0.`
        );
      }

      if (date > 31) {
        throw Error(
          `Invalid date "${date}". Date has to be less than 32.`
        );
      }
    }

    const result = this._createDayJs([year, month, date]).locale(this.locale);

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (
      !result.isValid() &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw Error(
        `Invalid date "${date}" for month with index "${month}".`
      );
    }
    return result;
  }

  today(): dayjs.Dayjs {
    return this._createDayJs();
  }

  parse(value: any, parseFormat?: string | string[]): dayjs.Dayjs | null {
    if (!value) {
      return null;
    }
    if (typeof value === 'string') {
      return this._createDayJs(value, parseFormat);
    }
    return this._createDayJs(value);
  }

  format(date: dayjs.Dayjs, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('DayjsDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  addCalendarYears(date: dayjs.Dayjs, years: number): dayjs.Dayjs {
    return this.clone(date).add(years, 'year');
  }

  addCalendarMonths(date: dayjs.Dayjs, months: number): dayjs.Dayjs {
    return this.clone(date).add(months, 'month');
  }

  addCalendarDays(date: dayjs.Dayjs, days: number): dayjs.Dayjs {
    return this.clone(date).add(days, 'day');
  }

  toIso8601(date: dayjs.Dayjs): string {
    return this.clone(date).toISOString();
  }

  /**
   * Attempts to deserialize a value to a valid date object. This is different from parsing in that
   * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
   * string). The default implementation does not allow any deserialization, it simply checks that
   * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
   * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
   * support passing values from your backend directly to these properties by overriding this method
   * to also deserialize the format used by your backend.
   *
   * @param value The value to be deserialized into a date object.
   * @returns The deserialized date object, either a valid date, null if the value can be
   *     deserialized into a null date (e.g. the empty string), or an invalid date.
   */
  override deserialize(value: any): dayjs.Dayjs | null {
    let date;
    if (value instanceof Date) {
      date = this._createDayJs(value);
    } else if (this.isDateInstance(value)) {
      return this.clone(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = this._createDayJs(value);
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }

  isDateInstance(obj: any): boolean {
    return dayjs.isDayjs(obj);
  }

  isValid(date: dayjs.Dayjs): boolean {
    return date.isValid();
  }

  invalid(): dayjs.Dayjs {
    return dayjs(null);
  }

  setTime(target: dayjs.Dayjs, hours: number, minutes: number, seconds: number): dayjs.Dayjs {
    return this.clone(target)
      .hour(hours)
      .minute(minutes)
      .second(seconds);
  }

  getHours(date: dayjs.Dayjs): number {
    return this.clone(date).hour();
  }

  getMinutes(date: dayjs.Dayjs): number {
    return this.clone(date).minute();
  }

  getSeconds(date: dayjs.Dayjs): number {
    return this.clone(date).second();
  }

  addSeconds(date: dayjs.Dayjs, amount: number): dayjs.Dayjs {
    return this.clone(date).add(amount, 'second');
  }

  private _createDayJs(
    date?: dayjs.ConfigType,
    format?: dayjs.OptionType,
    locale?: string,
  ): dayjs.Dayjs {
    const {strict, useUtc}: DayJsDateAdapterOptions = this._options || {};

    let f: string;
    if (format && Array.isArray(format) && format.length > 0) {
      f = format[0];
    } else if (format && typeof format === 'string') {
      f = format;
    }

    if (useUtc) {
      return dayjs.utc(date, f, strict).locale(locale || this.locale);
    } else {
      return dayjs(date, format, strict).locale(locale || this.locale);
    }
  }
}
