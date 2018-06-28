import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CrawlScheduleConfig} from '../../../commons/models/config.model';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list';


@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: [
    './schedule-list.component.css',
    '../../../commons/list/base-list/base-list.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ScheduleListComponent extends SelectionBaseListComponent<CrawlScheduleConfig> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}

