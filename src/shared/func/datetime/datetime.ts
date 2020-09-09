import * as moment from 'moment';
import 'moment-duration-format';
import * as timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb.js';

export class DateTime {

  static dateToUtc(dateString: string, startOfDay: boolean): string {
    const momentObj = moment(dateString);
    if (momentObj.isValid()) {
      const utc = moment.utc()
        .year(momentObj.get('year'))
        .month(momentObj.get('month'))
        .date(momentObj.get('date'));
      if (startOfDay) {
        return utc.startOf('day').toISOString();
      } else {
        return utc.endOf('day').toISOString();
      }
    } else {
      return null;
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

export function isValidDate(d: Date) {
  return d.toString() !== 'Invalid Date';
}

export function fromTimestampProto(proto: any): string {
  if (proto) {
    const ms = new Date(proto.getSeconds() * 1e3 + proto.getNanos() / 1e6);
    return ms.toISOString();
  } else {
    return '';
  }
}

export function fromTimestamp(t: {
  dateTime: {
    date: {
      day: number
      month: number,
      year: number,
    },
    time: {
      hour: number,
      minute: number,
      nano: number, ​​​
      second: number,
    }
  },
  offset: {
    totalSeconds: number
  }
}): string {
  return new Date(Date.UTC(t.dateTime.date.year, t.dateTime.date.month, t.dateTime.date.day,
    t.dateTime.time.hour, t.dateTime.time.minute, t.dateTime.time.second)).toISOString();
}

/* tslint:disable:no-bitwise */
export function toTimestampProto(timestamp: string): any {
  if (timestamp) {
    const date = new Date(timestamp);
    const timestampProto = new timestamp_pb.Timestamp();
    const seconds = date.getTime() / 1000;
    timestampProto.setSeconds(~(~seconds));

    return timestampProto;
  } else {
    return undefined;
  }
}

export function durationBetweenDates(startTime: string, endTime: string): string {
  const start = moment(startTime);
  const end = moment(endTime);
  return moment.duration(end.diff(start)).format('d[days]:hh[hours]:mm[min]:ss[s]');
}

export function timeToDuration(time: number, unit: string) {
  if (unit === 'ms') {
    return moment.duration(time, 'milliseconds').format('d[days]:hh[hours]:mm[min]:ss[s]');
  }
  if (unit === 's') {
    return moment.duration(time, 'seconds').format('d[days]:hh[hours]:mm[min]:ss[s]');
  }

}

