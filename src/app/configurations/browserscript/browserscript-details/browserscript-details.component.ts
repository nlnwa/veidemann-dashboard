import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BrowserScript} from '../../../commons/models/config.model';
import {DateTime} from '../../../commons/datetime';

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

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get showSave(): boolean {
    return (this.browserScript && !this.browserScript.id);
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
    return this.form.get('meta.name');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.browserScript.currentValue) {
      if (!this.browserScript) {
        this.form.reset();
      }
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
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
        label: [],
      }),
    });
  }

  private updateForm(): void {
    this.form.patchValue({
      id: this.browserScript.id,
      script: this.browserScript.script,
      meta: {
        name: this.browserScript.meta.name,
        description: this.browserScript.meta.description,
        created: {
          seconds: DateTime.convertFullTimestamp(this.browserScript.meta.created.seconds),
        },
        created_by: this.browserScript.meta.created_by,
        last_modified: {
          seconds: DateTime.convertFullTimestamp(this.browserScript.meta.last_modified.seconds),
        },
        last_modified_by: this.browserScript.meta.last_modified_by,
        label: [...this.browserScript.meta.label],
      }
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  private prepareSave(): BrowserScript {
    const formModel = this.form.value;
    return {
      id: this.browserScript.id,
      script: formModel.script,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        label: formModel.meta.label.map(label => ({...label})) // deepCopy
      }
    };
  }
}
