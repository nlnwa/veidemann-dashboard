import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RoleService} from '../../../auth/';
import {
  ConfigObject,
  Meta,
  BrowserScript,
  Label,
  Kind
} from '../../../commons/models/';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-browserscript-details',
  templateUrl: './browserscript-details.component.html',
  styleUrls: ['./browserscript-details.component.css'],
})
export class BrowserScriptDetailsComponent implements OnChanges {

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  configObject: ConfigObject;

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;
  shouldShow = true;
  shouldAddLabel = undefined;
  allSelected = false;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm({
      id: {value: '', disabled: true},
      script: '',
      meta: new Meta(),
    });
  }

  get editable(): boolean {
    return this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return (this.configObject && !this.configObject.id);
  }

  get name() {
    return this.form.get('meta').value.name;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.browserScript && !changes.browserScript.currentValue) {
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

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm(controlsConfig: object) {
    this.form = this.fb.group(controlsConfig);
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    this.form.controls.meta.markAsDirty();
  }

  updateForm(): void {
    this.form.patchValue({
      id: this.configObject.id,
      script: this.configObject.browserScript.script,
      meta: this.configObject.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.editable) {
      this.form.disable();
    }
  }

  private prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.BROWSERSCRIPT});
    configObject.id = this.configObject.id;

    const browserScript = new BrowserScript();
    browserScript.script = formModel.script;

    configObject.meta = toMeta(formModel.meta);
    configObject.browserScript = browserScript;

    return configObject;
  }
}

function toMeta(m: Meta): Meta {
  const meta = new Meta();
  meta.name = m.name;
  meta.description = m.description;
  meta.labelList = m.labelList ? m.labelList.map(label => {
    const l = new Label();
    l.key = label.key;
    l.value = label.value;
    return label;
  }) : [];
  return meta;
}
