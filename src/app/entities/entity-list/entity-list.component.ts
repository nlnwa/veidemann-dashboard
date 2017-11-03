import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable} from '@angular/core';
import {BaseListComponent, ListDatabase, ListDataSource} from '../../commons/list/';
import {Item} from '../../commons/list/list-database';
import {ResultType} from '../../search-service/search.service';

@Injectable()
export class EntityDatabase extends ListDatabase {}

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: [
    '../../commons/list/base-list/base-list.component.css',
    './entity-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent extends BaseListComponent {
  constructor(private database: EntityDatabase,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.displayedColumns = ['name', 'description', 'entityName', 'entityLabel', 'seedName', 'seedLabel'];
    this.dataSource = new ListDataSource(database);
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
