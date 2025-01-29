import * as timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb.js';

import dayjs from 'dayjs';
import duration, {Duration, DurationUnitType} from 'dayjs/plugin/duration';
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
  const start = dayjs(startTime);
  const end = endTime === '' ? dayjs() : dayjs(endTime);
  const diff = end.diff(start)
  return formatDuration(dayjs.duration(diff));
}

export function formatDuration(d: Duration): string {
  const formatted = d.format("D[days]:H[hours]:m[min]:s[s]");
  const trimmed = formatted
    .replace(/(?:^|:)(0\w*(?:\[.*?\])?)+/g, "") // Remove leading `0` in each unit, but avoid leading zeros
    .replace(/^:+|:+$/g, "")  // Remove any leading or trailing colons
  return trimmed;
}

const timeUnitMap: { [key: string]: DurationUnitType } = {
  ms: 'millisecond',
  s: 'second',
  m: 'minute',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'month',
  y: 'year',
}

export function timeToDuration(time: number, unit: string) {
  console.log('created duration with: ', time, 'unit: ', unit);
  console.log('object: ', dayjs.duration(time, timeUnitMap[unit]));
  return formatDuration(dayjs.duration(time, timeUnitMap[unit]));
}
