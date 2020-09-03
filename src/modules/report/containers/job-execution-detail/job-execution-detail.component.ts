import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobExecutionService} from '../../services';
import {DetailDirective} from '../../directives';
import {JobExecutionState, JobExecutionStatus} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './job-execution-detail.component.html',
  styleUrls: ['./job-execution-detail.component.css']
})
export class JobExecutionDetailComponent extends DetailDirective<JobExecutionStatus> {

  DONE_STATES = [
    JobExecutionState.ABORTED_MANUAL,
    JobExecutionState.FAILED,
    JobExecutionState.FINISHED,
  ];

  constructor(protected route: ActivatedRoute,
              protected service: JobExecutionService) {
    super(route, service);
  }
}
