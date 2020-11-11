export class Duration {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;

  constructor({
                milliseconds = 0,
                seconds = 0,
                minutes = 0,
                hours = 0,
                days = 0
              }: Partial<Duration> = {}) {
    this.milliseconds = milliseconds;
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;
    this.days = days;
  }
}
