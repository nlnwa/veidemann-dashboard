import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageLogService} from '../../services';
import {DetailDirective} from '../../directives';
import {PageLog} from '../../../../shared/models/log';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './page-log-detail.component.html',
  styleUrls: ['./page-log-detail.component.scss']
})
export class PageLogDetailComponent extends DetailDirective<PageLog> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected service: PageLogService) {
    super(route, service);
  }

  ngOnInit() {
    super.ngOnInit();

    const item$: Observable<PageLog> = this.query$.pipe(
      map(({id}) => ({id, watch: false})),
      mergeMap(query => this.service.get(query)),
    );

    this.item$ = item$;
  }
}
