import {ChangeDetectionStrategy, Input} from '@angular/core';
import {RoleMapping} from '../../commons/models/config.model';
import {Component, EventEmitter, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


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
  roles: any[];

  @Output()
  save = new EventEmitter<RoleMapping>();
  @Output()
  update = new EventEmitter<RoleMapping>();
  @Output()
  delete = new EventEmitter<RoleMapping>();

  form: FormGroup;
  rolesList: any[];

  selectedRoles: any[];
  roleDropdownSettings = {
    singleSelection: false,
    text: 'Velg rolle',
  };


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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.roleMapping.currentValue) {
      if (!this.roleMapping) {
        this.form.reset();
      }
    }
    if (changes.roles && changes.roles.currentValue) {
      this.rolesList = changes.roles.currentValue.map((role, currentIndex) =>
        ({
          id: currentIndex,
          itemName: role,
        }));
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
      email: {value: ''},
      group: {value: ''},
      role: this.fb.array([]),
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.roleMapping.id,
      email: this.roleMapping.email,
      group: this.roleMapping.group,
      role: this.roleMapping.role
    });
    this.setSelectedDropdown();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSave(): RoleMapping {
    const formModel = this.form.value;
    return {
      id: this.roleMapping.id,
      email: formModel.email,
      group: formModel.group,
      role: formModel.role.length > 0 ? formModel.role[0].itemName : ''
    };
  }

  private setSelectedDropdown() {
    this.selectedRoles = this.rolesList.reduce((acc, curr) => {
      if (this.roleMapping.role === curr.itemName) {
        acc.push(curr);
      }
      return acc;
    }, []);
  }
}
