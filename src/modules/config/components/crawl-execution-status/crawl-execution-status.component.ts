import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus} from '../../../../shared/models/report';

@Component({
    selector: 'app-config-crawl-execution-status',
    templateUrl: './crawl-execution-status.component.html',
    styleUrls: ['./crawl-execution-status.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CrawlExecutionStatusComponent {
  readonly CrawlExecutionState = CrawlExecutionState;

  @Input()
  crawlExecutionStatus: CrawlExecutionStatus;
}
