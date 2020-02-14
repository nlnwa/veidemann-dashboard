import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {ConfigObject} from '../../../shared/models/config';

@Pipe({
  name: 'getBrowserConfigName'
})
export class BrowserConfigNamePipe implements PipeTransform {
  constructor(private route: ActivatedRoute) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.route.data.pipe(
      first(),
      map(data => {
        const found = data.options.browserConfigs.find(
          browserConfig => browserConfig.id === configObject.crawlConfig.browserConfigRef.id);
        return found ? found.meta.name : 'browserConfig';
      }));
  }
}
