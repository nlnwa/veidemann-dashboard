import {Component, Input, OnChanges} from '@angular/core';
import {EntityService} from '../entity.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {DateTime} from '../../commons/';
import {ActivatedRoute, Router} from '@angular/router';
import {SeedService} from '../../seeds/seeds.service';
import {Entity, Label} from '../../commons/models/config.model';


@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css']
})
export class EntityDetailsComponent implements OnChanges {

  @Input()
  entity: Entity;

  entityForm: FormGroup;
  seedList = [];

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private entityService: EntityService,
              private seedService: SeedService,
              private route: ActivatedRoute,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder,
              private router: Router) {
    this.createForm();
    this.getParams();
  }

  createForm() {
    this.entityForm = this.fb.group({
      id: {value: '', disabled: true},
      seedcount: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
      }),
      seedlist: this.fb.array([]),
      label: this.fb.array([], Validators.minLength(1)),
    });
  }

  getParams() {
    this.route.paramMap.subscribe(params => {
      if (params.has('entity')) {
        this.entityService.get(params.get('entity')).subscribe(entity => {
          this.entity = entity[0];
          this.ngOnChanges();
        })
      } else {

      }
    });
  }

  ngOnChanges() {
    this.getSeedsOfEntity(this.entity.id);
    this.updateData(this.entity);
    setTimeout(() => {
      this.updateData(this.entity);
    }, 500);
  }

  getSeedsOfEntity(entityId) {
    if (entityId) {
      this.seedService.search({entity_id: entityId})
        .subscribe((reply) => {
          this.entityForm.controls['seedcount'].setValue(reply.count);
          reply.value.forEach((seed) => {
            this.seedList.push({
              name: seed.meta.name,
              id: seed.id,
              label: seed.meta.label,
              description: seed.meta.description
            })
          });
        });
    }
  }

  updateData(entity: Entity) {
    this.entityForm.controls['id'].setValue(entity.id);
    this.entityForm.controls['meta'].patchValue({
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
    });
    this.setSeedlist(this.seedList);
    this.setLabel(this.entity.meta.label);


  }

  createEntity(entity) {
    this.entity = this.prepareSaveEntity();
    this.entityService.create(this.entity)
      .subscribe((newEntity: Entity) => {
        this.createHandler(newEntity);
      });
    this.mdSnackBar.open('Lagret');
  };


  updateEntity(entity: Entity): void {
    this.entity = this.prepareSaveEntity();
    this.entityService.update(this.entity)
      .subscribe((updatedEntity: Entity) => {
        this.updateHandler(updatedEntity);
      });
    this.mdSnackBar.open('Lagret');
  }

  deleteEntity(): void {
    this.entityService.delete(this.entity.id)
      .subscribe((deletedEntity) => {
        this.deleteHandler(deletedEntity);
        if (deletedEntity === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  }


  setSeedlist(seedlist) {
    this.seedList = [];
    const seedlistFG = seedlist.map(sl => (this.fb.group(sl)));
    const seedlistFormArray = this.fb.array(seedlistFG);
    this.entityForm.setControl('seedlist', seedlistFormArray);
  }

  get seedlist(): FormArray {
    return this.entityForm.get('seedlist') as FormArray;
  };


  setLabel(label) {
    const labelFGs = label.map(l => (this.fb.group(l)));
    const labelFormArray = this.fb.array(labelFGs);
    this.entityForm.setControl('label', labelFormArray);
  }

  get label(): FormArray {
    return this.entityForm.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      value: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  addLabel() {
    const control = <FormArray>this.entityForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.entityForm.controls['label'];
    control.removeAt(i);
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }

  prepareSaveEntity(): Entity {

    const formModel = this.entityForm.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    return {
      id: this.entity.id,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        // created_by: '',
        // last_modified: null,
        // last_modified_by: '',
        label: labelsDeepCopy
      }
    };
  }

  goToSeed(seed_id) {
    this.router.navigate(['/seeds/', seed_id])
  }
}
