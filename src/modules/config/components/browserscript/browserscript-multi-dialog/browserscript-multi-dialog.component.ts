import {Component, Inject, OnInit} from '@angular/core';
import {BrowserScriptDetailsMultiComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-browserscript-multi-dialog',
  templateUrl: './browserscript-multi-dialog.component.html',
  styleUrls: ['./browserscript-multi-dialog.component.css']
})
export class BrowserScriptMultiDialogComponent extends BrowserScriptDetailsMultiComponent implements OnInit {
  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<BrowserScriptMultiDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }
}
