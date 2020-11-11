export interface Changefeed<T> {
  old_val: T;
  new_val: T;
}

export interface Timestamp {
  dateTime: DateTime;
  offset: RethinkOffset;
}

export interface Date {
  day: number;
  month: number;
  year: number;
}

export interface Time {
  hour: number;
  minute: number;
  nano: number;
  second: number;
}

export interface DateTime {
  date: Date;
  time: Time;
}

export interface RethinkOffset {
  totalSeconds: number;
}

export function fromRethinkTimeStamp(t: Timestamp): string {
  return new Date(Date.UTC(t.dateTime.date.year, t.dateTime.date.month, t.dateTime.date.day,
    t.dateTime.time.hour, t.dateTime.time.minute, t.dateTime.time.second)).toISOString();
}
