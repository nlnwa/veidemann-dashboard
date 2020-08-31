import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus, ExtraStatusCodes} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-execution-status',
  templateUrl: './crawl-execution-status.component.html',
  styleUrls: ['./crawl-execution-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlExecutionStatusComponent {
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input()
  crawlExecutionStatus: CrawlExecutionStatus;
}
