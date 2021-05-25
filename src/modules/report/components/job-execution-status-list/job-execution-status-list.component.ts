import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components';
import {JobExecutionState, JobExecutionStatus, ListDataSource} from '../../../../shared/models';
import {BASE_LIST} from '../../../../shared/directives';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-job-execution-status-list',
  templateUrl: './job-execution-status-list.component.html',
  styleUrls: [
    '../../../commons/components/base-list/base-list.scss',
    '../../../commons/components/base-list/base-list-odd-preview.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ListDataSource,
    {
      provide: BASE_LIST,
      useExisting: forwardRef(() => JobExecutionStatusListComponent)
    }
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JobExecutionStatusListComponent extends BaseListComponent<JobExecutionStatus> {
  readonly JobExecutionState = JobExecutionState;

  expandedJobExecutionStatus: JobExecutionStatus | null;

  @Input()
  multiSelect = false;

  @Input()
  sortActive = 'startTime';

  displayedColumns: string[] = ['jobId', 'state', 'desiredState', 'startTime', 'endTime', 'extra', 'action'];

  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
