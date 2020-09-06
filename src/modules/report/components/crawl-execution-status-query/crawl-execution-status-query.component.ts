import {Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CrawlExecutionStatusQuery} from '../../services';
import {QueryComponent} from '../../../commons/components';
import {ConfigObject} from '../../../../shared/models/config';
import {CrawlExecutionState, crawlExecutionStates} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-execution-status-query',
  templateUrl: './crawl-execution-status-query.component.html',
  styleUrls: ['./crawl-execution-status-query.component.css']
})
export class CrawlExecutionStatusQueryComponent extends QueryComponent<CrawlExecutionStatusQuery> {
  readonly crawlExecutionStates = crawlExecutionStates;
  readonly CrawlExecutionState = CrawlExecutionState;

  @Input()
  crawlJobOptions: ConfigObject[];

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  onQuery(query: CrawlExecutionStatusQuery) {
    super.onQuery(query);
    // combineLatest([
    //     this.form.valueChanges.pipe(
    //       startWith({}),
    //       map(value => {
    //         const startTimeTo = value.startTimeTo && isValidDate(new Date(value.startTimeTo))
    //           ? new Date(value.startTimeTo).toISOString()
    //           : null;
    //         const startTimeFrom = value.startTimeFrom && isValidDate(new Date(value.startTimeFrom))
    //           ? new Date(value.startTimeFrom).toISOString()
    //           : null;
    //
    //         return {
    //           watch: value.watch,
    //           startTimeTo,
    //           startTimeFrom,
    //           hasError: value.hasError,
    //           stateList: value.stateList,
    //           jobId: value.jobId,
    //           seedId: value.seedId,
    //         } as CrawlExecutionStatusQuery;
    //       })
    //     ),
    //     this.sorter,
    //     this.pager
    //   ]
    // ).pipe(
    //   map(([q, sort, page]) => ({...q, sort: sort as Sort, page: page as Page}))
    // ).subscribe(query => this.queryChange.emit(query));
  }

  protected createForm(): void {
    this.form = this.fb.group({
      stateList: null,
      seedId: '',
      jobId: '',
      jobExecutionId: '',
      startTimeFrom: '',
      startTimeTo: '',
      hasError: null,
      watch: null,
    });
  }

  protected updateForm(): void {
    super.updateForm();
    /*

    if (this.query.sort) {
      this.sortDirection = this.query.sort.direction as SortDirection;
      this.sortActive = this.query.sort.active;
    }
    if (this.query.page) {
      this.pageIndex = this.query.page.pageIndex;
      this.pageSize = this.query.page.pageSize;
    }
    this.queryForm.patchValue(query, {emitEvent: false});
    this.queryForm.markAsPristine();
    this.queryForm.markAsUntouched();

     */
  }
}
