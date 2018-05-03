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
      console.log('MomentObj is Moment', typeof momentObj, startOfDay);
      const utc = moment.utc()
        .year(momentObj.get('year'))
        .month(momentObj.get('month'))
        .date(momentObj.get('date'))

      if (startOfDay) {
        console.log(utc.startOf('day').toISOString());
        return utc.startOf('day').toISOString();
      } else {
        console.log(utc.endOf('day').toISOString());
        return utc.endOf('day').toISOString();
      }
    } else {
      return '';
    }
  }
}
