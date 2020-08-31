import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrawlExecutionStatus} from '../../../../shared/models/report';
import {CrawlExecutionService} from '../../services';
import {DetailComponent} from '../../directives/detail-component.directive';

@Component({
  selector: 'app-crawl-execution',
  templateUrl: './crawl-execution.component.html',
  styleUrls: ['./crawl-execution.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlExecutionDetailComponent extends DetailComponent<CrawlExecutionStatus> {

  constructor(protected route: ActivatedRoute,
              protected crawlExecutionService: CrawlExecutionService) {
    super(route, crawlExecutionService);
  }
}
