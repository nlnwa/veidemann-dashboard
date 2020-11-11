import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobExecutionService} from '../../services';
import {DetailDirective} from '../../directives';
import {JobExecutionStatus} from '../../../../shared/models/report';
import {combineLatest, merge, Observable} from 'rxjs';
import {filter, map, mergeMap, switchMap, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './job-execution-detail.component.html',
  styleUrls: ['./job-execution-detail.component.css']
})
export class JobExecutionDetailComponent extends DetailDirective<JobExecutionStatus> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected service: JobExecutionService) {
    super(route, service);
  }

  ngOnInit() {
    super.ngOnInit();

    const item$: Observable<JobExecutionStatus> = this.query$.pipe(
      map(({id}) => ({id, watch: false})),
      mergeMap(query => this.service.get(query)),
    );

    const watchedItem$: Observable<JobExecutionStatus> = combineLatest([this.query$, item$]).pipe(
      // only watch if job execution isn't in one of the done states
      filter(([_, item]) => !JobExecutionStatus.DONE_STATES.includes(item.state)),
      switchMap(([query]) => this.service.get(query).pipe(
        takeWhile(item => !JobExecutionStatus.DONE_STATES.includes((item.state)), true),
      )),
    );

    this.item$ = merge(item$, watchedItem$);
  }
}
