import {ChangeDetectionStrategy, Component, OnChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RoleService} from '../../../../core/services/auth';
import {ConfigObject, Kind} from '../../../../commons/models';
import {EntityDetailsComponent} from '../entity-details/entity-details.component';

@Component({
  templateUrl: './entity-details-multi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityDetailsMultiComponent extends EntityDetailsComponent implements OnChanges {

  allSelected = false;
  shouldAddLabel = undefined;

  constructor(protected fb: FormBuilder,
              protected roleService: RoleService) {
    super(fb, roleService);
  }

  get labelList() {
    return this.form.get('labelList');
  }

  get canUpdate(): boolean {
    return this.form.valid && this.shouldAddLabel !== undefined;
  }

  get canRevert(): boolean {
    return this.form.dirty || this.shouldAddLabel !== undefined;
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    if (shouldAdd !== undefined) {
      this.labelList.enable();
    }
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []}
    });
  }

  protected updateForm() {
    this.form.setValue({
      labelList: this.configObject.meta.labelList
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.labelList.disable();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): any {
    const pathList: string[] = [];

    const formModel = this.form.value;

    const updateTemplate = new ConfigObject({
      kind: Kind.CRAWLENTITY,
    });

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.meta.labelList = formModel.labelList;
      if (this.shouldAddLabel) {
        pathList.push('meta.label+');
      } else {
        pathList.push('meta.label-');
      }
    }

    return {updateTemplate, pathList};
  }
}
