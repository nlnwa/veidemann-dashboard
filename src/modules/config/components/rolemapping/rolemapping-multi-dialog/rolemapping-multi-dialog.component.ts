import {Component, Inject, OnInit} from '@angular/core';
import {RoleMappingDetailsComponent} from '..';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {CustomValidators} from '../../../../../shared/validation';
import {ConfigObject, Kind} from '../../../../../shared/models/config';

@Component({
    selector: 'app-rolemapping-multi-dialog',
    templateUrl: './rolemapping-multi-dialog.component.html',
    styleUrls: ['./rolemapping-multi-dialog.component.css'],
    standalone: false
})
export class RoleMappingMultiDialogComponent extends RoleMappingDetailsComponent implements OnInit {

  allSelected = false;

  constructor(protected fb: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<RoleMappingMultiDialogComponent>) {
    super(fb);
    this.configObject = this.data.configObject;
    this.roles = this.data.options.roles;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  protected createForm() {
    this.form = this.fb.group({
      roleList: [[], [Validators.required, CustomValidators.nonEmpty]]
    });
  }

  protected updateForm() {
    this.form.patchValue({
      roleList: this.configObject.roleMapping.roleList,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  protected prepareSave(): any {
    const formModel = this.form.value;
    const pathList: string[] = [];

    const updateTemplate = new ConfigObject({kind: Kind.ROLEMAPPING});
    const roleMapping = updateTemplate.roleMapping;

    roleMapping.roleList = formModel.roleList;

    // TODO: compare array properly (not by reference)
    if (this.roleList.dirty && (this.allSelected || formModel.roleList !== this.configObject.roleMapping.roleList)) {
      roleMapping.roleList = formModel.roleList;
      pathList.push('roleMapping.role');
    }

    return {updateTemplate, pathList};
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }
}
