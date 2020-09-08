import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components';
import {
  CrawlExecutionState,
  crawlExecutionStates,
  CrawlExecutionStatus,
  ListDataSource
} from '../../../../shared/models';
import {BASE_LIST} from '../../../../shared/directives';

@Component({
  selector: 'app-crawl-execution-status-list',
  templateUrl: './crawl-execution-status-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ListDataSource,
    {
      provide: BASE_LIST,
      useExisting: forwardRef(() => CrawlExecutionStatusListComponent)
    }
  ]
})
export class CrawlExecutionStatusListComponent extends BaseListComponent<CrawlExecutionStatus> {
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly crawlExecutionStates = crawlExecutionStates;

  multiSelect = false;

  @Input()
  sortActive = 'startTime';

  displayedColumns: string[] = ['seedId', 'jobId', 'state', 'startTime', 'endTime', 'extra', 'action'];

  constructor() {
    super();
  }
}
