import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfigObject, Kind} from '../../../../commons/models';
import {RoleMappingDetailsComponent} from '../rolemapping-details/rolemapping-details.component';
import {CustomValidators} from '../../../../commons/validator';


@Component({
  templateUrl: './rolemapping-details-multi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingDetailsMultiComponent extends RoleMappingDetailsComponent {

  allSelected = false;

  constructor(protected fb: FormBuilder) {
    super(fb);
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
}
