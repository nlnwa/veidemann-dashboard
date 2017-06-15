import {Component, Input, OnChanges} from '@angular/core';
import {Value, Meta, Label} from '../entity';
import { EntityService } from '../entity.service';
import {FormArray, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css']

})

export class EntityDetailsComponent implements OnChanges{
  @Input() entity: Value;

  entityForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(
    private fb: FormBuilder,
    private entityService: EntityService) {

    this.createForm();
    // this.logNameChange();

  }

  createForm() {
    this.entityForm = this.fb.group({
      id: '',
        meta: {
          name: '',
          description: '',
          created: '',
          created_by: '',
          last_modified: '',
          last_modified_by: '',
        }
    });
  }



  ngOnChanges() {
    this.entityForm.reset({
      id: this.entity.id,
      meta: {
        name: this.entity.meta.name,
        description: this.entity.meta.description,
        created: this.entity.meta.created,
        created_by: this.entity.meta.created_by,
        last_modified: this.entity.meta.last_modified,
        last_modified_by: this.entity.meta.last_modified_by,

      }
    });
    this.setLabels(this.entity.meta.labels);
  }



  get labels(): FormArray {
    return this.entityForm.get('labels') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: '',
      value: '',
    });
  }


  setLabels(labels: Label[]) {
    const labelFGs = labels.map(label => this.fb.group(label));
    const labelFormArray = this.fb.array(labelFGs);
    this.entityForm.setControl('labels', labelFormArray);
  }

  /*addLabel() {
    this.labels.push(this.fb.group(new Label()));
  }*/

  addLabel() {
    const control = <FormArray>this.entityForm.controls['labels'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.entityForm.controls['labels'];
    control.removeAt(i);
  }

  createEntity() {
    this.entityService.createEntity(this.entityForm.value).then((newEntity: Value) => {
      this.createHandler(newEntity);
    });

  }


  updateEntity(entity: Value): void {
    this.entityService.updateEntity(this.entityForm.value).then((updatedEntity: Value) => {
      this.updateHandler(updatedEntity);
      //   this.ngOnChanges();
    });
  }

  deleteEntity(entityId: String): void {
    console.log(entityId);
    this.entityService.deleteEntity(entityId).then((deletedEntityId: String) => {
      this.deleteHandler(deletedEntityId);
    });
  }

}

