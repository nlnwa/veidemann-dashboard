import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {OptionsService} from '../services/options.service';


@Pipe({
  name: 'getCrawlJobDisabledStatus'
})
export class CrawlJobDisabledStatusPipe implements PipeTransform {
  constructor(private route: ActivatedRoute, private optionsService: OptionsService) {
  }

  transform(id: string): Observable<boolean> {
    return this.optionsService.options$.pipe(
      first(),
      map(options => {
        const found = options.crawlJobs.find(
          crawlJob => crawlJob.id === id);
        return found ? found.crawlJob.disabled : false;
      }));
  }
}
