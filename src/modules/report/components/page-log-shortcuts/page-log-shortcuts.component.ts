import {Component, Input, OnInit} from '@angular/core';
import {PageLog} from '../../../../shared/models';

@Component({
  selector: 'app-page-log-shortcuts',
  templateUrl: './page-log-shortcuts.component.html',
  styleUrls: ['./page-log-shortcuts.component.css']
})
export class PageLogShortcutsComponent implements OnInit {

  @Input() pageLog: PageLog;

  constructor() {
  }

  ngOnInit(): void {
  }

}
