import {ChangeDetectionStrategy, Input} from '@angular/core';
import {RoleMapping} from '../../../commons/models/config.model';
import {Component, EventEmitter, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../commons/validator';


@Component({
  selector: 'app-rolemapping-details',
  templateUrl: './rolemapping-details.component.html',
  styleUrls: ['./rolemapping-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingDetailsComponent implements OnChanges {

  @Input()
  roleMapping: RoleMapping;
  @Input()
  roles: string[];

  @Output()
  save = new EventEmitter<RoleMapping>();
  @Output()
  update = new EventEmitter<RoleMapping>();
  @Output()
  delete = new EventEmitter<RoleMapping>();

  form: FormGroup;
  rolesList: any[];
  selectedType = '';

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get showSave(): boolean {
    return this.roleMapping && !this.roleMapping.id
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

  get role() {
    return this.form.get('role')
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.roleMapping) {
      this.form.reset();
      return;
    }
    if (changes.roles && changes.roles.currentValue) {
      this.rolesList = changes.roles.currentValue
    }
    if (this.roleMapping && this.rolesList) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.roleMapping);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      email: '',
      group: '',
      role: [[], [Validators.required, CustomValidators.nonEmpty]]
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.roleMapping.id,
      email: this.roleMapping.email,
      group: this.roleMapping.group,
      role: this.roleMapping.role,
    });
    this.setUserType();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSave(): RoleMapping {
    const formModel = this.form.value;
    if (this.selectedType === 'email') {
      return {
        id: this.roleMapping.id,
        email: formModel.email,
        role: formModel.role,
      };
    }
    if (this.selectedType === 'group') {
      return {
        id: this.roleMapping.id,
        group: formModel.group,
        role: formModel.role,
      }
    }
  }

  private setUserType() {
    const group = (Object(this.roleMapping).hasOwnProperty('group'));
    const email = (Object(this.roleMapping).hasOwnProperty('email'));

    if (email) {
      this.selectedType = 'email';
    }

    if (group) {
      this.selectedType = 'group';
    }

    if (!(group || email)) {
      this.selectedType = '';
    }
  }
}
