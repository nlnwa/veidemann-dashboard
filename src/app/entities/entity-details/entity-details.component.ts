import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {EntityService} from '../entity.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateTime} from '../../commons/';
import {Entity, Label} from '../../commons/models/config.model';
import {SnackBarService} from '../../snack-bar-service/snack-bar.service';


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
  created = new EventEmitter<Entity>();
  @Output()
  updated = new EventEmitter<Entity>();
  @Output()
  deleted = new EventEmitter<Entity>();

  form: FormGroup;

  constructor(private entityService: EntityService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entity.currentValue) {
      this.updateForm();
    }
  }

  onSave() {
    const entity = this.prepareSaveEntity();
    this.entityService.create(entity)
      .subscribe((newEntity: Entity) => {
        this.entity = newEntity;
        this.updateForm();
        this.created.emit(newEntity);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdate() {
    const entity = this.prepareSaveEntity();
    this.entityService.update(entity)
      .subscribe((updatedEntity: Entity) => {
        this.entity = updatedEntity;
        this.updateForm();
        this.updated.emit(updatedEntity);
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDelete(): void {
    this.entityService.delete(this.entity.id)
      .subscribe((deletedEntity) => {
        this.deleted.emit(this.entity);
        this.entity = deletedEntity;
        this.form.reset();
        this.snackBarService.openSnackBar('Slettet');
      })

  }

  onRevert() {
    this.updateForm();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
        label: [],
      }),
    });
  }

  private updateForm() {
    const entity = this.entity;
    this.form.setValue({
      id: entity.id,
      meta: {
        name: entity.meta.name,
        description: entity.meta.description,
        created: {
          seconds: DateTime.convertFullTimestamp(entity.meta.created.seconds),
        },
        created_by: entity.meta.created_by,
        last_modified: {
          seconds: DateTime.convertFullTimestamp(entity.meta.last_modified.seconds),
        },
        last_modified_by: entity.meta.last_modified_by,
        label: [...entity.meta.label],
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
