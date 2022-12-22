import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {EntityDetailsComponent} from '..';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-entity-dialog',
  templateUrl: './entity-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityDialogComponent extends EntityDetailsComponent implements OnInit {
  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<EntityDialogComponent>) {
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
