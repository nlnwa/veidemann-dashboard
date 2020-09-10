import {Component, Input} from '@angular/core';
import {JobExecutionState, JobExecutionStatus} from 'src/shared/models';
import {durationBetweenDates} from '../../../../shared/func';


@Component({
  selector: 'app-job-execution-preview',
  templateUrl: './job-execution-preview.component.html',
  styleUrls: ['./job-execution-preview.component.css']
})
export class JobExecutionPreviewComponent {
  readonly JobExecutionState = JobExecutionState;

  @Input()
  jobExecutionStatus: JobExecutionStatus;

  constructor() {
  }

  getDuration(startTime: string, endTime: string): string {
    return durationBetweenDates(startTime, endTime);
  }
}
