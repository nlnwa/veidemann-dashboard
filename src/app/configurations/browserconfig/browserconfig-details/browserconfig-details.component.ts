import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrowserConfig, BrowserScript, Label, Meta} from '../../../commons/models/config.model';
import {RoleService} from '../../../auth/role.service';
import {NUMBER_OR_EMPTY_STRING} from '../../../commons/validator/patterns';

@Component({
  selector: 'app-browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css'],
})
export class BrowserConfigDetailsComponent implements OnChanges {

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  browserConfig: BrowserConfig;
  @Input()
  browserScripts: BrowserScript[];

  @Output()
  save = new EventEmitter<BrowserConfig>();
  @Output()
  update = new EventEmitter<BrowserConfig>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<BrowserConfig>();

  form: FormGroup;
  browserScriptList: any[];
  shouldShow = true;

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.createForm({
      id: {value: '', disabled: true},
      user_agent: ['', [Validators.minLength(1)]],
      window_width: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      window_height: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      page_load_timeout_ms: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      sleep_after_pageload_ms: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      // headers: this.fb.group({''}),
      script_id: '',
      script_selector: '',
      meta: new Meta(),
    });
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return (this.browserConfig && !this.browserConfig.id);
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

  get user_agent() {
    return this.form.get('user_agent');
  }

  get window_width() {
    return this.form.get('window_width');
  }

  get window_height() {
    return this.form.get('window_height');
  }

  get page_load_timeout_ms() {
    return this.form.get('page_load_timeout_ms');
  }

  get sleep_after_pageload_ms() {
    return this.form.get('sleep_after_pageload_ms');
  }

  get script_id() {
    return this.form.get('script_id');
  }

  get showShortcuts(): boolean {
    const script = this.script_id.value;
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
    if (changes.browserConfig && !changes.browserConfig.currentValue) {
      this.form.reset();
      return;
    }
    if (changes.browserScripts && changes.browserScripts.currentValue) {
      this.browserScriptList = changes.browserScripts.currentValue.map((browserScript) =>
        ({
          id: browserScript.id,
          itemName: browserScript.meta.name,
        }));
    }
    if (this.browserConfig && this.browserScriptList) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.browserConfig);
  }

  onRevert() {
    this.updateForm();
  }

  getScriptName(id): string {
    for (let i = 0; i < this.browserScriptList.length; i++) {
      if (id === this.browserScriptList[i].id) {
        return this.browserScriptList[i].itemName;
      }
    }
  }

  private createForm(controlsConfig: object) {
    this.form = this.fb.group(controlsConfig);
  }

  updateForm() {
    this.form.patchValue({
      id: this.browserConfig.id,
      user_agent: this.browserConfig.user_agent || '',
      window_width: this.browserConfig.window_width || '',
      window_height: this.browserConfig.window_height || '',
      page_load_timeout_ms: this.browserConfig.page_load_timeout_ms || '',
      sleep_after_pageload_ms: this.browserConfig.sleep_after_pageload_ms || '',
      // headers: this.browserConfig.headers;
      script_id: this.browserConfig.script_id,
      script_selector: this.browserConfig.script_selector ? this.browserConfig.script_selector.map(selector => {
          const parts = selector.split(':');
          const label = new Label();
          label.key = parts[0];
          label.value = parts[1];
          return label;
        })
        : [],
      meta: this.browserConfig.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private prepareSave(): BrowserConfig {
    const formModel = this.form.value;
    return {
      id: this.browserConfig.id,
      user_agent: formModel.user_agent,
      window_width: parseInt(formModel.window_width, 10),
      window_height: parseInt(formModel.window_height, 10),
      page_load_timeout_ms: parseInt(formModel.page_load_timeout_ms, 10),
      sleep_after_pageload_ms: parseInt(formModel.sleep_after_pageload_ms, 10),
      script_id: formModel.script_id,
      script_selector: formModel.script_selector.map(label => label.key + ':' + label.value),
      headers: formModel.headers,
      meta: formModel.meta,
    };
  }
}
