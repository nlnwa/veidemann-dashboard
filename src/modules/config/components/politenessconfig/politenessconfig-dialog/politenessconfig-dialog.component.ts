import {Component, Inject, OnInit} from '@angular/core';
import {PolitenessConfigDetailsComponent} from '..';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-politenessconfig-dialog',
  templateUrl: './politenessconfig-dialog.component.html',
  styleUrls: ['./politenessconfig-dialog.component.css']
})
export class PolitenessConfigDialogComponent extends PolitenessConfigDetailsComponent implements OnInit {

  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<PolitenessConfigDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.robotsPolicies = this.data.options.robotsPolicies;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): ConfigObject {
    return this.prepareSave();
  }
}
