import {Directive, Inject} from '@angular/core';
import {BASE_LIST} from '../../../shared/directives';
import {CrawlExecutionService, CrawlExecutionStatusQuery} from '../services';
import {CrawlExecutionStatus} from '../../../shared/models/report';
import {BaseList, ListDataSource} from '../../../shared/models';
import {LoadWithPageLengthDirective} from './load-with-page-length.directive';


@Directive({
  selector: '[appCrawlExecutionStatusLoader]'
})
export class CrawlExecutionStatusLoaderDirective extends LoadWithPageLengthDirective<CrawlExecutionStatusQuery, CrawlExecutionStatus> {

  constructor(protected service: CrawlExecutionService,
              @Inject(BASE_LIST) protected baseList: BaseList<CrawlExecutionStatus>,
              protected dataSource: ListDataSource<CrawlExecutionStatus>) {
    super(service, baseList, dataSource);
  }

  protected onQuery(previous: CrawlExecutionStatusQuery, current: CrawlExecutionStatusQuery) {
    if (this.query.watch) {
      this.subject.next(this.query);
    } else {
      super.onQuery(previous, current);
    }
  }
}
