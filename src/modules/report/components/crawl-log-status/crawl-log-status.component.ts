import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ExtraStatusCodes} from '../../../../shared/models/report';
import {CrawlLog} from '../../../../shared/models/log';

@Component({
  selector: 'app-crawl-log-status',
  templateUrl: './crawl-log-status.component.html',
  styleUrls: ['./crawl-log-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlLogStatusComponent {
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input()
  crawlLog: CrawlLog;

  constructor() {
  }
}
