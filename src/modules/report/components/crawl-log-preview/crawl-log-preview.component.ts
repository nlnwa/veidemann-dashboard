import {Component, Input, OnInit} from '@angular/core';
import {CrawlLog} from '../../../../shared/models/report';
import {timeToDuration} from '../../../../shared/func';

@Component({
  selector: 'app-crawl-log-preview',
  templateUrl: './crawl-log-preview.component.html',
  styleUrls: ['./crawl-log-preview.component.css']
})
export class CrawlLogPreviewComponent implements OnInit {
  @Input()
  crawlLog: CrawlLog;

  constructor() {
  }

  ngOnInit(): void {
  }
}
