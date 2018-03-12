import * as moment from 'moment';

export class DateTime {

  static nowUTC() {
    return new Date().toUTCString();
  }

  static formatTimestamp(timestamp) {
    const formattedTimestamp = moment.utc(timestamp).local().format('DD/MM/YYYY  HH:mm:ss' );
    return formattedTimestamp;
  }

  static fromISOToDateUTC(isoString) {
    const m = moment.utc(isoString);
    return {year: m.year(), month: m.month(), day: m.date()};
  }

  static setValidFromSecondsUTC(year, month, day) {
    if (year && month && day) {
      return moment.utc()
        .year(year)
        .month(month - 1)
        .date(day)
        .startOf('date')
        .toISOString();
    } else if (year && month) {
      return moment.utc()
        .year(year)
        .month(month - 1)
        .startOf('month')
        .toISOString();
    } else if (year) {
      return moment.utc()
        .year(year)
        .startOf('year')
        .toISOString();
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
        .toISOString();
    } else if (year && month) {
      return moment.utc()
        .year(year)
        .month(month - 1)
        .endOf('month')
        .toISOString();
    } else if (year) {
      return moment.utc()
        .year(year)
        .endOf('year')
        .toISOString();
    } else {
      return undefined;
    }
  }
}
