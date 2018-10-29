import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
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
import {Subscription} from 'rxjs';
import {Meta} from '../models/config.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MetaComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: MetaComponent, multi: true}
  ],
})
export class MetaComponent implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {

  @Input()
  nameIsUrl: boolean;

  @Input()
  shouldShow = true;

  form: FormGroup;

  // ControlValueAccessor callbacks
  onChange: (meta: Meta) => void;
  onTouched: (meta: Meta) => void;

  private valueSubscription: Subscription;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.createForm(new Meta());
  }

  get editable(): boolean {
    return this.form.enabled;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nameIsUrl) {
      if (this.nameIsUrl) {
        this.form.get('name').setValidators(
          Validators.compose(
            [Validators.pattern('^(http[s]?:\\/\\/).*'), this.form.get('name').validator]));
      }
    }
  }

  ngAfterViewInit() {
    this.valueSubscription = this.form.valueChanges.subscribe(this.onChange);
  }

  ngOnDestroy() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }
  }

  // implement ControlValueAccessor
  writeValue(meta: Meta): void {
    if (meta === null) {
      this.form.reset();
    } else {
      this.updateForm(meta);
    }
  }

  // implement ControlValueAccessor
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // implement ControlValueAccessor
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // implement ControlValueAccessor
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  // implement Validator
  validate(ctrl: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : {'invalidMeta': true};
  }

  private dateFormat(date: string): string {
    return this.datePipe.transform(date, 'medium', 'UTC');
  }

  private createForm(meta: Meta): void {
    this.form = this.fb.group({
      name: [meta.name, [Validators.required, Validators.minLength(2)]],
      description: meta.description,
      created: {value: meta.created, disabled: true},
      created_by: {value: meta.created_by, disabled: true},
      last_modified: {value: meta.last_modified, disabled: true},
      last_modified_by: {value: meta.last_modified_by, disabled: true},
      label: meta.label,
    });
  }

  private updateForm(meta: Meta): void {
    // setting the emitEvent option to false  prevents the valueChange subscription above to fire
    this.form.setValue({
      name: meta.name,
      description: meta.description || '',
      created: this.dateFormat(meta.created),
      created_by: meta.created_by || '',
      last_modified: this.dateFormat(meta.last_modified),
      last_modified_by: meta.last_modified_by || '',
      label: meta.label || [],
    }, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
