import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobExecutionState, JobExecutionStatus, Kind} from 'src/shared/models';
import {Observable} from 'rxjs';
import {AbilityService} from '@casl/angular';

@Component({
    selector: 'app-job-execution-shortcuts',
    templateUrl: './job-execution-shortcuts.component.html',
    styleUrls: ['./job-execution-shortcuts.component.css'],
    standalone: false
})
export class JobExecutionShortcutsComponent {
  readonly Kind = Kind;
  readonly JobExecutionState = JobExecutionState;
  readonly ability$: Observable<any>;

  @Input() jobExecutionStatus: JobExecutionStatus;

  @Output()
  abortJobExecution = new EventEmitter<JobExecutionStatus>();

  constructor(private abilityService: AbilityService<any>) {
    this.ability$ = this.abilityService.ability$;
  }

  onAbortJobExecution(jobExecutionStatus: JobExecutionStatus) {
    this.abortJobExecution.emit(jobExecutionStatus);
  }
}
