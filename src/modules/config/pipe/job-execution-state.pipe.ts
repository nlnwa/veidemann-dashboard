import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JobExecutionState, JobExecutionStatus} from '../../../shared/models/report';


@Pipe({
    name: 'jobState',
    standalone: false
})
export class JobExecutionStatePipe implements PipeTransform {
  transform(jobExecutionStatus: Observable<JobExecutionStatus>): Observable<string> {
    return jobExecutionStatus.pipe(
      map(status => status ? status.state : JobExecutionState.UNDEFINED),
      map(state => state === JobExecutionState.UNDEFINED ? '' : JobExecutionState[state])
    );
  }
}
