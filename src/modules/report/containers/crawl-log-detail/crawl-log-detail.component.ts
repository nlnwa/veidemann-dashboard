import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlLogService} from '../../services';
import {DetailComponent} from '../../directives/detail-component.directive';
import {CrawlLog} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-log-detail',
  templateUrl: './crawl-log-detail.component.html',
  styleUrls: ['./crawl-log-detail.component.css']
})
export class CrawlLogDetailComponent extends DetailComponent<CrawlLog> {

  constructor(protected route: ActivatedRoute,
              protected crawlLogService: CrawlLogService) {
    super(route, crawlLogService);
  }
}
