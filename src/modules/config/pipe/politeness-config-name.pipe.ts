import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfigObject} from '../../../shared/models/config';
import {map} from 'rxjs/operators';
import {OptionsService} from '../services/options.service';

@Pipe({
    name: 'getPolitenessConfigName',
    standalone: false
})
export class PolitenessConfigNamePipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private optionsService: OptionsService) {
  }

  transform(configObject: ConfigObject): Observable<string> {
    return this.optionsService.options$.pipe(
      map(options => {
        const found = options.politenessConfigs.find(
          politenessConfig => politenessConfig.id === configObject.crawlConfig.politenessRef.id);
        return found ? found.meta.name : 'politenessConfig';
      }));
  }
}
