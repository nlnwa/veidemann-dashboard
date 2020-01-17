import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {JobExecutionState, JobExecutionStatus, ExtraStatusCodes} from '../../../../shared/models/report';

@Component({
  selector: 'app-job-execution-status',
  templateUrl: './job-execution-status.component.html',
  styleUrls: ['./job-execution-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobExecutionStatusComponent {
  readonly JobExecutionState = JobExecutionState;
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input()
  jobExecutionStatus: JobExecutionStatus;

  displayedColumns: string[] = ['state', 'count'];

  getExecMap(executionStateMap: Map<string, number>) {
    const datasource = [];
    for (const [key, value] of executionStateMap) {
      datasource.push({key, value});
    }
    return datasource;
  }

}
