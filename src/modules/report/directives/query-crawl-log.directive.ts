import {Directive, Inject} from '@angular/core';
import {BASE_LIST, QueryDirective} from '../../../shared/directives';
import {CrawlLogQuery, CrawlLogService} from '../services';
import {CrawlLog} from '../../../shared/models/report';
import {BaseList, ListDataSource} from '../../../shared/models';


@Directive({
  selector: '[appQueryCrawlLog]'
})
export class QueryCrawlLogDirective extends QueryDirective<CrawlLogQuery, CrawlLog> {
  constructor(protected service: CrawlLogService,
              @Inject(BASE_LIST) protected baseList: BaseList<CrawlLog>) {
    super(service, baseList, new ListDataSource<CrawlLog>());
  }
}
