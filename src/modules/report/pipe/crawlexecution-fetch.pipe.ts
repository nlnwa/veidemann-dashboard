import { Pipe, PipeTransform } from '@angular/core';
import {CrawlExecutionService} from '../services';
import {CrawlExecutionStatus} from '../../../shared/models';
import {Observable, of} from 'rxjs';

@Pipe({
  name: 'getLatestCrawlExecutionPipe'
})
export class CrawlExecutionFetchPipe implements PipeTransform {

  constructor(private crawlExecutionService: CrawlExecutionService) {
  }

  transform(execution: CrawlExecutionStatus): Observable<CrawlExecutionStatus> {
    if (!CrawlExecutionStatus.DONE_STATES.includes(execution.state)) {
      return this.crawlExecutionService.get({id: execution.id, watch: false});
    }
    return of (execution);
  }
}
