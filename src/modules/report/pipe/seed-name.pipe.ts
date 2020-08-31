import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {CrawlExecutionService} from '../services';


@Pipe({
  name: 'getSeedNamePipe'
})
export class SeedNamePipe implements PipeTransform {

  constructor(private crawlExecutionService: CrawlExecutionService) {
  }

  transform(id: string): Observable<string> {
    return this.crawlExecutionService.getSeed(id).pipe(
      first(),
      map(configObject => configObject ? configObject.meta.name : '')
    );
  }
}
