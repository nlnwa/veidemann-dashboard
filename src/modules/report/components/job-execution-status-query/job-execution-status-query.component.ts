import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {JobExecutionStatusQuery} from '../../services';
import {QueryComponent} from '../../../commons/components';
import {JobExecutionState, jobExecutionStates} from '../../../../shared/models/report';
import {ConfigObject} from '../../../../shared/models/config';
import {UntypedFormBuilder} from '@angular/forms';

@Component({
  selector: 'app-job-execution-status-query',
  templateUrl: './job-execution-status-query.component.html',
  styleUrls: ['./job-execution-status-query.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobExecutionStatusQueryComponent extends QueryComponent<JobExecutionStatusQuery> {
  readonly JobExecutionState = JobExecutionState;
  readonly jobExecutionStates = jobExecutionStates;

  @Input()
  crawlJobOptions: ConfigObject[];

  constructor(protected fb: UntypedFormBuilder) {
    super(fb);
  }

  protected createForm(): void {
    this.form = this.fb.group({
      stateList: null,
      jobId: '',
      startTimeFrom: '',
      startTimeTo: '',
      watch: {value: null, disabled: true},
    });
  }
}
