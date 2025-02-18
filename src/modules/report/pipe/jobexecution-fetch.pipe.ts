import {Pipe, PipeTransform} from '@angular/core';
import {JobExecutionService} from '../services';
import {Observable, of} from 'rxjs';
import {JobExecutionStatus} from '../../../shared/models';

@Pipe({
    name: 'getLatestJobExecutionPipe',
    standalone: false
})
export class JobExecutionFetchPipe implements PipeTransform {

  constructor(private jobExecutionService: JobExecutionService) {
  }

  transform(execution: JobExecutionStatus): Observable<JobExecutionStatus> {
    if (!JobExecutionStatus.DONE_STATES.includes(execution.state)) {
      return this.jobExecutionService.get({id: execution.id, watch: false});
    }
    return of(execution);
  }
}
