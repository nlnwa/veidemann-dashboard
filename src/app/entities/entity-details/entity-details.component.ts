import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EntityService} from '../entity.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {DateTime} from '../../commons/';
import {SeedService} from '../../seeds/seeds.service';
import {Entity, Label, Seed} from '../../commons/models/config.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css']
})
export class EntityDetailsComponent {

  @Input()
  set entity(entity: Entity) {
    if (entity) {
      this._entity = entity;
      this.seedService.search({entity_id: this.entity.id})
        .map(reply => reply.value)
        .subscribe(seeds => {
          this.seeds.next(seeds);
        });
      setTimeout(() => this.updateForm(entity), 0);
    } else {
      this._entity = null;
    }
  }

  get form(): FormGroup {
    return this._form;
  }

  set form(form: FormGroup) {
    this._form = form;
  }

  get entity(): Entity {
    return this._entity;
  }

  @Output()
  selectSeed = new EventEmitter<Seed>();

  @Output()
  createSeed = new EventEmitter<string>();

  private _entity: Entity;

  _form: FormGroup;
  seeds: BehaviorSubject<Seed[]> = new BehaviorSubject<Seed[]>([]);

  constructor(private entityService: EntityService,
              private seedService: SeedService,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
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

  updateForm(entity: Entity) {
    this.form.patchValue({
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
        label: entity.meta.label,
      },
    });
    this.form.markAsPristine();
  }

  private prepareSaveEntity(formModel: Entity): Entity {
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

  onSave() {
    const entity = this.prepareSaveEntity(this.form.value);
    this.entityService.create(entity)
      .subscribe((newEntity: Entity) => {
        this.entity = newEntity;
      });
    this.mdSnackBar.open('Lagret');
  };


  onUpdate() {
    const entity = this.prepareSaveEntity(this.form.value);
    this.entityService.update(entity)
      .subscribe((updatedEntity: Entity) => {
        this.entity = updatedEntity;
      });
    this.mdSnackBar.open('Lagret');
  }

  onDelete(): void {
    this.entityService.delete(this.entity.id)
      .subscribe((deletedEntity) => {
        this.entity = deletedEntity;
        this.mdSnackBar.open('Slettet');
      });
  }

  onRevert() {
    this.updateForm(this.entity);
    this.mdSnackBar.open('Tilbakestilt');
  }


  onSelectSeed(seed: Seed) {
    this.selectSeed.emit(seed);
  }

  onCreateSeed() {
    this.createSeed.emit(this.entity.id);
  }

  addSeed(seed: Seed) {
    this.seeds
      .take(1)
      .subscribe((seeds) => {
        this.seeds.next([...seeds, seed]);
      });
  }

  removeSeed(seed: Seed) {
    this.seeds
      .take(1)
      .subscribe((seeds) => {
        this.seeds.next([...seeds.filter((s) => s.id !== seed.id)]);
      });
  }
}
