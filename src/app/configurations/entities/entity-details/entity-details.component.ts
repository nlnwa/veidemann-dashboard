import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Entity, Label} from '../../../commons/models/config.model';
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
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        created: {value: '', disabled: true},
        created_by: {value: '', disabled: true},
        last_modified: {value: '', disabled: true},
        last_modified_by: {value: '', disabled: true},
        label: [],
      }),
    });
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private updateForm() {
    const entity = this.entity;
    this.form.setValue({
      id: entity.id,
      meta: {
        name: entity.meta.name,
        description: entity.meta.description,
        created: new Date(entity.meta.created),
        created_by: entity.meta.created_by,
        last_modified: new Date(entity.meta.last_modified),
        last_modified_by: entity.meta.last_modified_by,
        label: entity.meta.label || [],
      },
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSaveEntity(): Entity {
    const formModel = this.form.value;
    return {
      id: this.entity.id,
      meta: {
        name: formModel.meta.name,
        description: formModel.meta.description,
        // created: '',
        // created_by: '',
        // last_modified: null,
        // last_modified_by: '',
        label: formModel.meta.label.map((label: Label) => ({...label})),
      }
    };
  }
}
