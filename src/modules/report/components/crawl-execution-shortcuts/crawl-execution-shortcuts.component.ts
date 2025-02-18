import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus, Kind} from 'src/shared/models';
import {Observable, Subject} from 'rxjs';
import {AbilityService} from '@casl/angular';

@Component({
    selector: 'app-crawl-execution-shortcuts',
    templateUrl: './crawl-execution-shortcuts.component.html',
    styleUrls: ['./crawl-execution-shortcuts.component.css'],
    standalone: false
})
export class CrawlExecutionShortcutsComponent {
  readonly Kind = Kind;
  readonly ability$: Observable<any>;

  private reload$: Observable<void>;
  private reload: Subject<void>;

  @Input()
  crawlExecutionStatus: CrawlExecutionStatus;

  @Output()
  abortCrawlExecution = new EventEmitter<CrawlExecutionStatus>();

  constructor(private abilityService: AbilityService<any>) {
    this.reload = new Subject<void>();
    this.reload$ = this.reload.asObservable();
    this.ability$ = this.abilityService.ability$;
  }

  onAbortCrawlExecution(crawlExecutionStatus: CrawlExecutionStatus) {
    this.abortCrawlExecution.emit(crawlExecutionStatus);
  }

  canAbort(state: CrawlExecutionState) {
    return !CrawlExecutionStatus.DONE_STATES.includes(state);
  }
}
