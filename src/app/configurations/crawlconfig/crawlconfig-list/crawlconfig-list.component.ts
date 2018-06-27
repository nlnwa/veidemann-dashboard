import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list';
import {CrawlConfig} from '../../../commons/models/config.model';

@Component({
  selector: 'app-crawlconfig-list',
  templateUrl: './crawlconfig-list.component.html',
  styleUrls: ['../../../commons/list/base-list/base-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CrawlConfigListComponent extends SelectionBaseListComponent<CrawlConfig> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}
