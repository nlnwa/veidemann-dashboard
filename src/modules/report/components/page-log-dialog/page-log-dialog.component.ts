import {Component, Inject, OnInit} from '@angular/core';
import {PageLogStatusComponent} from '../page-log-status/page-log-status.component';
import {AppConfigService} from '../../../core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-page-log-dialog',
  templateUrl: './page-log-dialog.component.html',
  styleUrls: ['./page-log-dialog.component.css']
})
export class PageLogDialogComponent extends PageLogStatusComponent implements OnInit {

  constructor(public appConfigService: AppConfigService,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<PageLogDialogComponent>) {
    super(appConfigService);
    this.pageLog = this.data.pagelog;
  }

  ngOnInit(): void {
  }

}
