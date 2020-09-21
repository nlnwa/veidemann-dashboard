import {Component, Inject, OnInit} from '@angular/core';
import {PolitenessConfigDetailsMultiComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-politenessconfig-multi-dialog',
  templateUrl: './politenessconfig-multi-dialog.component.html',
  styleUrls: ['./politenessconfig-multi-dialog.component.css']
})
export class PolitenessConfigMultiDialogComponent extends PolitenessConfigDetailsMultiComponent implements OnInit {

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<PolitenessConfigMultiDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.robotsPolicies = this.data.options.robotsPolicies;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }
}
