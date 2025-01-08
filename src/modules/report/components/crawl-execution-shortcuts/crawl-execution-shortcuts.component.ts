import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus, Kind} from 'src/shared/models';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'app-crawl-execution-shortcuts',
    templateUrl: './crawl-execution-shortcuts.component.html',
    styleUrls: ['./crawl-execution-shortcuts.component.css'],
    standalone: false
})
export class CrawlExecutionShortcutsComponent {
  readonly Kind = Kind;

  private reload$: Observable<void>;
  private reload: Subject<void>;

  @Input()
  crawlExecutionStatus: CrawlExecutionStatus;

  @Output()
  abortCrawlExecution = new EventEmitter<CrawlExecutionStatus>();

  constructor() {
    this.reload = new Subject<void>();
    this.reload$ = this.reload.asObservable();
  }

  onAbortCrawlExecution(crawlExecutionStatus: CrawlExecutionStatus) {
    this.abortCrawlExecution.emit(crawlExecutionStatus);
  }

  canAbort(state: CrawlExecutionState) {
    return !CrawlExecutionStatus.DONE_STATES.includes(state);
  }
}
