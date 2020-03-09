import {Component, OnInit, ViewChild} from '@angular/core';
import {WarcStatusListComponent} from '../components';
import {WarcStatusService} from '../services/warcstatus.service';

@Component({
  selector: 'app-search',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <mat-toolbar>
          <h1 i18n="@@warcstatusListHeader">
            <span style="margin-left: 0" *ngIf="numInvalid > 0">{{numInvalid}}</span> Invalid WARC files
          </h1>
          <span class="fill-space"></span>
          <span i18n= "@@warcStatusListHeaderValidFilesCounter" style="color: rgba(0,0,0,0.3);">(Valid files: {{numValid}})</span>
        </mat-toolbar>
        <app-warcstatus-list (rowClick)="onSelectWarcStatus($event)" (allErrors)="onAllErrors($event)"></app-warcstatus-list>
      </div>
      <app-warcstatus-summary *ngIf="!warcError" [allErrors]="allErrors"></app-warcstatus-summary>
      <app-warcstatus-details [warcError]="warcError"></app-warcstatus-details>
    </div>
  `,
  styleUrls: [],
  providers: [
    WarcStatusService
  ]
})
export class WarcStatusPageComponent implements OnInit {

  allErrors;
  warcError;
  numValid;
  numInvalid;

  @ViewChild(WarcStatusListComponent, { static: true }) list: WarcStatusListComponent;

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

  onAllErrors(warcErrors) {
    this.allErrors = warcErrors;
  }
}
