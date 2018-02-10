import * as moment from 'moment';

export class DateTime {

  static convertFullTimestamp(timestamp) {
    return new Date(timestamp * 1000);
  }

  static today() {
    return Date.now() / 1000;
  }

  static nowUTC() {
    return new Date().toUTCString();
  }

  static fromSecondsToDateUTC(seconds) {
    const m = moment.utc(seconds, 'X');
    return {year: m.year(), month: m.month(), day: m.date()};
  }

  static setValidFromSecondsUTC(year, month, day) {
    if (year && month && day) {
      return moment.utc()
        .year(year)
        .month(month - 1)
        .date(day)
        .startOf('date')
        .unix();
    } else if (year && month) {
      return moment.utc()
        .year(year)
        .month(month - 1)
        .startOf('month')
        .unix();
    } else if (year) {
      return moment.utc()
        .year(year)
        .startOf('year')
        .unix();
    } else {
      return undefined;
    }
  }

  static setValidToSecondsUTC(year, month, day) {
    if (year && month && day) {
      return moment.utc()
        .year(year)
        .month(month - 1)
        .date(day).startOf('date')
        .endOf('date')
        .unix();
    } else if (year && month) {
      return moment.utc()
        .year(year)
        .month(month - 1)
        .endOf('month')
        .unix();
    } else if (year) {
      return moment.utc()
        .year(year)
        .endOf('year')
        .unix();
    } else {
      return undefined;
    }
  }
}
