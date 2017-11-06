import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable} from '@angular/core';
import {BaseListComponent, ListDatabase, ListDataSource} from '../../commons/list/';

@Injectable()
export class EntityDatabase extends ListDatabase {}

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['../../commons/list/base-list/base-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityListComponent extends BaseListComponent {
  constructor(private database: EntityDatabase,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.displayedColumns = ['name', 'description'];
    this.dataSource = new ListDataSource(database);
  }
}
