import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlExecutionState, CrawlExecutionStatus} from '../../../../shared/models/report';
import {CrawlExecutionService} from '../../services';
import {DetailDirective} from '../../directives';
import {combineLatest, merge, Observable} from 'rxjs';
import {filter, map, mergeMap, switchMap, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-crawl-execution',
  templateUrl: './crawl-execution.component.html',
  styleUrls: ['./crawl-execution.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlExecutionDetailComponent extends DetailDirective<CrawlExecutionStatus> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected crawlExecutionService: CrawlExecutionService) {
    super(route, crawlExecutionService);
  }

  ngOnInit() {
    super.ngOnInit();

    const item$: Observable<CrawlExecutionStatus> = this.query$.pipe(
      map(({id}) => ({id, watch: false})),
      mergeMap(query => this.service.get(query)),
    );

    const watchedItem$: Observable<CrawlExecutionStatus> = combineLatest([this.query$, item$]).pipe(
      // only watch if job execution isn't in one of the done states
      filter(([_, item]) => !CrawlExecutionStatus.DONE_STATES.includes(item.state)),
      switchMap(([query]) => this.service.get(query).pipe(
        takeWhile(item => !CrawlExecutionStatus.DONE_STATES.includes((item.state)), true),
      )),
    );

    this.item$ = merge(item$, watchedItem$);
  }
}
