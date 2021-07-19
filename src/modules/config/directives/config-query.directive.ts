import {Directive, Inject, Input} from '@angular/core';
import {BASE_LIST, QueryDirective} from '../../../shared/directives';
import {ConfigQuery} from '../../../shared/func';
import {ConfigObject, Kind} from '../../../shared/models/config';
import {ConfigService} from '../../commons/services';
import {ListDataSource} from '../../../shared/models';
import {ConfigListComponent} from '../components';
import {filter, switchMap, takeUntil} from 'rxjs/operators';


@Directive({
  selector: '[appQueryConfigObject]'
})
export class ConfigQueryDirective extends QueryDirective<ConfigQuery, ConfigObject> {
  @Input()
  count: number;

  constructor(private configService: ConfigService,
              @Inject(BASE_LIST) private baseList: ConfigListComponent) {
    super(configService, baseList, new ListDataSource<ConfigObject>());
  }
}
