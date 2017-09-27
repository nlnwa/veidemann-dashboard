export class DateTime {
  static convertTimestamp_s_to_yyyymmddhhmm(timestamp) {
    const d = new Date(timestamp * 1000);
    return (d.getFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getDate())
  }

  static convertTimestamp_yyyymmddhhmm_to_unix(timestamp) {
    return new Date(timestamp).getTime();
  }

  static convertFullTimestamp(timestamp) {
    return new Date(timestamp * 1000);
  }

  static today() {
    return Date.now() / 1000;
  }

  static nowUTC() {
    return new Date().toUTCString();
  }
}
