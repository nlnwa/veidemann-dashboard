import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';
import {CrawlHostGroupConfigDetailsComponent} from '..';

@Component({
    selector: 'app-crawlhostgroupconfig-dialog',
    templateUrl: './crawlhostgroupconfig-dialog.component.html',
    styleUrls: ['./crawlhostgroupconfig-dialog.component.css'],
    standalone: false
})
export class CrawlHostGroupConfigDialogComponent extends CrawlHostGroupConfigDetailsComponent implements OnInit {

  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<CrawlHostGroupConfigDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): ConfigObject {
    return this.prepareSave();
  }
}
