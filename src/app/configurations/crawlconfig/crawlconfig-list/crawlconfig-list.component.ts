import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent, ListDataSource} from '../../../commons/list/';

@Component({
  selector: 'app-crawlconfig-list',
  templateUrl: './crawlconfig-list.component.html',
  styleUrls: ['../../../commons/list/base-list/base-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlConfigListComponent extends BaseListComponent {
  constructor(public dataSource: ListDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(dataSource, changeDetectorRef);
    this.displayedColumns = ['name', 'description'];
  }
}
