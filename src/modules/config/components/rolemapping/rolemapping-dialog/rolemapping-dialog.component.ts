import {Component, Inject, OnInit} from '@angular/core';
import {RoleMappingDetailsComponent} from '..';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
    selector: 'app-rolemapping-dialog',
    templateUrl: './rolemapping-dialog.component.html',
    styleUrls: ['./rolemapping-dialog.component.css'],
    standalone: false
})
export class RoleMappingDialogComponent extends RoleMappingDetailsComponent implements OnInit {

  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<RoleMappingDialogComponent>) {
    super(fb);
    this.createForm();
    this.configObject = this.data.configObject;
    this.roles = this.data.options.roles;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): ConfigObject {
    return this.prepareSave();
  }
}
