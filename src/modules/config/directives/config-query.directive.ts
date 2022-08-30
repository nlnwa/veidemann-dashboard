import {Directive, Inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BASE_LIST, LoaderDirective} from '../../../shared/directives';
import {ConfigQuery} from '../../../shared/func';
import {ConfigService} from '../../commons/services';
import {ConfigObject, ListDataSource} from '../../../shared/models';
import {ConfigListComponent} from '../components';


@Directive({
  selector: '[appQueryConfigObject]'
})
export class ConfigQueryDirective extends LoaderDirective<ConfigQuery, ConfigObject> implements OnChanges {
  @Input()
  count: number;

  constructor(private configService: ConfigService,
              @Inject(BASE_LIST) private baseList: ConfigListComponent) {
    super(configService, baseList, new ListDataSource<ConfigObject>());
  }

  protected onQuery(previous: ConfigQuery, current: ConfigQuery): void {
    if (shouldClearSelection(previous, current)) {
      this.list.clearSelection();
    }

    this.dataSource.clear();
    this.list.reset();
    this.subject.next(this.query);
  }
}

function shouldClearSelection(o1: ConfigQuery, o2: ConfigQuery): boolean {
  if (!o1 || !o2) {
    return false;
  }
  for (const k in o1) {
    switch (k) {
      case 'pageSize':
      case 'pageIndex':
      case 'direction':
      case 'active':
        continue;
      default:
        if (Array.isArray(o1[k])) {
          if (o1[k].every(l => o2[k].includes(l)) === false) {
            return true;
          }
        }
        if (o1[k] !== o2[k]) {
          return true;
        }
    }
  }
  return false;
}
