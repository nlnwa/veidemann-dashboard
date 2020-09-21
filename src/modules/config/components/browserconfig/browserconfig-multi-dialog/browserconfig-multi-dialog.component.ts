import {Component, Inject, OnInit} from '@angular/core';
import {BrowserConfigDetailsMultiComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-browserconfig-multi-dialog',
  templateUrl: './browserconfig-multi-dialog.component.html',
  styleUrls: ['./browserconfig-multi-dialog.component.css']
})
export class BrowserConfigMultiDialogComponent extends BrowserConfigDetailsMultiComponent implements OnInit {

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<BrowserConfigMultiDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.browserScripts = this.data.options.browserScripts;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }

}
