import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ResultType} from '../search.service';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list/selection-base-list';
import {Entity} from '../../../commons/models/config.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-entity-list.component.html',
  styleUrls: [
    '../../../commons/list/selection-base-list/selection-base-list.css',
    './search-entity-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent extends SelectionBaseListComponent<Entity> {
  displayedColumns = ['select', 'name', 'description', 'entityName', 'entityLabel', 'seedName', 'seedLabel'];


  onRowClick(item: Entity) {
    this.rowClick.emit(item);
    this.selectedRow = item.id;
  }

  isEntityName(item: Entity): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.EntityName) > 0;
  }

  isEntityLabel(item: Entity): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.EntityLabel) > 0;
  }

  isSeedName(item: Entity): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.SeedName) > 0;
  }

  isSeedLabel(item: Entity): boolean {
    /* tslint:disable:no-bitwise */
    return ((<any>item).type & ResultType.SeedLabel) > 0;
  }
}
