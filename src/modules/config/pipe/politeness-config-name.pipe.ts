import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfigObject} from '../../../shared/models/config';
import {first, map} from 'rxjs/operators';

@Pipe({
  name: 'getPolitenessConfigName'
})
export class PolitenessConfigNamePipe implements PipeTransform {

  constructor(private route: ActivatedRoute) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.route.data.pipe(
      first(),
      map(data => {
        const found = data.options.politenessConfigs.find(
          politenessConfig => politenessConfig.id === configObject.crawlConfig.politenessRef.id);
        return found ? found.meta.name : 'politenessConfig';
      }));
  }
}
