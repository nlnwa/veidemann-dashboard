import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobExecutionState, JobExecutionStatus, Kind} from 'src/shared/models';

@Component({
    selector: 'app-job-execution-shortcuts',
    templateUrl: './job-execution-shortcuts.component.html',
    styleUrls: ['./job-execution-shortcuts.component.css'],
    standalone: false
})
export class JobExecutionShortcutsComponent {
  readonly Kind = Kind;
  readonly JobExecutionState = JobExecutionState;

  @Input() jobExecutionStatus: JobExecutionStatus;

  @Output()
  abortJobExecution = new EventEmitter<JobExecutionStatus>();

  constructor() {
  }

  onAbortJobExecution(jobExecutionStatus: JobExecutionStatus) {
    this.abortJobExecution.emit(jobExecutionStatus);
  }
}
