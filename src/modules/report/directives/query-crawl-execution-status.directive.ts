import {Directive, Inject} from '@angular/core';
import {BASE_LIST} from '../../../shared/directives';
import {CrawlExecutionService, CrawlExecutionStatusQuery} from '../services';
import {CrawlExecutionStatus} from '../../../shared/models/report';
import {BaseList, ListDataSource} from '../../../shared/models';
import {QueryWithPageLengthDirective} from './query-with-page-length.directive';


@Directive({
    selector: '[appQueryCrawlExecutionStatus]',
    standalone: false
})
export class QueryCrawlExecutionStatusDirective extends QueryWithPageLengthDirective<CrawlExecutionStatusQuery, CrawlExecutionStatus> {

  constructor(protected service: CrawlExecutionService,
              @Inject(BASE_LIST) protected baseList: BaseList<CrawlExecutionStatus>,
              protected dataSource: ListDataSource<CrawlExecutionStatus>) {
    super(service, baseList, dataSource);
  }

  protected onQuery() {
    if (this.query.watch) {
      this.subject.next(this.query);
    } else {
      super.onQuery();
    }
  }
}
