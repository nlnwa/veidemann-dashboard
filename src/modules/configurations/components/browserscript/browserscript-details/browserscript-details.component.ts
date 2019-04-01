import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {BrowserScript, ConfigObject, Kind, Meta} from '../../../../commons/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-browserscript-details',
  templateUrl: './browserscript-details.component.html',
})
export class BrowserScriptDetailsComponent implements OnChanges {

  @Input()
  configObject: ConfigObject;

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();

  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
    this.createForm();
  }

  get editable(): boolean {
    return this.authService.isAdmin();
  }

  get canSave(): boolean {
    return this.form.valid;
  }

  get canUpdate(): boolean {
    return this.form.valid && this.form.dirty;
  }

  get showSave(): boolean {
    return (this.configObject && !this.configObject.id);
  }

  get name(): string {
    return this.form.get('meta').value.name;
  }

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
    this.form = this.fb.group({
      id: {value: ''},
      script: '',
      meta: new Meta(),
    });
  }

  protected updateForm(): void {
    this.form.setValue({
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

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.BROWSERSCRIPT});
    configObject.id = this.configObject.id;

    const browserScript = new BrowserScript();
    browserScript.script = formModel.script;

    configObject.meta = formModel.meta;
    configObject.browserScript = browserScript;

    return configObject;
  }
}
