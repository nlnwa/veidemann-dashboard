import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Entity, Meta} from '../../../commons/models/config.model';
import {RoleService} from '../../../auth/role.service';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EntityDetailsComponent implements OnChanges {
  @Input()
  entity: Entity;

  @Output()
  save = new EventEmitter<Entity>();
  @Output()
  update = new EventEmitter<Entity>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<Entity>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get showSave() {
    return this.entity ? !this.entity.id : false;
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.entity) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSaveEntity());
  }

  onUpdate() {
    this.update.emit(this.prepareSaveEntity());
  }

  onDelete(): void {
    this.delete.emit(this.entity);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      meta: new Meta(),
    });
  }

  private updateForm() {
    const entity = this.entity;
    this.form.patchValue({
      id: entity.id,
      meta: this.entity.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private prepareSaveEntity(): Entity {
    const formModel = this.form.value;
    return {
      id: this.entity.id,
      meta: formModel.meta,
    };
  }
}
