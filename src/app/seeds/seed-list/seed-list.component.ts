import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent, ListDataSource} from '../../commons/list/';

@Component({
  selector: 'app-seed-list',
  templateUrl: './seed-list.component.html',
  styleUrls: ['../../commons/list/base-list/base-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedListComponent extends BaseListComponent {
  constructor(public seedDataSource: ListDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(seedDataSource, changeDetectorRef);
    this.displayedColumns = ['name'];
  }
}
