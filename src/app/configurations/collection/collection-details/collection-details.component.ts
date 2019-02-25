import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Collection, ConfigObject, Kind, Meta} from '../../../commons/models';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../commons/validator/patterns';
import {RotationPolicy} from '../../../commons/models/collection/collection.model';
import {SubCollection, SubCollectionType} from '../../../commons/models/collection/subcollection.model';

@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css']
})
export class CollectionDetailsComponent implements OnChanges, OnInit {

  @Input()
  set data (show) {
    this.shouldShow = show;
  }

  @Input()
  configObject: ConfigObject;

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;
  shouldShow = true;
  rotationPolicies: RotationPolicy[] = [];
  subCollectionTypes: SubCollectionType[] = [];

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return (this.configObject && !this.configObject.id);
  }

  get canSave() {
    return this.form.valid;
  }

  get canUpdate() {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert() {
    return this.form.dirty;
  }

  get fileSize() {
    return this.form.get('fileSize');
  }

  get subCollectionControlArray() {
    return <FormArray>this.form.get('subCollectionsList');
  }

  ngOnInit() {
    for (const policy in RotationPolicy) {
      if (isNaN(Number(policy))) {
        this.rotationPolicies.push(policy as any as RotationPolicy);
      }
    }

    for (const type in SubCollectionType) {
      if (isNaN(Number(type))) {
        this.subCollectionTypes.push(type as any as SubCollectionType);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject && !changes.configObject.currentValue) {
      this.form.reset();
      return;
    }

    if (this.configObject) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate() {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert(): void {
    this.updateForm();
  }

  onAddSubCollection() {
    this.subCollectionControlArray.push(this.initSubCollection());
  }

  onRemoveSubCollection(index: number) {
    this.subCollectionControlArray.removeAt(index);
    this.form.markAsDirty();
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      collectionDedupPolicy: '',
      fileRotationPolicy: '',
      compress: '',
      fileSize: ['', Validators.pattern(NUMBER_OR_EMPTY_STRING)],
      subCollectionsList: this.fb.array([]),
      meta: new Meta()
    });
  }

  updateForm(): void {

    const subCollectionsFG: FormGroup[] = this.configObject.collection.subCollectionsList
      .map(subCollectionsList => this.fb.group(subCollectionsList));

    const subCollectionsFGArray: FormArray = this.fb.array(subCollectionsFG);
    if (this.form.disabled) {
      subCollectionsFGArray.disable();
    }

    this.form.patchValue({
      id: this.configObject.id,
      meta: this.configObject.meta,
      collectionDedupPolicy: this.configObject.collection.collectionDedupPolicy || RotationPolicy.NONE,
      fileRotationPolicy: this.configObject.collection.fileRotationPolicy || RotationPolicy.NONE,
      compress: this.configObject.collection.compress,
      fileSize: this.configObject.collection.fileSize || '',
    });
    this.form.setControl('subCollectionsList', subCollectionsFGArray);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.COLLECTION});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const collection = new Collection();
    collection.collectionDedupPolicy = formModel.collectionDedupPolicy;
    collection.fileRotationPolicy = formModel.fileRotationPolicy;
    collection.compress = formModel.compress;
    collection.fileSize = parseInt(formModel.fileSize, 10) || 0;
    collection.subCollectionsList = formModel.subCollectionsList.map(sub => new SubCollection(sub));

    configObject.meta = formModel.meta;
    configObject.collection = collection;

    return configObject;
}

private initSubCollection() {
    return this.fb.group({
      name: [''],
      type: ['']
    });
}

}
