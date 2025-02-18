import {Component, Input, OnInit} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
    selector: 'app-crawlconfig-preview',
    templateUrl: './crawlconfig-preview.component.html',
    styleUrls: ['./crawlconfig-preview.component.css'],
    standalone: false
})
export class CrawlconfigPreviewComponent {
  @Input()
  configObject: ConfigObject;

  constructor() {
  }
}
