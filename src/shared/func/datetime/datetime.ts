import * as timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
dayjs.extend(duration);
dayjs.extend(utc);

export class DateTime {

  static dateToUtc(dateString: string, startOfDay: boolean): string {
    const date = dayjs(dateString);
    if (date.isValid()) {
      const utc = dayjs.utc()
        .year(date.get('year'))
        .month(date.get('month'))
        .date(date.get('date'));
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
    return dayjs.utc(timestamp).set('hour', 12).set('minute', 0).set('second', 0);
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

/* eslint-disable no-bitwise */
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
  if (endTime === '') {
    return 'N/A';
  }
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  // @ts-ignore
  return dayjs.duration(end.diff(start)).format('d[days]:hh[hours]:mm[min]:ss[s]');
}

export function timeToDuration(time: number, unit: string) {
  if (unit === 'ms') {
    // @ts-ignore
    return dayjs.duration(time, 'millisecond').format('D[days]:H[hours]:mm[min]:ss[s]:SSS[ms]');
  }
  if (unit === 's') {
    // @ts-ignore
    return dayjs.duration(time, 'second').format('D[days]:H[hours]:mm[min]:ss[s]');
  }

}

