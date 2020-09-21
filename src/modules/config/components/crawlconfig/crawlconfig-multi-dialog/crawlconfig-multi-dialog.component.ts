import {Component, Inject, OnInit} from '@angular/core';
import {CrawlConfigDetailsMultiComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-crawlconfig-multi-dialog',
  templateUrl: './crawlconfig-multi-dialog.component.html',
  styleUrls: ['./crawlconfig-multi-dialog.component.css']
})
export class CrawlConfigMultiDialogComponent extends CrawlConfigDetailsMultiComponent implements OnInit {

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<CrawlConfigMultiDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.browserConfigs = this.data.options.browserConfigs;
    this.politenessConfigs = this.data.options.politenessConfigs;
    this.collections = this.data.options.collections;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }
}
