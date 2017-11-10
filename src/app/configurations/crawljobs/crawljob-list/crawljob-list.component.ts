import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/list/base-list/base-list.component';
import {ListDataSource} from '../../../commons/list/list-datasource';


@Component({
  selector: 'app-crawljob-list',
  templateUrl: './crawljob-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './crawljob-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlJobListComponent extends BaseListComponent {
  constructor(public dataSource: ListDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(dataSource, changeDetectorRef);
    this.displayedColumns = ['name', 'description'];
  }
}
