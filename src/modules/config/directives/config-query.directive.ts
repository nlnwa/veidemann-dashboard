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

  protected onInit(): void {
    this.query$.pipe(
      switchMap(query => this.service.search(query).pipe(
        filter(c => {
          if (query.disabled !== null) {
            switch (c.kind) {
              case Kind.SEED:
                return query.disabled ? c.seed?.disabled : !c.seed?.disabled;
              case Kind.CRAWLJOB:
                return query.disabled ? c.crawlJob?.disabled : !c.crawlJob?.disabled;
            }
          } else {
            return true;
          }
        }),
      )),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(item => this.dataSource.add(item));
  }
}
