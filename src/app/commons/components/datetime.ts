/**
 * Created by kristiana on 04.07.17.
 */

export class DateTime {

  convertTimestamp_s_to_yyyymmddhhmm(timestamp) {
    const d = new Date(timestamp * 1000);
    return (d.getFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getDate())
  }

  convertTimestamp_yyyymmddhhmm_to_unix(timestamp) {

    return new Date(timestamp).getTime();
  }


  convertFullTimestamp(timestamp) {
    return new Date(timestamp * 1000);
  }

   today() {
    return (Date.now() / 1000);
  }

  nowUTC() {
    const newDate = new Date();
    return (new Date().toUTCString());
  }

}
