import {Directive, Inject} from '@angular/core';
import {BASE_LIST, LoaderDirective} from '../../../shared/directives';
import {CrawlLogQuery, CrawlLogService} from '../services';
import {BaseList, CrawlLog, ListDataSource} from '../../../shared/models';
import {map, switchMap, takeUntil} from 'rxjs/operators';


@Directive({
  selector: '[appQueryCrawlLog]'
})
export class QueryCrawlLogDirective extends LoaderDirective<CrawlLogQuery, CrawlLog> {
  constructor(protected service: CrawlLogService,
              @Inject(BASE_LIST) protected baseList: BaseList<CrawlLog>) {
    super(service, baseList, new ListDataSource<CrawlLog>());
  }

  onLoad(): void {
    super.onLoad();

    // fake counting
    this.query$.pipe(
      switchMap(query => this.dataSource.connect(null).pipe(
        map(dataSource => (query.pageIndex + 1) * query.pageSize + (dataSource.length % query.pageSize === 0 ? 1 : 0)))
      ),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(length => this.baseList.length = length);
  }
}
