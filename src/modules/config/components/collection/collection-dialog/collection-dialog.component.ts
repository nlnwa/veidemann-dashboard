import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CollectionDetailsComponent} from '..';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDialogComponent extends CollectionDetailsComponent implements OnInit {

  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<CollectionDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.rotationPolicies = this.data.options.rotationPolicies;
    this.subCollectionTypes = this.data.options.subCollectionTypes;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): ConfigObject {
    return this.prepareSave();
  }

}
