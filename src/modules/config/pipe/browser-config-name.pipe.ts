import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {ConfigObject} from '../../../shared/models/config';
import {OptionsService} from '../services/options.service';


@Pipe({
  name: 'getBrowserConfigName'
})
export class BrowserConfigNamePipe implements PipeTransform {
  constructor(private route: ActivatedRoute, private optionsService: OptionsService) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.optionsService.options$.pipe(
      first(),
      map(options => {
        const found = options.browserConfigs.find(
          browserConfig => browserConfig.id === configObject.crawlConfig.browserConfigRef.id);
        return found ? found.meta.name : 'browserConfig';
      }));
  }
}
