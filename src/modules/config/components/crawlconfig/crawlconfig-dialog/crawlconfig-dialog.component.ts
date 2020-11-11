import {Component, Inject, OnInit} from '@angular/core';
import {CrawlConfigDetailsComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-crawlconfig-dialog',
  templateUrl: './crawlconfig-dialog.component.html',
  styleUrls: ['./crawlconfig-dialog.component.css']
})
export class CrawlConfigDialogComponent extends CrawlConfigDetailsComponent implements OnInit {

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<CrawlConfigDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.collections = this.data.options.collections;
    this.browserConfigs = this.data.options.browserConfigs;
    this.politenessConfigs = this.data.options.politenessConfigs;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): ConfigObject {
    return this.prepareSave();
  }
}
