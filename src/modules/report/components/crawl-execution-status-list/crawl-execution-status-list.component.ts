import {Component, Input, OnInit} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {CrawlExecutionState, CrawlExecutionStatus} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-execution-status-list',
  templateUrl: './crawl-execution-status-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss', './crawl-execution-status-list.component.css']
})
export class CrawlExecutionStatusListComponent extends BaseListComponent<CrawlExecutionStatus> {
  readonly CrawlExecutionState = CrawlExecutionState;

  @Input()
  multiSelect = false;

  @Input()
  sortActive = 'createdTime';

  displayedColumns: string[] = ['seedId', 'jobId', 'state', 'createdTime', 'startTime', 'lastChangeTime', 'endTime', 'extra', 'action'];

  constructor() {
    super();
  }
}
