import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(time: number, timeUnit: string, outputFormat: string): any {

    let seconds: number;
    let minutes: number;
    let hours: number;
    let days: number;

    if (timeUnit === 'ms' && outputFormat === 'ss') {
      seconds = Math.floor((time / 1000) % 60);
      return this.format(outputFormat, seconds, minutes, hours, days);

    } else if (timeUnit === 'ms' && outputFormat === 'mmss') {
      seconds = Math.floor((time / 1000) % 60);
      minutes = Math.floor(((time / (1000 * 60)) % 60));
      return this.format(outputFormat, seconds, minutes, hours, days);

    } else if (timeUnit === 's' && outputFormat === 'mmss') {
      seconds = Math.floor((time / 1000) % 60);
      minutes = Math.floor(((time / 60) % 60));
      return this.format(outputFormat, seconds, minutes, hours, days);

    } else if (timeUnit === 'ms' && outputFormat === 'hhmmss') {
      seconds = Math.floor((time / 1000) % 60);
      minutes = Math.floor(((time / (1000 * 60)) % 60));
      hours = Math.floor((time / (1000 * 60 * 60)));
      return this.format(outputFormat, seconds, minutes, hours, days);

    } else if (timeUnit === 's' && outputFormat === 'hhmmss') {
      seconds = Math.floor((time % 60));
      minutes = Math.floor(((time / 60) % 60));
      hours = Math.floor(((time / 60) / 60));
      return this.format(outputFormat, seconds, minutes, hours, days);

    } else if (timeUnit === 'ms' && (outputFormat === 'ddhhmmss' || outputFormat === 'ddhhmmssLong')) {
      seconds = Math.floor(((time / 1000) % 60));
      minutes = Math.floor((time / (1000 * 60) % 60));
      hours = Math.floor((time / (1000 * 60 * 60) % 24));
      days = Math.floor((time / (1000 * 60 * 60 * 24)));
      return this.format(outputFormat, seconds, minutes, hours, days);

    } else if (timeUnit === 's' && (outputFormat === 'ddhhmmss' || outputFormat === 'ddhhmmssLong')) {
      seconds = Math.floor(time % 60);
      minutes = Math.floor(((time / 60) % 60));
      hours = Math.floor(((time / 60) / 60) % 24);
      days = Math.floor((((time / 60) / 60) / 24));
      return this.format(outputFormat, seconds, minutes, hours, days);

    } else {
      return time;
    }
  }


  private format(outputFormat, seconds, minutes, hours, days) {
    (days < 10) ? days = '0' + days : days;
    (hours < 10) ? hours = '0' + hours : hours;
    (minutes < 10) ? minutes = '0' + minutes : minutes;
    (seconds < 10) ? seconds = '0' + seconds : seconds;

    switch (outputFormat) {
      case 's':
      return `${seconds}s`;
      case 'mmss':
        return `${minutes}m:${seconds}s`;

      case 'hhmmss':
        return `${hours}h:${minutes}m:${seconds}s`;

      case 'ddhhmmss':
        return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

      case 'ddhhmmssLong':
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    }

  }
}
