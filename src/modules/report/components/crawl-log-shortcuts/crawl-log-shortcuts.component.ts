import {Component, Input, OnInit} from '@angular/core';
import {CrawlLog} from '../../../../shared/models';

@Component({
  selector: 'app-crawl-log-shortcuts',
  templateUrl: './crawl-log-shortcuts.component.html',
  styleUrls: ['./crawl-log-shortcuts.component.css']
})
export class CrawlLogShortcutsComponent implements OnInit {

  @Input() crawlLog: CrawlLog;

  constructor() { }

  ngOnInit(): void {
  }

}
