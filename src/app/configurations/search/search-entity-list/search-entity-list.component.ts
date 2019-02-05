import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ResultType} from '../search.service';
import {ConfigObject, CrawlEntity} from '../../../commons/models';
import {BaseListComponent} from '../../../commons/list';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-entity-list.component.html',
  styleUrls: [
    '../../../commons/list/selection-base-list/selection-base-list.css',
    './search-entity-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent extends BaseListComponent<CrawlEntity> {

  displayedColumns = ['select', 'name', 'description', 'entityName', 'entityLabel', 'seedName', 'seedLabel'];


  onRowClick(item: ConfigObject) {
    this.rowClick.emit(item);
    this.selectedRow = item.id;
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
