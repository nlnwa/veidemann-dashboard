import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CrawlHostGroupConfig} from '../../../commons/models/config.model';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list';


@Component({
  selector: 'app-crawlhostgroupconfig-list',
  templateUrl: './crawlhostgroupconfig-list.component.html',
  styleUrls: [
    './crawlhostgroupconfig-list.component.css',
    '../../../commons/list/base-list/base-list.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlHostGroupConfigListComponent extends SelectionBaseListComponent<CrawlHostGroupConfig> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}
