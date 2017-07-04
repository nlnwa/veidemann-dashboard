/**
 * Created by kristiana on 04.07.17.
 */

export class ConvertTimestamp {

  convertTimestamp_s_to_yyyymmddhhmm(timestamp) {
    const d = new Date(timestamp * 1000);
    return (d.getFullYear()+"-"+(d.getUTCMonth()+1)+"-"+d.getDate())
  }

  convertTimestamp_yyyymmddhhmm_to_unix(timestamp) {

    //console.log(new Date(timestamp));
    return new Date(timestamp).getTime();
  }


  convertFullTimestamp(timestamp) {
    console.log(new Date(timestamp * 1000));
    return new Date(timestamp * 1000);
  }

}
