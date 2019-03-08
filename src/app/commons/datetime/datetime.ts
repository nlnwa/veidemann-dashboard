import * as moment from 'moment';
import {Moment} from 'moment';
import * as timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb.js';

export class DateTime {

  static nowUTC() {
    return new Date().toUTCString();
  }

  static formatTimestamp(timestamp) {
    return moment.utc(timestamp).format('DD.MM.YYYY,  HH:mm:ss');
  }

  static dateToUtc(momentObj: Moment, startOfDay: boolean): string {
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

export function fromTimestampProto(proto: any): string {
  if (proto) {
    const ms = new Date(proto.getSeconds() * 1e3 + proto.getNanos() / 1e6);
    return ms.toISOString();
  } else {
    return '';
  }
}

/* tslint:disable:no-bitwise */
export function toTimestampProto(timestamp: string): any {
  if (timestamp) {
    const date = new Date(timestamp);
    const timestampProto = new timestamp_pb.Timestamp();
    const seconds  = date.getTime() / 1000;
    timestampProto.setSeconds(~(~seconds));

    return timestampProto;
  } else {
    return undefined;
  }
}

