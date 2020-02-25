export class Duration {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;

  constructor({
                seconds = 0,
                minutes = 0,
                hours = 0,
                days = 0
              }: Partial<Duration> = {}) {
    this.seconds = seconds;
    this.minutes = minutes;
    this.hours = hours;
    this.days = days;
  }
}
