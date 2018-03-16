import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {BrowserScript, Meta} from '../../../commons/models/config.model';
import {RoleService} from '../../../auth/role.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-browserscript-details',
  templateUrl: './browserscript-details.component.html',
  styleUrls: ['./browserscript-details.component.css'],
})
export class BrowserScriptDetailsComponent implements OnChanges {

  @Input()
  browserScript: BrowserScript;

  @Output()
  save = new EventEmitter<BrowserScript>();
  @Output()
  update = new EventEmitter<BrowserScript>();
  @Output()
  delete = new EventEmitter<BrowserScript>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get editable(): boolean {
    return this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return (this.browserScript && !this.browserScript.id);
  }

  get name() {
    return this.form.get('meta').value.name;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.browserScript && !changes.browserScript.currentValue) {
      this.form.reset();
      return;
    }
    if (this.browserScript) {
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
    this.delete.emit(this.browserScript);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      script: '',
      meta: new Meta(),
    });
    if (!this.editable) {
      this.form.disable();
    }
  }

  private updateForm(): void {
    this.form.patchValue({
      id: this.browserScript.id,
      script: this.browserScript.script,
      meta: this.browserScript.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  private prepareSave(): BrowserScript {
    const formModel = this.form.value;
    return {
      id: this.browserScript.id,
      script: formModel.script,
      meta: formModel.meta,
    };
  }
}
