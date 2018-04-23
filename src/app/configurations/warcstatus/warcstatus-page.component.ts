import {Component, ViewChild} from '@angular/core';
import {WarcStatusListComponent} from './warcstatus-list/warcstatus-list.component';

@Component({
  selector: 'app-search',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span i18n="@@warcstatusListHeader" class="toolbar--title">Ugyldige WARC-filer</span>
        </app-toolbar>
        <app-warcstatus-list (rowClick)="onSelectWarcStatus($event)"></app-warcstatus-list>
      </div>
      <app-warcstatus-details
      [warcError]="warcError"
      *ngIf="warcError"></app-warcstatus-details>

    </div>
  `,
  styleUrls: [],
})
export class WarcStatusPageComponent {

  warcError;

  @ViewChild(WarcStatusListComponent) list: WarcStatusListComponent;

  constructor() {}

  onSelectWarcStatus(warcError) {
    this.warcError = warcError;
  }
}
