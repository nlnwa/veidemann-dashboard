import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlLogService} from '../../services';
import {DetailDirective} from '../../directives';
import {CrawlLog} from '../../../../shared/models/report';
import {Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './crawl-log-detail.component.html',
  styleUrls: ['./crawl-log-detail.component.css']
})
export class CrawlLogDetailComponent extends DetailDirective<CrawlLog> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected crawlLogService: CrawlLogService) {
    super(route, crawlLogService);
  }

  ngOnInit() {
    super.ngOnInit();

    const item$: Observable<CrawlLog> = this.query$.pipe(
      map(({id}) => ({id, watch: false})),
      mergeMap(query => this.service.get(query)),
    );

    this.item$ = item$;
  }
}
