import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable} from '@angular/core';
import {BaseListComponent, Item, ListDataSource} from '../../commons/list/';
import {ResultType} from '../../search-service/search.service';
import {SearchDatabase} from '../search-database';

@Injectable()
export class SearchDataSource extends ListDataSource {
  constructor(protected database: SearchDatabase) {
    super(database);
  }
}

@Component({
  selector: 'app-search-list',
  templateUrl: './search-entity-list.component.html',
  styleUrls: [
    '../../commons/list/base-list/base-list.component.css',
    './search-entity-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent extends BaseListComponent {
  constructor(public dataSource: SearchDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(dataSource, changeDetectorRef);
    this.displayedColumns = ['name', 'description', 'entityName', 'entityLabel', 'seedName', 'seedLabel'];
  }

  isEntityName(item: Item): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.EntityName) >= 1;
  }

  isEntityLabel(item: Item): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.EntityLabel) >= 1;
  }

  isSeedName(item: Item): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.SeedName) >= 1;
  }

  isSeedLabel(item: Item): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.SeedLabel) >= 1;
  }
}
