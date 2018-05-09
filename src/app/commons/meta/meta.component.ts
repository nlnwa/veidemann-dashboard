import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {DateTime} from '../datetime/datetime';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {Meta} from '../models/config.model';
import {Subscription} from 'rxjs';

@Component({
//  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MetaComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: MetaComponent, multi: true}
  ],
})
export class MetaComponent implements AfterViewInit, OnDestroy, ControlValueAccessor, Validator {


  // ControlValueAccessor callback functions
  onChange: (meta: Meta) => void;
  onTouched: (meta: Meta) => void;

  private form: FormGroup;
  private meta: Meta;
  private valueSubscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get editable(): boolean {
    return this.form.enabled;
  }

  ngAfterViewInit() {
    this.valueSubscription = this.form.valueChanges.subscribe((_) => {
      if (this.meta === null) {
        return;
      }
      this.updateValue(this.form.value);
    });
  }

  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }

  updateValue(meta: Meta) {
    this.onChange(meta);
  }

  writeValue(meta: Meta): void {
    if (meta !== null) {
      this.meta = meta;
      this.updateForm(meta);
    } else {
      this.meta = meta;
      this.form.reset();
    }
  }

  validate(ctrl: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : {'invalidMeta': true};
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // implement ControlValueAccessor
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: '',
      created: {value: '', disabled: true},
      created_by: {value: '', disabled: true},
      last_modified: {value: '', disabled: true},
      last_modified_by: {value: '', disabled: true},
      label: [],
    });
  }

  private updateForm(meta: Meta): void {
    this.form.setValue({
      name: meta.name,
      description: meta.description || '',
      created: meta.created ? DateTime.formatTimestamp(meta.created) : '',
      created_by: meta.created_by || '',
      last_modified: meta.last_modified ? DateTime.formatTimestamp(meta.last_modified) : '',
      last_modified_by: meta.last_modified_by || '',
      label: meta.label || [],
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private getValue(): Meta {
    const formModel = this.form.value;
    return {
      name: formModel.name,
      description: formModel.description,
      // created: this.meta.created,
      // created_by: this.meta.created_by,
      // last_modified: this.meta.last_modified,
      // last_modified_by: this.meta.last_modified_by,
      label: formModel.label,
    };
  }
}
