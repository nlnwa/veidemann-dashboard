import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../../../shared/validation';
import {ConfigObject, Kind, Meta, Role, RoleMapping} from '../../../../../shared/models';


@Component({
  selector: 'app-rolemapping-details',
  templateUrl: './rolemapping-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingDetailsComponent implements OnChanges {
  readonly Role = Role;

  @Input()
  configObject: ConfigObject;

  @Input()
  roles: Role[] = [];

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();

  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;

  selectedType = '';

  constructor(protected fb: FormBuilder) {
    this.createForm();
  }

  get showSave(): boolean {
    return this.configObject && !this.configObject.id;
  }

  get canSave(): boolean {
    return this.form.valid;
  }

  get canUpdate() {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert() {
    return this.form.dirty;
  }

  get email() {
    return this.form.get('email');
  }

  get group() {
    return this.form.get('group');
  }

  get roleList() {
    return this.form.get('roleList');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject) {
      if (!this.configObject) {
        this.form.reset();
      } else {
        this.updateForm();
      }
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  protected createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      email: '',
      group: '',
      roleList: [[], [Validators.required, CustomValidators.nonEmpty]]
    });
  }

  protected updateForm() {
    this.form.patchValue({
      id: this.configObject.id,
      email: this.configObject.roleMapping.email,
      group: this.configObject.roleMapping.group,
      roleList: this.configObject.roleMapping.roleList,
    });
    this.setUserType();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.ROLEMAPPING});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const roleMapping = new RoleMapping();
    roleMapping.roleList = formModel.roleList;
    if (this.selectedType === 'email') {
      roleMapping.email = formModel.email;
      roleMapping.group = null;
    }
    if (this.selectedType === 'group') {
      roleMapping.group = formModel.group;
      roleMapping.email = null;
    }
    if (this.selectedType === '') {
      roleMapping.group = '';
      roleMapping.email = '';
    }

    configObject.meta = new Meta({name: 'roleMapping'});
    configObject.roleMapping = roleMapping;
    return configObject;
  }

  protected setUserType() {
    const group = this.configObject.roleMapping.hasOwnProperty('group') && this.configObject.roleMapping.group !== '';
    const email = this.configObject.roleMapping.hasOwnProperty('email') && this.configObject.roleMapping.email !== '';

    if (email) {
      this.selectedType = 'email';
    }

    if (group) {
      this.selectedType = 'group';
    }

    if (!group && !email) {
      this.selectedType = '';
    }
  }
}
