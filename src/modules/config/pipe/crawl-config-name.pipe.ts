import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {ConfigObject} from '../../../shared/models/config';
import {ActivatedRoute} from '@angular/router';


@Pipe({
  name: 'getCrawlConfigName'
})
export class CrawlConfigNamePipe implements PipeTransform {

  constructor(private route: ActivatedRoute) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.route.data.pipe(
      first(),
      map(data => {
        const found = data.options.crawlConfigs.find(
          crawlConfig => crawlConfig.id === configObject.crawlJob.crawlConfigRef.id);
        return found ? found.meta.name : 'crawlConfig';
      }));
  }
}
