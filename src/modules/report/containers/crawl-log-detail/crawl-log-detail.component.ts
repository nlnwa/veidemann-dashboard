import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlLogService} from '../../services';
import {DetailDirective} from '../../directives';
import {CrawlLog} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './crawl-log-detail.component.html',
  styleUrls: ['./crawl-log-detail.component.css']
})
export class CrawlLogDetailComponent extends DetailDirective<CrawlLog> {

  constructor(protected route: ActivatedRoute,
              protected crawlLogService: CrawlLogService) {
    super(route, crawlLogService);
  }
}
