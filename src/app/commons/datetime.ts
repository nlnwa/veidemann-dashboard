import * as moment from 'moment';

export class DateTime {

  static convertFullTimestamp(timestamp) {
    return new Date(timestamp * 1000);
  }

  static today() {
    return Date.now() / 1000;
  }

  static nowUTC() {
    return new Date().toUTCString();
  }

  static scheduleSetValidFrom(formModel) {
    if (formModel.year && formModel.month && formModel.day) {
      const validFromInSeconds = moment.utc()
        .year(formModel.year)
        .month(formModel.month - 1)
        .date(formModel.day)
        .startOf('date')
        .unix();
      return {seconds: validFromInSeconds};
    } else if (formModel.year && formModel.month) {
      const validFromInSeconds = moment.utc()
        .year(formModel.year)
        .month(formModel.valid_from.month - 1)
        .startOf('month')
        .unix();
      return {seconds: validFromInSeconds}
    } else if (formModel.year) {
      const validFromInSeconds = moment.utc()
        .year(formModel.year)
        .startOf('year')
        .unix();
      return {seconds: validFromInSeconds}
    } else {
      return null;
    }
  }

  static scheduleSetValidTo(formModel) {
    if (formModel.year && formModel.month && formModel.day) {
      const validToInSeconds = moment.utc()
        .year(formModel.year)
        .month(formModel.month - 1)
        .date(formModel.day).startOf('date')
        .endOf('date')
        .unix();
      return {seconds: validToInSeconds};

    } else if (formModel.year && formModel.month) {
      const validToInSeconds = moment.utc()
        .year(formModel.year)
        .month(formModel.month - 1)
        .endOf('month')
        .unix();
      return {seconds: validToInSeconds}
    } else if (formModel.year) {
      const validToInSeconds = moment.utc()
        .year(formModel.year)
        .endOf('year')
        .unix();
      return {seconds: validToInSeconds}

    } else {
      return null;
    }
  }

  static scheduleSetCronExpression(formModel) {
    return formModel.minute + ' '
      + formModel.hour + ' '
      + formModel.dom + ' '
      + formModel.month + ' '
      + formModel.dow;
  }

}
