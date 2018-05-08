import * as moment from 'moment';
import {Moment} from 'moment';

export class DateTime {

  static nowUTC() {
    return new Date().toUTCString();
  }

  static formatTimestamp(timestamp) {
    return moment.utc(timestamp).format('DD/MM/YYYY  HH:mm:ss');
  }

  static dateToUtc(momentObj: Moment, startOfDay: boolean): string {
    if (momentObj.isValid()) {
      const utc = moment.utc()
        .year(momentObj.get('year'))
        .month(momentObj.get('month'))
        .date(momentObj.get('date'))

      if (startOfDay) {
        return utc.startOf('day').toISOString();
      } else {
        return utc.endOf('day').toISOString();
      }
    } else {
      return '';
    }
  }
 /*
  *  Convert endOf startOf times from backend to 12pm to avoid that datepicker sets next day based on users timezone
  */
  static adjustTime(timestamp) {
      const m = moment.utc(timestamp);
      m.set({h: 12, m: 0, s: 0});
      return m;
  }
}
