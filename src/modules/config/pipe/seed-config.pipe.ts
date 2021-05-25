import {Pipe, PipeTransform} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigObject, ConfigRef, EventObject, Kind} from '../../../shared/models';
import {Observable} from 'rxjs';
import {ConfigService} from '../../commons/services';

@Pipe({
  name: 'getSeedConfig'
})
export class SeedConfigPipe implements PipeTransform {

  constructor(private route: ActivatedRoute, private configService: ConfigService) {
  }

  transform(eventObject: EventObject): Observable<ConfigObject> {
    const seedId = eventObject.dataList.find(eventData => eventData.key === 'SeedId').value;
    return this.configService.get(new ConfigRef({kind: Kind.SEED, id: seedId}));
  }
}
