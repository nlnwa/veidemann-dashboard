import {Pipe, PipeTransform} from '@angular/core';
import {ControllerApiService} from '../../core/services';
import {Observable} from 'rxjs';
import {ExecutionId} from '../../../shared/models/controller/controller.model';
import {CrawlExecutionState, CrawlExecutionStatus} from '../../../shared/models';
import {first, map} from 'rxjs/operators';

@Pipe({
  name: 'getExecutionQueueCountPipe'
})
export class ExecutionQueueCountPipe implements PipeTransform {
  constructor(private controllerApiService: ControllerApiService) {
  }

  transform(crawlExecutionStatus: CrawlExecutionStatus): Observable<number> {
    const activeStates = [CrawlExecutionState.CREATED, CrawlExecutionState.FETCHING, CrawlExecutionState.SLEEPING];
    if (activeStates.includes(crawlExecutionStatus.state)) {
      const executionId = new ExecutionId({id: crawlExecutionStatus.id});
      return this.controllerApiService.queueCountForCrawlExecution(executionId).pipe(
        first(),
        map(countResponse => countResponse.count));
    }
  }
}
