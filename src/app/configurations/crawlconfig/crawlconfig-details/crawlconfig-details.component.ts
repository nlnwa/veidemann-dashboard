import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../auth/role.service';
import {NUMBER_OR_EMPTY_STRING} from '../../../commons/validator/patterns';
import {ConfigObject} from '../../../commons/models/configobject.model';
import {Meta} from '../../../commons/models/meta/meta.model';
import {CrawlConfig} from '../../../commons/models';
import {Kind} from 'app/commons/models/kind.model';

@Component({
  selector: 'app-crawlconfig-details',
  templateUrl: './crawlconfig-details.component.html',
  styleUrls: ['./crawlconfig-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlConfigDetailsComponent implements OnChanges {

  readonly Kind = Kind;

  @Input()
  set data(show) {
    this.shouldShow = show;
  }
  @Input()
  configObject: ConfigObject;
  @Input()
  options: any;

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;
  shouldShow = true;

  disableExtractText = false;
  disableCreateScreenshot = false;

  shouldAddLabel = undefined;
  allSelected = false;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return (this.configObject && !this.configObject.id);
  }

  get name() {
    return this.form.get('meta').value.name;
  }

  get collectionRef() {
    return this.form.get('collectionRef').value;
  }

  get browserConfigRef() {
    return this.form.get('browserConfigRef').value;
  }

  get politenessRef() {
    return this.form.get('politenessRef').value;
  }

  get minDnsTtlSeconds() {
    return this.form.get('minimumDnsTtlS');
  }

  get priorityWeight() {
    return this.form.get('priorityWeight');
  }

  get extractText() {
    return this.form.get('extra.extractText');
  }

  get createScreenshot() {
    return this.form.get('extra.createScreenshot');
  }


  get showShortcuts(): boolean {
     return (this.politenessRef && this.politenessRef.id) || (this.browserConfigRef && this.browserConfigRef.id) || (this.collectionRef && this.collectionRef.id)
   }

   getPolitenessConfigName(id) {
    const found = this.options.politenessConfigs.find( politenessConfig => politenessConfig.id === id);
    return found ? found.meta.name : 'politenessConfig';
   }

   getCollectionName(id) {
    const found = this.options.collections.find( collection => collection.id === id);
    return found ? found.meta.name : 'collection';
   }

   getBrowserConfigName(id) {
    const found = this.options.browserConfigs.find( browserConfig => browserConfig.id === id);
    return found ? found.meta.name : 'browserConfig';
   }

  shouldDisableExtractText(): void {
      if (this.disableExtractText) {
        this.extractText.disable();
      }
  }

  shouldDisableCreateSnapshot(): void {
      if (this.disableCreateScreenshot) {
        this.createScreenshot.disable();
      }
  }

  onEnableExtractText() {
    if (this.extractText.disabled) {
      this.extractText.enable();
    }
  }

  onEnableCreateScreenshot() {
    if (this.createScreenshot.disabled) {
      this.createScreenshot.enable();
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject) {
      if (!this.configObject) {
        this.form.reset();
      } else {
        this.updateForm();
      }
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    this.form.controls.meta.markAsDirty();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      collectionRef: '',
      browserConfigRef: '',
      politenessRef: '',
      extra: this.fb.group({
        extractText: '',
        createScreenshot: '',
      }),
      minimumDnsTtlS: ['', Validators.pattern(NUMBER_OR_EMPTY_STRING)],
      priorityWeight: ['', Validators.pattern(NUMBER_OR_EMPTY_STRING)],
      meta: new Meta(),
    });
  }

  updateForm() {
    this.form.patchValue({
      id: this.configObject.id,
      collectionRef: this.configObject.crawlConfig.collectionRef,
      politenessRef: this.configObject.crawlConfig.politenessRef,
      browserConfigRef: this.configObject.crawlConfig.browserConfigRef,
      minimumDnsTtlS: this.configObject.crawlConfig.minimumDnsTtlS || '',
      priorityWeight: this.configObject.crawlConfig.priorityWeight || '',
      extra: {
        extractText: this.configObject.crawlConfig.extra.extractText || null,
        createScreenshot: this.configObject.crawlConfig.extra.createScreenshot || null,
      },
      meta: this.configObject.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!(this.canEdit)) {
      this.form.disable();
    }
    this.shouldDisableExtractText();
    this.shouldDisableCreateSnapshot();
  }

  private prepareSave(): ConfigObject {

    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.CRAWLCONFIG});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const crawlConfig = new CrawlConfig();
    crawlConfig.collectionRef = formModel.collectionRef;
    crawlConfig.browserConfigRef = formModel.browserConfigRef;
    crawlConfig.politenessRef = formModel.politenessRef;
    crawlConfig.minimumDnsTtlS = parseInt(formModel.minimumDnsTtlS, 10) || 0;
    crawlConfig.priorityWeight = parseInt(formModel.priorityWeight, 10) || 0;
    crawlConfig.extra.extractText = formModel.extra ? formModel.extra.extractText : null;
    crawlConfig.extra.createScreenshot = formModel.extra ? formModel.extra.createScreenshot : null;

    configObject.meta = formModel.meta;
    configObject.crawlConfig = crawlConfig;

    return configObject;
  }
}

