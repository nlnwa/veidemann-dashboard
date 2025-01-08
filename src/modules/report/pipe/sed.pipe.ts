import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'sedPipe',
    standalone: false
})
export class SedPipe implements PipeTransform {

  constructor() {
  }

  // strips away query string from url
  transform(url: string): string {
    const a = new URL(url);
    return a.protocol + '//' + a.host + a.pathname;
  }
}
