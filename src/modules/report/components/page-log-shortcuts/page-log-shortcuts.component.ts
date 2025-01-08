import {Component, Input, OnInit} from '@angular/core';
import {PageLog} from '../../../../shared/models';

@Component({
    selector: 'app-page-log-shortcuts',
    templateUrl: './page-log-shortcuts.component.html',
    styleUrls: ['./page-log-shortcuts.component.css'],
    standalone: false
})
export class PageLogShortcutsComponent {

  @Input() pageLog: PageLog;

  constructor() {
  }
}
