import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../../commons/validator/patterns';
import {BrowserConfig, ConfigObject, ConfigRef, Kind, Label, Meta} from '../../../../commons/models';


@Component({
  selector: 'app-browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserConfigDetailsComponent implements OnChanges {
  readonly Kind = Kind;

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

  constructor(protected fb: FormBuilder, protected authService: AuthService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.authService.isAdmin();
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

  get userAgent(): AbstractControl {
    return this.form.get('userAgent');
  }

  get windowWidth(): AbstractControl {
    return this.form.get('windowWidth');
  }

  get windowHeight(): AbstractControl {
    return this.form.get('windowHeight');
  }

  get pageLoadTimeoutMs(): AbstractControl {
    return this.form.get('pageLoadTimeoutMs');
  }

  get maxInactivityTimeMs(): AbstractControl {
    return this.form.get('maxInactivityTimeMs');
  }

  // get headers(): AbstractControl {
  //   return this.form.get('headers');
  // }

  get scriptRefIdList(): AbstractControl {
    return this.form.get('scriptRefIdList');
  }

  get scriptSelectorList(): AbstractControl {
    return this.form.get('scriptSelectorList');
  }

  get showShortcuts(): boolean {
    return this.scriptRefIdList.value ? this.scriptRefIdList.value.length > 0 : false;
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

  getScriptName(id) {
    const found = this.browserScripts.find(script => script.id === id);
    return found ? found.meta.name : 'script';
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

  protected createForm() {
    this.form = this.fb.group(
      {
        id: '',
        userAgent: ['', [Validators.minLength(1)]],
        windowWidth: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        windowHeight: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        pageLoadTimeoutMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        maxInactivityTimeMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        // headers: this.fb.group({''}),
        scriptRefIdList: [],
        scriptSelectorList: [],
        meta: new Meta(),
      });
  }

  protected updateForm() {
    this.form.setValue({
      id: this.configObject.id,
      meta: this.configObject.meta,
      userAgent: this.configObject.browserConfig.userAgent || '',
      windowWidth: this.configObject.browserConfig.windowWidth || '',
      windowHeight: this.configObject.browserConfig.windowHeight || '',
      pageLoadTimeoutMs: this.configObject.browserConfig.pageLoadTimeoutMs || '',
      maxInactivityTimeMs: this.configObject.browserConfig.maxInactivityTimeMs || '',
      // headers: this.configObject.configObject.headers;
      scriptRefIdList: this.configObject.browserConfig.scriptRefList.map(script => script.id),
      scriptSelectorList: this.configObject.browserConfig.scriptSelectorList
        .map(selector => {
          const parts = selector.split(':', 2);
          const key = parts.shift();
          const value = parts.join(':');
          return new Label({key, value});
        }),
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({
      id: formModel.id,
      kind: Kind.BROWSERCONFIG,
      meta: formModel.meta,
    });

    const browserConfig = new BrowserConfig();
    browserConfig.userAgent = formModel.userAgent;
    browserConfig.windowWidth = parseInt(formModel.windowWidth, 10) || null;
    browserConfig.windowHeight = parseInt(formModel.windowHeight, 10) || null;
    browserConfig.pageLoadTimeoutMs = parseInt(formModel.pageLoadTimeoutMs, 10) || null;
    browserConfig.maxInactivityTimeMs = parseInt(formModel.maxInactivityTimeMs, 10) || null;
    browserConfig.scriptRefList = formModel.scriptRefIdList.map(id => new ConfigRef({kind: Kind.BROWSERSCRIPT, id}));
    browserConfig.scriptSelectorList = formModel.scriptSelectorList.map(label => label.key + ':' + label.value);
    // browserConfig.headersList = formModel.headers;

    configObject.browserConfig = browserConfig;

    return configObject;
  }
}
