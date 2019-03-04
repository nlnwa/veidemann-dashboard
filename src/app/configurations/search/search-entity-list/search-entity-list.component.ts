import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {ResultType} from '../search.service';
import {ConfigObject} from '../../../commons/models';
import {BaseListComponent} from '../../../commons/list';
import {SearchDataService} from '../../shared/search-data.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-entity-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.css',
    './search-entity-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent extends BaseListComponent {

  displayedColumns = ['select', 'name', 'description', 'entityName', 'entityLabel', 'seedName', 'seedLabel'];

  constructor(@Optional() protected dataService: SearchDataService) {
    super(dataService);
  }

  isEntityName(item: ConfigObject): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.EntityName) > 0;
  }

  isEntityLabel(item: ConfigObject): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.EntityLabel) > 0;
  }

  isSeedName(item: ConfigObject): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.SeedName) > 0;
  }

  isSeedLabel(item: ConfigObject): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.SeedLabel) > 0;
  }
}
