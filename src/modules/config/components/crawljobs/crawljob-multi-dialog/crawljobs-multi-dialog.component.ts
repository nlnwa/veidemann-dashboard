import {Component, Inject, OnInit} from '@angular/core';
import {CrawlJobDetailsMultiComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-crawljobs-multi-dialog',
  templateUrl: './crawljobs-multi-dialog.component.html',
  styleUrls: ['./crawljobs-multi-dialog.component.css']
})
export class CrawlJobMultiDialogComponent extends CrawlJobDetailsMultiComponent implements OnInit {
  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<CrawlJobMultiDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.crawlScheduleConfigs = this.data.options.crawlScheduleConfigs;
    this.crawlConfigs = this.data.options.crawlConfigs;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }

}
