import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/list/base-list/base-list.component';
import {ListDataSource} from '../../../commons/list/list-datasource';

@Component({
  selector: 'app-browserconfig-list',
  templateUrl: './browserconfig-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './browserconfig-list.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BrowserConfigListComponent extends BaseListComponent {
  constructor(public dataSource: ListDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(dataSource, changeDetectorRef);
    this.displayedColumns = ['name', 'description'];
  }
}

