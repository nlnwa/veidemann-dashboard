import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobExecutionService} from '../../services';
import {DetailDirective} from '../../directives';
import {JobExecutionStatus} from '../../../../shared/models/report';
import {combineLatest, merge, Observable} from 'rxjs';
import {filter, map, switchMap, takeWhile} from 'rxjs/operators';
import {Detail} from '../../../../shared/func';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './job-execution-detail.component.html',
  styleUrls: ['./job-execution-detail.component.css']
})
export class JobExecutionDetailComponent extends DetailDirective<JobExecutionStatus> implements OnInit {

  protected query$: Observable<Detail>;

  constructor(protected route: ActivatedRoute,
              protected service: JobExecutionService) {
    super(route, service);
  }

  ngOnInit() {
    super.ngOnInit();

    const item$: Observable<JobExecutionStatus> = this.query$.pipe(
      map(({id}) => ({id, watch: false})),
      switchMap(query => this.service.get(query)),
    );

    const watchedItem$: Observable<JobExecutionStatus> = combineLatest([this.query$, item$]).pipe(
      filter(([query, item]) => query.watch && !JobExecutionStatus.DONE_STATES.includes(item.state)),
      switchMap(([query]) => this.service.get(query).pipe(
        takeWhile(item => query.watch || !JobExecutionStatus.DONE_STATES.includes((item.state)), true),
      )),
    );

    this.item$ = merge(item$, watchedItem$);
  }
}
