import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JobExecutionState, JobExecutionStatus} from '../../commons/models/report';


@Pipe({
  name: 'jobState'
})
export class JobStatePipe implements PipeTransform {
  transform(jobExecutionStatus: Observable<JobExecutionStatus>): Observable<string> {
    return jobExecutionStatus.pipe(
      map(status => status ? status.state : JobExecutionState.UNDEFINED),
      map(state => JobExecutionState[state])
    );
  }
}
