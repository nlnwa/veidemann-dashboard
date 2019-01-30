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
  browserConfigs: ConfigObject[];
  @Input()
  politenessConfigs: ConfigObject[];
  @Input()
  equalExtractText: boolean;
  @Input()
  equalCreateScreenshot: boolean;
  @Input()
  equalDepthFirst: boolean;

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;
  shouldShow = true;

  browserConfigList: any[];
  politenessConfigList: any = [];

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

  get collectionId() {
    return this.form.get('collectionRef');
  }

  get browserConfigId() {
    return this.form.get('browserConfigRef');
  }

  get politenessId() {
    return this.form.get('politenessRef');
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

  get depthFirst() {
    return this.form.get('depthFirst');
  }

  get showPolitenessConfig(): boolean {
    const politenessConfig = this.politenessId.value;
    if (politenessConfig != null && politenessConfig !== '') {
      return true;
    }
    return false;
  }

  get showBrowserConfig(): boolean {
    const browserConfig = this.browserConfigId.value;
    if (browserConfig != null && browserConfig !== '') {
      return true;
    }
    return false;
  }

  get showShortcuts(): boolean {
    if (this.showPolitenessConfig || this.showBrowserConfig) {
      return true;
    }
    return false;
  }

  shouldDisableExtractText(): void {
    if (this.equalExtractText !== undefined || !this.shouldShow) {
      if (!this.equalExtractText) {
        this.extractText.disable();
      }
    }
  }

  shouldDisableCreateSnapshot(): void {
    if (this.equalCreateScreenshot !== undefined || !this.shouldShow) {
      if (!this.equalCreateScreenshot) {
        this.createScreenshot.disable();
      }
    }
  }

  shouldDisableDepthFirst(): void {
    if (this.equalDepthFirst !== undefined || !this.shouldShow) {
      if (!this.equalDepthFirst) {
        this.depthFirst.disable();
      }
    }
  }

  getPolitenessConfigName(id): string {
    for (let i = 0; i < this.politenessConfigList.length; i++) {
      if (id === this.politenessConfigList[i].id) {
        return this.politenessConfigList[i].itemName;
      }
    }
  }

  getBrowserConfigName(id): string {
    for (let i = 0; i < this.browserConfigList.length; i++) {
      if (id === this.browserConfigList[i].id) {
        return this.browserConfigList[i].itemName;
      }
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

  onEnableDepthFirst() {
    if (this.depthFirst.disabled) {
      this.depthFirst.enable();
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
        extractText: this.configObject.crawlConfig.extra.extractText,
        createScreenshot: this.configObject.crawlConfig.extra.createScreenshot,
      },
      meta: this.configObject.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!(this.canEdit)) {
      this.form.disable();
    }
   // this.shouldDisableExtractText();
   // this.shouldDisableCreateSnapshot();
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
    crawlConfig.minimumDnsTtlS = parseInt(formModel.minimumDnsTtlS, 10);
    crawlConfig.priorityWeight = parseInt(formModel.priorityWeight, 10);
    crawlConfig.extra.extractText = formModel.extra.extractText;
    crawlConfig.extra.createScreenshot = formModel.extra.createScreenshot;

    configObject.meta = formModel.meta;
    configObject.crawlConfig = crawlConfig;

    return configObject;
  }
}

