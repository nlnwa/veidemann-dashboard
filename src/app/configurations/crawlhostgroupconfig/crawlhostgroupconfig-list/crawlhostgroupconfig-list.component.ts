import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/list/base-list/base-list.component';
import {ListDataSource} from '../../../commons/list/list-datasource';

@Component({
  selector: 'app-crawlhostgroupconfig-list',
  templateUrl: './crawlhostgroupconfig-list.component.html',
  styleUrls: [
    './crawlhostgroupconfig-list.component.css',
    '../../../commons/list/base-list/base-list.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CrawlHostGroupConfigListComponent extends BaseListComponent {
  constructor(public dataSource: ListDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(dataSource, changeDetectorRef);
    this.displayedColumns = ['name', 'description'];
  }
}
