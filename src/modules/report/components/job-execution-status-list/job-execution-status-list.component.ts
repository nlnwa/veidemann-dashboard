import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {JobExecutionState, JobExecutionStatus} from '../../../../shared/models';

@Component({
  selector: 'app-job-execution-status-list',
  templateUrl: './job-execution-status-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss', './job-execution-status-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobExecutionStatusListComponent extends BaseListComponent<JobExecutionStatus> {
  readonly JobExecutionState = JobExecutionState;

  @Input()
  multiSelect = false;

  @Input()
  sortActive = 'startTime';

  displayedColumns: string[] = ['jobId', 'state', 'startTime', 'endTime', 'extra', 'action'];
}
