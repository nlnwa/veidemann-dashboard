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

  @Output()
  clear = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm(new Entity());
  }

  get showSave() {
    return this.entity ? !this.entity.id : false;
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity) {
      if (this.entity) {
        this.updateForm(this.entity);
      } else {
        this.form.reset();
      }
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
    this.updateForm(this.entity);
  }

  onClearClicked() {
    this.clear.emit();
  }

  private createForm(entity: Entity) {
    this.form = this.fb.group({
      id: {value: entity.id, disabled: true},
      meta: entity.meta,
    });
  }

  private updateForm(entity: Entity) {
    if (!this.canEdit) {
      this.form.disable();
    }
    this.form.setValue(entity);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSaveEntity(): Entity {
    return this.form.getRawValue();
  }
}
