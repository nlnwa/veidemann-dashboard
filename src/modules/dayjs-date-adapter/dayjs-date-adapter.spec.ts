/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/ja';
import 'dayjs/locale/fr';
import 'dayjs/locale/da';
import 'dayjs/locale/de';

const JAN = 0,
  FEB = 1,
  MAR = 2,
  APR = 3,
  MAY = 4,
  JUN = 5,
  JUL = 6,
  AUG = 7,
  SEP = 8,
  OCT = 9,
  NOV = 10,
  DEC = 11;

import {
  DayjsDateAdapter,
  MAT_DAYJS_DATE_ADAPTER_OPTIONS
} from './dayjs-date-adapter';
import {TestBed, inject, waitForAsync} from '@angular/core/testing';

import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {DayjsDateAdapterModule} from '.';

describe('DayjsDateAdapter', () => {
  describe('with defaults', () => {
    let adapter: DayjsDateAdapter;
    let assertValidDate: (d: dayjs.Dayjs | null, valid: boolean) => void;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DayjsDateAdapterModule],
        providers: [
          {
            provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS,
            useValue: {useUtc: false}
          }
        ]
      }).compileComponents();
    }));

    beforeEach(inject([DateAdapter], (dateAdapter: DayjsDateAdapter) => {
      dayjs.locale('en');
      adapter = dateAdapter;
      adapter.setLocale('en');

      assertValidDate = (d: dayjs.Dayjs | null, valid: boolean) => {
        expect(adapter.isDateInstance(d))
          .withContext(`Expected ${d} to be a date instance`)
          .toBeTruthy();
        expect(adapter.isValid(d))
          .withContext(
            `Expected ${d} to be ${valid ? 'valid' : 'invalid'},` +
            ` but was ${valid ? 'invalid' : 'valid'}`
          )
          .toBe(valid);
      };
    }));

    it('should get year', () => {
      expect(adapter.getYear(dayjs([2017, JAN, 1]))).toBe(2017);
    });

    it('should get month', () => {
      expect(adapter.getMonth(dayjs([2017, JAN, 1]))).toBe(0);
    });

    it('should get date', () => {
      expect(adapter.getDate(dayjs([2017, JAN, 1]))).toBe(1);
    });

    it('should get day of week', () => {
      expect(adapter.getDayOfWeek(dayjs([2017, JAN, 1]))).toBe(0);
    });

    it('should get same day of week in a locale with a different first day of the week', () => {
      adapter.setLocale('fr');
      expect(adapter.getDayOfWeek(dayjs([2017, JAN, 1]))).toBe(0);
    });

    it('should get long month names', () => {
      expect(adapter.getMonthNames('long')).toEqual([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]);
    });

    it('should get short month names', () => {
      expect(adapter.getMonthNames('short')).toEqual([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]);
    });

    it('should get narrow month names', () => {
      expect(adapter.getMonthNames('narrow')).toEqual([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]);
    });

    it('should get month names in a different locale', () => {
      adapter.setLocale('ja');
      expect(adapter.getMonthNames('long')).toEqual([
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]);
    });

    it('should get date names', () => {
      expect(adapter.getDateNames()).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31'
      ]);
    });

    it('should get date names in a different locale', () => {
      adapter.setLocale('ja');
      if (typeof Intl !== 'undefined') {
        expect(adapter.getDateNames()).toEqual([
          '1日',
          '2日',
          '3日',
          '4日',
          '5日',
          '6日',
          '7日',
          '8日',
          '9日',
          '10日',
          '11日',
          '12日',
          '13日',
          '14日',
          '15日',
          '16日',
          '17日',
          '18日',
          '19日',
          '20日',
          '21日',
          '22日',
          '23日',
          '24日',
          '25日',
          '26日',
          '27日',
          '28日',
          '29日',
          '30日',
          '31日'
        ]);
      } else {
        expect(adapter.getDateNames()).toEqual([
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
          '31'
        ]);
      }
    });

    it('should get long day of week names', () => {
      expect(adapter.getDayOfWeekNames('long')).toEqual([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]);
    });

    it('should get short day of week names', () => {
      expect(adapter.getDayOfWeekNames('short')).toEqual([
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ]);
    });

    it('should get narrow day of week names', () => {
      expect(adapter.getDayOfWeekNames('narrow')).toEqual([
        'Su',
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa'
      ]);
    });

    // dayjs does not use locale for day of week names
    it('should get day of week names in a different locale', () => {
      adapter.setLocale('ja');
      expect(adapter.getDayOfWeekNames('long')).toEqual([
        '日曜日',
        '月曜日',
        '火曜日',
        '水曜日',
        '木曜日',
        '金曜日',
        '土曜日'
      ]);
    });

    it('should get year name', () => {
      expect(adapter.getYearName(dayjs([2017, JAN, 1]))).toBe('2017');
    });

    it('should get year name in a different locale', () => {
      adapter.setLocale('ja');
      expect(adapter.getYearName(dayjs([2017, JAN, 1]))).toBe('2017');
    });

    it('should get first day of week', () => {
      expect(adapter.getFirstDayOfWeek()).toBe(0);
    });

    it('should get first day of week in a different locale', () => {
      adapter.setLocale('fr');
      expect(adapter.getFirstDayOfWeek()).toBe(1);
    });

    it('should create dayJs date', () => {
      expect(adapter.createDate(2017, JAN, 1).format()).toEqual(
        dayjs([2017, JAN, 1]).format()
      );
    });

    it('should not create dayjs date with month over/under-flow', () => {
      expect(() => adapter.createDate(2017, JAN - 1, 1)).toThrow();
      expect(() => {
        adapter.createDate(2017, DEC + 1, 1);
      }).toThrow();
    });

    it('should not create dayjs date with date over/under-flow', () => {
      expect(() => adapter.createDate(2017, JAN, 32)).toThrow();
      expect(() => adapter.createDate(2017, JAN, 0)).toThrow();
    });

    it('should create dayJs date with low year number', () => {
      expect(adapter.createDate(-1, JAN, 1).year()).toBe(-1);
      expect(adapter.createDate(0, JAN, 1).year()).toBe(1900);
      expect(adapter.createDate(50, JAN, 1).year()).toBe(1950);
      expect(adapter.createDate(99, JAN, 1).year()).toBe(1999);
      expect(adapter.createDate(100, JAN, 1).year()).toBe(100);
    });

    it('should not create dayjs date in utc format', () => {
      expect(adapter.createDate(2017, JAN, 5).isUTC()).toEqual(false);
    });

    it("should get today's date", () => {
      const today = dayjs();
      const adapterToday = adapter.today();
      expect(adapter.sameDate(adapterToday, today))
        .withContext("should be equal to today's date")
        .toBe(true);
    });

    [
      {
        dtString: '01.02.2017',
        format: 'MM.DD.YYYY',
        expected: '2017-01-02T00:00:00-08:00'
      },
      {
        dtString: '01.02.2017',
        format: 'MM.DD.YYYY',
        expected: '2017-01-02T00:00:00-08:00'
      },
      {
        dtString: '1.2.2017',
        format: 'D.M.YYYY',
        expected: '2017-02-01T00:00:00-08:00'
      },
      {
        dtString: '02.01.2017',
        format: ['D.M.YYYY', 'DD.MM.YYYY', 'D.M.YY'],
        expected: '2017-01-02T00:00:00-08:00'
      }
    ].forEach(({dtString, format, expected}) =>
      it(`should parse string ${dtString} according to given format`, () => {
        expect(adapter.parse(dtString, format).utcOffset(-8, true).format()).toEqual(
          expected
        );
      })
    );

    it(`should parse dayjs object according to given format`, () => {
      expect(
        adapter
          .parse(dayjs([2017, JAN, 2]), [
            'D/M/YYYY',
            'DD/MM/YYYY',
            'D/M/YY'
          ])
          .utcOffset(-8, true)
          .format()
      ).toEqual('2017-01-02T00:00:00-08:00');
    });

    it(`should parse JS Date object according to given format`, () => {
      expect(
        adapter
          .parse(new Date(2017, JAN, 2), [
            'D/M/YYYY',
            'DD/MM/YYYY',
            'D/M/YY'
          ])
          .utcOffset(-8, true)
          .format()
      ).toEqual('2017-01-02T00:00:00-08:00');
    });

    it('should parse number', () => {
      const timestamp = new Date().getTime();
      expect(adapter.parse(timestamp).format()).toEqual(
        dayjs(timestamp).format()
      );
    });

    it('should parse Date', () => {
      const date = new Date(2017, JAN, 1);
      expect(adapter.parse(date).format()).toEqual(dayjs(date).format());
    });

    it('should parse dayjs date', () => {
      const date = dayjs([2017, JAN, 1]);
      const parsedDate = adapter.parse(date, 'MM/DD/YYYY');
      expect(parsedDate.format()).toEqual(date.format());
      expect(parsedDate).not.toBe(date);
    });

    it('should parse empty string as null', () => {
      expect(adapter.parse('', 'MM.DD.YYYY')).toBeNull();
    });

    it('should parse invalid value as invalid', () => {
      const d = adapter.parse('hello', 'MM/DD/YYYY');
      expect(d).not.toBeNull();
      expect(adapter.isDateInstance(d))
        .withContext(
          'Expected string to have been fed through Date.parse'
        )
        .toBe(true);
      expect(adapter.isValid(d as dayjs.Dayjs))
        .withContext('Expected to parse as "invalid date" object')
        .toBe(false);
    });

    it('should format date according to given format', () => {
      expect(adapter.format(dayjs([2017, JAN, 2]), 'MM/DD/YYYY')).toEqual(
        '01/02/2017'
      );
      expect(adapter.format(dayjs([2017, JAN, 2]), 'DD/MM/YYYY')).toEqual(
        '02/01/2017'
      );
    });

    it('should format with a different locale', () => {
      expect(adapter.format(dayjs([2017, JAN, 2]), 'll')).toEqual(
        'Jan 2, 2017'
      );
      adapter.setLocale('ja');
      expect(adapter.format(dayjs([2017, JAN, 2]), 'll')).toEqual(
        '2017年1月2日'
      );
    });

    it('should throw when attempting to format invalid date', () => {
      expect(() => adapter.format(dayjs(NaN), 'MM/DD/YYYY')).toThrowError(
        /DayjsDateAdapter: Cannot format invalid date\./
      );
    });

    it('should add years', () => {
      expect(
        adapter.addCalendarYears(dayjs([2017, JAN, 1]), 1).format()
      ).toEqual(dayjs([2018, JAN, 1]).format());
      expect(
        adapter.addCalendarYears(dayjs([2017, JAN, 1]), -1).format()
      ).toEqual(dayjs([2016, JAN, 1]).format());
    });

    it('should respect leap years when adding years', () => {
      expect(
        adapter.addCalendarYears(dayjs([2016, FEB, 29]), 1).format()
      ).toEqual(dayjs([2017, FEB, 28]).format());
      expect(
        adapter.addCalendarYears(dayjs([2016, FEB, 29]), -1).format()
      ).toEqual(dayjs([2015, FEB, 28]).format());
    });

    it('should add months', () => {
      expect(
        adapter.addCalendarMonths(dayjs([2017, JAN, 1]), 1).format()
      ).toEqual(dayjs([2017, FEB, 1]).format());
      expect(
        adapter.addCalendarMonths(dayjs([2017, JAN, 1]), -1).format()
      ).toEqual(dayjs([2016, DEC, 1]).format());
    });

    it('should respect month length differences when adding months', () => {
      expect(
        adapter.addCalendarMonths(dayjs([2017, JAN, 31]), 1).format()
      ).toEqual(dayjs([2017, FEB, 28]).format());
      expect(
        adapter.addCalendarMonths(dayjs([2017, MAR, 31]), -1).format()
      ).toEqual(dayjs([2017, FEB, 28]).format());
    });

    it('should add days', () => {
      expect(
        adapter.addCalendarDays(dayjs([2017, JAN, 1]), 1).format()
      ).toEqual(dayjs([2017, JAN, 2]).format());
      expect(
        adapter.addCalendarDays(dayjs([2017, JAN, 1]), -1).format()
      ).toEqual(dayjs([2016, DEC, 31]).format());
    });

    it('should clone', () => {
      const date = dayjs([2017, JAN, 1]);
      expect(adapter.clone(date).format()).toEqual(date.format());
      expect(adapter.clone(date)).not.toBe(date);
    });

    it('should compare dates', () => {
      expect(
        adapter.compareDate(
          dayjs([2017, JAN, 1]),
          dayjs([2017, JAN, 2])
        )
      ).toBeLessThan(0);
      expect(
        adapter.compareDate(
          dayjs([2017, JAN, 1]),
          dayjs([2017, FEB, 1])
        )
      ).toBeLessThan(0);
      expect(
        adapter.compareDate(
          dayjs([2017, JAN, 1]),
          dayjs([2018, JAN, 1])
        )
      ).toBeLessThan(0);
      expect(
        adapter.compareDate(
          dayjs([2017, JAN, 1]),
          dayjs([2017, JAN, 1])
        )
      ).toBe(0);
      expect(
        adapter.compareDate(
          dayjs([2018, JAN, 1]),
          dayjs([2017, JAN, 1])
        )
      ).toBeGreaterThan(0);
      expect(
        adapter.compareDate(
          dayjs([2017, FEB, 1]),
          dayjs([2017, JAN, 1])
        )
      ).toBeGreaterThan(0);
      expect(
        adapter.compareDate(
          dayjs([2017, JAN, 2]),
          dayjs([2017, JAN, 1])
        )
      ).toBeGreaterThan(0);
    });

    it('should clamp date at lower bound', () => {
      expect(
        adapter.clampDate(
          dayjs([2017, JAN, 1]),
          dayjs([2018, JAN, 1]),
          dayjs([2019, JAN, 1])
        )
      ).toEqual(dayjs([2018, JAN, 1]));
    });

    it('should clamp date at upper bound', () => {
      expect(
        adapter.clampDate(
          dayjs([2020, JAN, 1]),
          dayjs([2018, JAN, 1]),
          dayjs([2019, JAN, 1])
        )
      ).toEqual(dayjs([2019, JAN, 1]));
    });

    it('should clamp date already within bounds', () => {
      expect(
        adapter.clampDate(
          dayjs([2018, FEB, 1]),
          dayjs([2018, JAN, 1]),
          dayjs([2019, JAN, 1])
        )
      ).toEqual(dayjs([2018, FEB, 1]));
    });

    it('should count today as a valid date instance', () => {
      const d = dayjs();
      expect(adapter.isValid(d)).toBe(true);
      expect(adapter.isDateInstance(d)).toBe(true);
    });

    it('should count an invalid date as an invalid date instance', () => {
      const d = dayjs(NaN);
      expect(adapter.isValid(d)).toBe(false);
      expect(adapter.isDateInstance(d)).toBe(true);
    });

    it('should count a string as not a date instance', () => {
      const d = '1/1/2017';
      expect(adapter.isDateInstance(d)).toBe(false);
    });

    it('should count a Date as not a date instance', () => {
      const d = new Date();
      expect(adapter.isDateInstance(d)).toBe(false);
    });

    it('should provide a method to return a valid date or null', () => {
      const d = dayjs();
      expect(adapter.getValidDateOrNull(d)).toBe(d);
      expect(adapter.getValidDateOrNull(dayjs(NaN))).toBeNull();
    });

    it('should create valid dates from valid ISO strings', () => {
      assertValidDate(
        adapter.deserialize('1985-04-12T23:20:50.52Z'),
        true
      );
      assertValidDate(
        adapter.deserialize('1996-12-19T16:39:57-08:00'),
        true
      );
      assertValidDate(
        adapter.deserialize('1937-01-01T12:00:27.87+00:20'),
        true
      );
      assertValidDate(adapter.deserialize('1990-13-31T23:59:00Z'), false);
      expect(adapter.deserialize('')).toBeNull();
      expect(adapter.deserialize(null)).toBeNull();
      assertValidDate(adapter.deserialize(new Date()), true);
      assertValidDate(adapter.deserialize(new Date(NaN)), false);
      assertValidDate(adapter.deserialize(dayjs()), true);
    });

    it('should clone the date when deserializing a dayjs date', () => {
      const date = dayjs([2017, JAN, 1]);
      expect(adapter.deserialize(date).format()).toEqual(date.format());
      expect(adapter.deserialize(date)).not.toBe(date);
    });

    it('should deserialize dates with the correct locale', () => {
      adapter.setLocale('ja');
      expect(
        adapter.deserialize('1985-04-12T23:20:50.52Z').locale()
      ).toBe('ja');
      expect(adapter.deserialize(new Date()).locale()).toBe('ja');
      expect(adapter.deserialize(dayjs()).locale()).toBe('ja');
    });

    it('setLocale should not modify global dayjs locale', () => {
      expect(dayjs.locale()).toBe('en');
      adapter.setLocale('ja');
      expect(dayjs.locale()).toBe('en');
    });

    it('returned dayjs should have correct locale', () => {
      adapter.setLocale('ja');
      expect(adapter.createDate(2017, JAN, 1).locale()).toBe('ja');
      expect(adapter.today().locale()).toBe('ja');
      expect(adapter.parse('1.1.2017', 'MM.DD.YYYY').locale()).toBe('ja');
      expect(adapter.addCalendarDays(dayjs(), 1).locale()).toBe('ja');
      expect(adapter.addCalendarMonths(dayjs(), 1).locale()).toBe('ja');
      expect(adapter.addCalendarYears(dayjs(), 1).locale()).toBe('ja');
    });

    it('should not change locale of dayjs passed as params', () => {
      const date = dayjs();
      expect(date.locale()).toBe('en');
      adapter.setLocale('ja');
      adapter.getYear(date);
      adapter.getMonth(date);
      adapter.getDate(date);
      adapter.getDayOfWeek(date);
      adapter.getYearName(date);
      adapter.getNumDaysInMonth(date);
      adapter.clone(date);
      adapter.parse(date, 'MM/DD/YYYY');
      adapter.format(date, 'MM/DD/YYYY');
      adapter.addCalendarDays(date, 1);
      adapter.addCalendarMonths(date, 1);
      adapter.addCalendarYears(date, 1);
      adapter.toIso8601(date);
      adapter.isDateInstance(date);
      adapter.isValid(date);
      expect(date.locale()).toBe('en');
    });

    it('should create invalid date', () => {
      assertValidDate(adapter.invalid(), false);
    });
  });

  // Not supported - dayjs requires importing the language as a plugin prior to adapter construction
  // There are attempts to dynamically load language plugins, but depends on Promises.
  // https://stackoverflow.com/questions/59609466/how-to-get-locale-dynamically-from-dayjs-https-www-npmjs-com-package-dayjs
  describe('with MAT_DATE_LOCALE override', () => {
    let adapter: DayjsDateAdapter;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DayjsDateAdapterModule],
        providers: [{provide: MAT_DATE_LOCALE, useValue: 'ja'}]
      }).compileComponents();
    }));

    beforeEach(inject([DateAdapter], (d: DayjsDateAdapter) => {
      adapter = d;
    }));

    it('should take the default locale id from the MAT_DATE_LOCALE injection token', () => {
      const results = adapter.format(dayjs([2017, JAN, 2]), 'll');
      expect(results).toEqual('2017年1月2日');
    });
  });

  describe('with LOCALE_ID override', () => {
    let adapter: DayjsDateAdapter;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DayjsDateAdapterModule],
        providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr'}]
      }).compileComponents();
    }));

    beforeEach(inject([DateAdapter], (d: DayjsDateAdapter) => {
      adapter = d;
    }));

    it('should take the default locale id from the LOCALE_ID injection token', () => {
      expect(adapter.format(dayjs([2017, JAN, 2]), 'll')).toEqual(
        '2 janv. 2017'
      );
    });
  });

  describe('with MAT_DAYJS_DATE_ADAPTER_OPTIONS override', () => {
    let adapter: DayjsDateAdapter;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DayjsDateAdapterModule],
        providers: [
          {
            provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS,
            useValue: {useUtc: true}
          }
        ]
      }).compileComponents();
    }));

    beforeEach(inject([DateAdapter], (d: DayjsDateAdapter) => {
      adapter = d;
    }));

    describe('use UTC', () => {
      it('should create dayJs date in UTC', () => {
        expect(adapter.createDate(2017, JAN, 5).isUTC()).toBe(true);
      });

      it('should create today in UTC', () => {
        expect(adapter.today().isUTC()).toBe(true);
      });

      it('should parse dates to UTC', () => {
        expect(adapter.parse('1/2/2017', 'MM/DD/YYYY').isUTC()).toBe(
          true
        );
      });

      it('should return UTC date when deserializing', () => {
        expect(
          adapter.deserialize('1985-04-12T23:20:50.52Z').isUTC()
        ).toBe(true);
      });

      it('should return UTC date when deserializing date only', () => {
        expect(adapter.deserialize('1985-04-12').isUTC()).toBe(true);
      });

      [
        {
          dtString: '1/2/2017',
          format: 'M/D/YYYY',
          expected: '2017-01-02T00:00:00+00:00'
        },
        {
          dtString: '01.02.2017',
          format: 'DD.MM.YYYY',
          expected: '2017-02-01T00:00:00+00:00'
        },
        {
          dtString: '1.2.2017',
          format: 'D.M.YYYY',
          expected: '2017-02-01T00:00:00+00:00'
        },
        {
          dtString: '1.2.2017',
          format: ['D.M.YYYY', 'DD.MM.YYYY'],
          expected: '2017-02-01T00:00:00+00:00'
        },
        {
          dtString: '01.02.2017',
          format: ['D.M.YYYY', 'DD.MM.YYYY'],
          expected: '2017-02-01T00:00:00+00:00'
        }
      ].forEach(({dtString, format, expected}) =>
        it(`should parse string ${dtString} according to given format`, () => {
          expect(adapter.parse(dtString, format)!.format()).toEqual(
            expected
          );
        })
      );
    });

    describe('strict mode', () => {
      beforeEach(waitForAsync(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          imports: [DayjsDateAdapterModule],
          providers: [
            {
              provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS,
              useValue: {
                strict: true
              }
            }
          ]
        }).compileComponents();
      }));

      beforeEach(inject([DateAdapter], (d: DayjsDateAdapter) => {
        adapter = d;
      }));

      it('should detect valid strings according to given format', () => {
        expect(
          adapter.parse('1.2.2017', 'D.M.YYYY').format('l')
        ).toEqual(dayjs([2017, FEB, 1]).format('l'));
      });

      it('should detect invalid strings according to given format', () => {
        expect(
          adapter.parse('2017-01-01', 'MM/DD/YYYY').isValid()
        ).toBe(false);
        expect(adapter.parse('1/2/2017', 'MM/DD/YYYY').isValid()).toBe(
          false
        );
        expect(
          adapter.parse('Jan 5, 2017', 'MMMM D, YYYY').isValid()
        ).toBe(false);
      });
    });
  });
});
