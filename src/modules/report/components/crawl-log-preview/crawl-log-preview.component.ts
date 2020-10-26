import {Component, Input} from '@angular/core';
import {CrawlLog} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-log-preview',
  templateUrl: './crawl-log-preview.component.html',
  styleUrls: ['./crawl-log-preview.component.css']
})
export class CrawlLogPreviewComponent {
  @Input()
  crawlLog: CrawlLog;

  constructor() {
  }
}
