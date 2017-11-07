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
    const m =  moment.utc(seconds, 'X')
    return { year: m.year(), month: m.month(), day: m.date()};
  }

  static setValidFromSecondsUTC(year, month, day) {
    if (year && month && day) {
      const validFromInSeconds = moment.utc()
        .year(year)
        .month(month - 1)
        .date(day)
        .startOf('date')
        .unix();
      return validFromInSeconds;
    } else if (year && month) {
      const validFromInSeconds = moment.utc()
        .year(year)
        .month(month - 1)
        .startOf('month')
        .unix();
      return validFromInSeconds;
    } else if (year) {
      const validFromInSeconds = moment.utc()
        .year(year)
        .startOf('year')
        .unix();
      return validFromInSeconds;
    } else {
      return undefined;
    }
  }

  static setValidToSecondsUTC(year, month, day) {
    if (year && month && day) {
      const validToInSeconds = moment.utc()
        .year(year)
        .month(month - 1)
        .date(day).startOf('date')
        .endOf('date')
        .unix();
      return validToInSeconds;

    } else if (year && month) {
      const validToInSeconds = moment.utc()
        .year(year)
        .month(month - 1)
        .endOf('month')
        .unix();
      return validToInSeconds;
    } else if (year) {
      const validToInSeconds = moment.utc()
        .year(year)
        .endOf('year')
        .unix();
      return validToInSeconds;

    } else {
      return undefined;
    }
  }
}
