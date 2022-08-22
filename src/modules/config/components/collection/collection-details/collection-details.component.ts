import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {
  Collection,
  ConfigObject,
  Kind,
  Meta,
  RotationPolicy,
  SubCollection,
  SubCollectionType
} from '../../../../../shared/models';
import {AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {VALID_COLLECTION_NAME} from '../../../../../shared/validation/patterns';


@Component({
  selector: 'app-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDetailsComponent implements OnChanges {

  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.authService.canUpdate(this.configObject.kind);
  }

  get canDelete(): boolean {
    return this.authService.canDelete(this.configObject.kind);
  }

  get showSave(): boolean {
    return (this.configObject && !this.configObject.id);
  }

  get canSave(): boolean {
    return this.form.valid;
  }

  get canUpdate(): boolean {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert(): boolean {
    return this.form.dirty;
  }

  get fileSize(): AbstractControl {
    return this.form.get('fileSize');
  }

  get subCollectionControlArray(): UntypedFormArray {
    return this.form.get('subCollectionsList') as UntypedFormArray;
  }

  get validFileSize(): boolean {
    if (this.fileSize.value === 0) {
      return false;
    }
    return true;
  }

  readonly RotationPolicy = RotationPolicy;
  readonly SubCollectionType = SubCollectionType;

  @Input()
  configObject: ConfigObject;

  @Input()
  rotationPolicies: RotationPolicy[] = [];

  @Input()
  subCollectionTypes: SubCollectionType[] = [];

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();

  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: UntypedFormGroup;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject) {
      if (this.configObject) {
        this.updateForm();
      } else {
        this.form.reset();
      }
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

  getSubCollectionName(index: number): AbstractControl {
    return this.form.get(['subCollectionsList', index, 'name']);
  }

  protected createForm(): void {
    this.form = this.fb.group({
      id: '',
      collectionDedupPolicy: '',
      fileRotationPolicy: '',
      compress: '',
      fileSize: '',
      subCollectionsList: this.fb.array([]),
      meta: new Meta()
    });
  }

  protected updateForm(): void {
    const subCollectionsFG: UntypedFormGroup[] = this.configObject.collection.subCollectionsList
      .map(subCollectionsList => this.fb.group(subCollectionsList));
    const subCollectionsFGArray: UntypedFormArray = this.fb.array(subCollectionsFG);

    this.form.patchValue({
      id: this.configObject.id,
      meta: this.configObject.meta,
      collectionDedupPolicy: this.configObject.collection.collectionDedupPolicy || RotationPolicy.NONE,
      fileRotationPolicy: this.configObject.collection.fileRotationPolicy || RotationPolicy.NONE,
      compress: this.configObject.collection.compress,
      fileSize: this.configObject.collection.fileSize || 1073741824
    });
    this.form.setControl('subCollectionsList', subCollectionsFGArray);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
      subCollectionsFGArray.disable();
    }
  }

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.COLLECTION});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const collection = new Collection();
    collection.collectionDedupPolicy = formModel.collectionDedupPolicy;
    collection.fileRotationPolicy = formModel.fileRotationPolicy;
    collection.compress = formModel.compress;
    collection.fileSize = formModel.fileSize || 0;
    collection.subCollectionsList = formModel.subCollectionsList.map(sub => new SubCollection(sub));

    configObject.meta = formModel.meta;
    configObject.collection = collection;

    return configObject;
  }

  private initSubCollection() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(VALID_COLLECTION_NAME)]],
      type: SubCollectionType.UNDEFINED,
    });
  }
}
