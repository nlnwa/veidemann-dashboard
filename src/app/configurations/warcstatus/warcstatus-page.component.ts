import {Component, OnInit, ViewChild} from '@angular/core';
import {WarcStatusListComponent} from './warcstatus-list/warcstatus-list.component';
import {WarcStatusService} from './warcstatus.service';

@Component({
  selector: 'app-search',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span i18n="@@warcstatusListHeader" class="toolbar--title">
            <span style="margin-left: 0" *ngIf="numInvalid > 0">{{numInvalid}}</span> Ugyldige WARC-filer
          </span>
          <span class="fill-space"></span>
          <span style="color: rgba(0,0,0,0.3);">(Antall gyldige: {{numValid}})</span>
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
export class WarcStatusPageComponent implements OnInit {

  warcError;
  numValid;
  numInvalid;

  @ViewChild(WarcStatusListComponent) list: WarcStatusListComponent;

  constructor(private warcStatusService: WarcStatusService) {
  }

  ngOnInit() {
    this.warcStatusService.getNumberOfInvalidWarcs()
      .subscribe(invalidCount => {
        this.numInvalid = invalidCount;
      });

    this.warcStatusService.getNumberOfValidWarcs()
      .subscribe(validCount => {
        this.numValid = validCount;
      });
  }

  onSelectWarcStatus(warcError) {
    this.warcError = warcError;
  }
}
