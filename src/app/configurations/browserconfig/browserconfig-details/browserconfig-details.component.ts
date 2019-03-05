import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../commons/validator/patterns';
import {ConfigObject} from '../../../commons/models/configobject.model';
import {Meta, BrowserConfig, Label} from '../../../commons/models';
import {Kind} from '../../../commons/models/kind.model';

@Component({
  selector: 'app-browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css'],
})
export class BrowserConfigDetailsComponent implements OnChanges {
  readonly Kind = Kind;

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  configObject: ConfigObject;
  @Input()
  browserScripts: ConfigObject[];

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;

  shouldShow = true;
  allSelected = false;

  // adding or subtracting labels ect when updating all configs.
  shouldAddLabel = undefined;
  shouldAddBrowserscript = undefined;
  shouldAddSelector = undefined;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
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

  get name() {
    return this.form.get('meta').value.name;
  }

  get userAgent() {
    return this.form.get('userAgent');
  }

  get windowWidth() {
    return this.form.get('windowWidth');
  }

  get windowHeight() {
    return this.form.get('windowHeight');
  }

  get pageLoadTimeoutMs() {
    return this.form.get('pageLoadTimeoutMs');
  }

  get maxInactivityTimeMs() {
    return this.form.get('maxInactivityTimeMs');
  }

  get headers() {
    return this.form.get('headers');
  }

  get scriptIdList() {
    return this.form.get('scriptRefList');
  }

  get scriptSelectorList() {
    return this.form.get('scriptSelectorList');
  }

  get showShortcuts(): boolean {
    const script = this.scriptIdList.value;
    if (script != null && script !== '') {
      if (script.length != null) {
        if (script.length > 0) {
          return true;
        }
      }
    }
    return false;
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

  onToggleShouldAddBrowserscript(shouldAdd: boolean): void {
    this.shouldAddBrowserscript = shouldAdd;
  }

  onToggleShouldAddScriptSelector(shouldAdd: boolean): void {
    this.shouldAddSelector = shouldAdd;
  }

  private createForm() {
    this.form = this.fb.group(
      {
        id: {value: '', disabled: true},
        userAgent: ['', [Validators.minLength(1)]],
        windowWidth: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        windowHeight: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        pageLoadTimeoutMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        maxInactivityTimeMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        // headers: this.fb.group({''}),
        scriptRefList: '',
        scriptSelectorList: '',
        meta: new Meta(),
      });
  }

  updateForm() {
    this.form.patchValue({
      id: this.configObject.id,
      meta: this.configObject.meta,
      userAgent: this.configObject.browserConfig.userAgent || '',
      windowWidth: this.configObject.browserConfig.windowWidth || '',
      windowHeight: this.configObject.browserConfig.windowHeight || '',
      pageLoadTimeoutMs: this.configObject.browserConfig.pageLoadTimeoutMs || '',
      maxInactivityTimeMs: this.configObject.browserConfig.maxInactivityTimeMs || '',
      // headers: this.configObject.configObject.headers;
      scriptRefList: this.configObject.browserConfig.scriptRefList || [],
      scriptSelectorList: this.configObject.browserConfig.scriptSelectorList
        ? this.configObject.browserConfig.scriptSelectorList.map(selector => {
          const parts = selector.split(':');
          const key = parts.shift();
          const value = parts.join(':');
          const label = new Label();
          label.key = key;
          label.value = value;
          return label;
        })
        : [],
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private prepareSave(): ConfigObject {

    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.BROWSERCONFIG});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const browserConfig = new BrowserConfig();
    browserConfig.userAgent = formModel.userAgent;
    browserConfig.windowWidth = parseInt(formModel.windowWidth, 10) || null;
    browserConfig.windowHeight = parseInt(formModel.windowHeight, 10) || null;
    browserConfig.pageLoadTimeoutMs = parseInt(formModel.pageLoadTimeoutMs, 10) || null;
    browserConfig.maxInactivityTimeMs = parseInt(formModel.maxInactivityTimeMs, 10) || null;
    browserConfig.scriptRefList = formModel.scriptRefList;
    browserConfig.scriptSelectorList = formModel.scriptSelectorList.map(label => label.key + ':' + label.value);
    // browserConfig.headersList = formModel.headers;

    configObject.meta = formModel.meta;
    configObject.browserConfig = browserConfig;
    return configObject;
  }
}
