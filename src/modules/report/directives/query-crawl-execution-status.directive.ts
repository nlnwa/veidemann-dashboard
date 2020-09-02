import {Directive, Host, Inject, OnInit} from '@angular/core';
import {BASE_LIST} from '../../../shared/directives';
import {CrawlExecutionService, CrawlExecutionStatusQuery} from '../services';
import {CrawlExecutionStatus} from '../../../shared/models/report';
import {BaseList, ListDataSource} from '../../../shared/models';
import {QueryWithPageLengthDirective} from './query-with-page-length.directive';
import {tap} from 'rxjs/operators';


@Directive({
  selector: '[appQueryCrawlExecutionStatus]'
})
export class QueryCrawlExecutionStatusDirective extends QueryWithPageLengthDirective<CrawlExecutionStatusQuery, CrawlExecutionStatus>
  implements OnInit {

  constructor(protected service: CrawlExecutionService,
              @Inject(BASE_LIST) protected baseList: BaseList<CrawlExecutionStatus>,
              protected dataSource: ListDataSource<CrawlExecutionStatus>) {
    super(service, baseList, dataSource);
  }

  ngOnInit() {
    // this.query$ = this.query$.pipe(
    //   tap(query => {
    //     if (query.pageSize) {
    //       this.dataSource.length = query.pageSize;
    //     }
    //     if (!query.watch) {
    //       this.dataSource.clear();
    //     }
    //   })
    // );
    super.ngOnInit();
  }
}
