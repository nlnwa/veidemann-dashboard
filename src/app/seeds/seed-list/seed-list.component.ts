import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable} from '@angular/core';
import {BaseListComponent, ListDatabase, ListDataSource} from '../../commons/list/';

@Injectable()
export class SeedDatabase extends ListDatabase {}

@Component({
  selector: 'app-seed-list',
  templateUrl: './seed-list.component.html',
  styleUrls: ['../../commons/list/base-list/base-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedListComponent extends BaseListComponent {
  constructor(private database: SeedDatabase,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
    this.displayedColumns = ['name'];
    this.dataSource = new ListDataSource(database);
  }
}
