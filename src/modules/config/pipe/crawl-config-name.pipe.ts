import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConfigObject} from '../../../shared/models/config';
import {ActivatedRoute} from '@angular/router';
import {OptionsService} from '../services/options.service';


@Pipe({
    name: 'getCrawlConfigName',
    standalone: false
})
export class CrawlConfigNamePipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private optionsService: OptionsService) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.optionsService.options$.pipe(
      map(options => {
        const found = options.crawlConfigs.find(
          crawlConfig => crawlConfig.id === configObject.crawlJob.crawlConfigRef.id);
        return found ? found.meta.name : 'crawlConfig';
      }));
  }
}
