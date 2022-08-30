import {Timestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import {DateTime, Duration} from 'luxon';

/**
 * Parse localized short form of date and time to ISO 8601 format.
 *
 * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
 *
 * @param {string} timestamp - Date and time in short format with seconds (locale dependent)
 * @returns {string | undefined} - ISO 8601-compliant string or undefined if input is an invalid date.
 */
export function parseDateAndTime(timestamp: string): string {
  const dt = DateTime.fromFormat(timestamp, 'F');
  return dt.isValid ? dt.toISO() : undefined;
}

export function isValidDate(timestamp: string): boolean {
  return DateTime.fromISO(timestamp).isValid;
}

/**
 * Parse UTC time as local time and return ISO 8601 representation.
 *
 * @param {string} timestamp - ISO 8601-compliant string representation of date and time
 */
export function asLocalTime(timestamp: string): string {
  return DateTime.fromISO(timestamp, {zone: 'system'}).toISO();
}

/**
 * Convert local timezone to utc
 * @param {string} timestamp
 * @param {boolean} startOfDay
 * @returns - string in simplified extended ISO format (ISO 8601)
 */
export function asUTC(timestamp: string, startOfDay: boolean): string {
  return '';
}

/**
 * Unmarshal a protobuf timestamp object to a string in simplified extended ISO format (ISO 8601).
 *
 * The timezone is always zero UTC offset as denoted by suffix Z.
 *
 * @param {Timestamp} proto - protobuf timestamp object
 * @returns {string} - string in simplified extended ISO format (ISO 8601)
 */
export function unmarshalTimestamp(proto: Timestamp): string {
  return proto
    ? proto.toDate().toISOString()
    : undefined;
}

/**
 * Marshal an ISO 8601 formatted string to a protobuf timestamp object.
 *
 * @param {string} timestamp - string in simplified extended ISO format (ISO 8601)
 * @returns {Timestamp} - protobuf timestamp object
 */
export function marshalTimestamp(timestamp: string): Timestamp {
  return timestamp
    ? Timestamp.fromDate(DateTime.fromISO(timestamp).toJSDate())
    : undefined;
}

/**
 * Returns the duration between to dates in human short form.
 *
 * @param {string} startTime - string in simplified extended ISO format (ISO 8601)
 * @param {string} endTime - string in simplified extended ISO format (ISO 8601)
 * @returns {string} - duration between startTime and endTime in localized human short form
 */
export function duration(startTime: string, endTime: string): string {
  const start = DateTime.fromISO(startTime);
  const end = endTime ? DateTime.fromISO(endTime) : DateTime.now();
  return start.diff(end).toHuman({listStyle: 'short', unitDisplay: 'short'});
}

/**
 * Returns a human short form of a duration of time.
 *
 * @param {number} time - The time in unit since Epoch.
 * @param {string} unit - The unit of time. Valid units are 'ms' or 's'.
 * @returns {string} - duration of time in localized human short farm
 */
export function timeToDuration(time: number, unit: string): string {
  let d: Duration;

  switch (unit) {
    case 'ms':
      d = Duration.fromMillis(time);
      break;
    case 's':
      d = Duration.fromMillis(time * 1000);
      break;
    default:
      return undefined;
  }

  return d.toHuman({unitDisplay: 'short'});
}
