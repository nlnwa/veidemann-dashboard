import {Directive, Inject} from '@angular/core';
import {BASE_LIST, QueryDirective} from '../../../shared/directives';
import {CrawlLogQuery, CrawlLogService} from '../services';
import {CrawlLog} from '../../../shared/models/log';
import {BaseList, ListDataSource} from '../../../shared/models';
import {map, switchMap, takeUntil} from 'rxjs/operators';


@Directive({
  selector: '[appQueryCrawlLog]'
})
export class QueryCrawlLogDirective extends QueryDirective<CrawlLogQuery, CrawlLog> {
  constructor(protected service: CrawlLogService,
              @Inject(BASE_LIST) protected baseList: BaseList<CrawlLog>) {
    super(service, baseList, new ListDataSource<CrawlLog>());
  }

  onInit(): void {
    super.onInit();

    // fake counting
    this.query$.pipe(
      switchMap(query => this.dataSource.connect(null).pipe(
        map(dataSource => (query.pageIndex + 1) * query.pageSize + (dataSource.length % query.pageSize === 0 ? 1 : 0)))
      ),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(length => this.baseList.length = length);
  }
}
