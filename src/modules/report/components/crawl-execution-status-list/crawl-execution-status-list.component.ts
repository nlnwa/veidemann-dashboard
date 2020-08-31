import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {ConfigObject, CrawlExecutionState, crawlExecutionStates, CrawlExecutionStatus} from '../../../../shared/models';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crawl-execution-status-list',
  templateUrl: './crawl-execution-status-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss', './crawl-execution-status-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlExecutionStatusListComponent extends BaseListComponent<CrawlExecutionStatus> {
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly crawlExecutionStates = crawlExecutionStates;
  readonly crawlJobOptions: ConfigObject[];

  multiSelect = false;

  sortActive = 'startTime';

  displayedColumns: string[] = ['seedId', 'jobId', 'state', 'startTime', 'endTime', 'extra', 'action'];

  private isWatching = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute) {
    super();
  }
}
