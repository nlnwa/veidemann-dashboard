import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {JobExecutionState, JobExecutionStatus, ListDataSource} from '../../../../shared/models';
import {BASE_LIST} from '../../../../shared/directives';

@Component({
  selector: 'app-job-execution-status-list',
  templateUrl: './job-execution-status-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss', './job-execution-status-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ListDataSource,
    {
      provide: BASE_LIST,
      useExisting: forwardRef(() => JobExecutionStatusListComponent)
    }
  ]
})
export class JobExecutionStatusListComponent extends BaseListComponent<JobExecutionStatus> {
  readonly JobExecutionState = JobExecutionState;

  @Input()
  multiSelect = false;

  @Input()
  sortActive = 'startTime';

  displayedColumns: string[] = ['jobId', 'state', 'startTime', 'endTime', 'extra', 'action'];

  constructor() {
    super();
  }
}
