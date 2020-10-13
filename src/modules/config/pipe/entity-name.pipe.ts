import {Pipe, PipeTransform} from '@angular/core';
import {ConfigRef, Kind} from '../../../shared/models/config';
import {Observable} from 'rxjs';
import {ConfigService} from '../../commons/services';
import {first, map} from 'rxjs/operators';

@Pipe({
  name: 'getEntityName'
})
export class EntityNamePipe implements PipeTransform {
  constructor(private configService: ConfigService) {
  }

  transform(id: string): Observable<string> {
    const entity = new ConfigRef({
      kind: Kind.CRAWLENTITY,
      id
    });
    return this.configService.get(entity).pipe(
      first(),
      map(configObject => configObject ? configObject.meta.name : '')
    );
  }
}
