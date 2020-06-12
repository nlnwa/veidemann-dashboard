import {AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';

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
import {Subject} from 'rxjs';
import {Meta} from '../../../../shared/models';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MetaComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => MetaComponent), multi: true},
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaComponent implements AfterViewInit, OnInit, OnDestroy, ControlValueAccessor, Validator {

  form: FormGroup;

  // ControlValueAccessor callbacks
  onChange: (meta: Meta) => void;
  onTouched: (meta: Meta) => void;

  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(protected fb: FormBuilder,
              protected datePipe: DatePipe) {
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get created(): AbstractControl {
    return this.form.get('created');
  }

  get createdBy(): AbstractControl {
    return this.form.get('createdBy');
  }

  get lastModified(): AbstractControl {
    return this.form.get('lastModified');
  }

  get lastModifiedBy(): AbstractControl {
    return this.form.get('lastModifiedBy');
  }

  get editable(): boolean {
    return this.form.enabled;
  }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit() {
    this.form.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
      this.onChange(new Meta(value));
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
  setDisabledState(disabled: boolean): void {
    disabled ? this.form.disable() : this.form.enable();
  }

  // implement Validator
  validate(ctrl: AbstractControl): ValidationErrors | null {
    return this.name.valid ? null : this.name.errors;
  }

  protected dateFormat(timestamp: string): string {
    if (timestamp) {
      return this.datePipe.transform(timestamp, 'medium', 'UTC');
    } else {
      return '';
    }
  }

  protected createForm(): void {
    const meta = new Meta();
    this.form = this.fb.group({
      name: [meta.name, [Validators.required, Validators.minLength(2)]],
      description: meta.description,
      created: {value: meta.created, disabled: true},
      createdBy: {value: meta.createdBy, disabled: true},
      lastModified: {value: meta.lastModified, disabled: true},
      lastModifiedBy: {value: meta.lastModifiedBy, disabled: true},
      labelList: meta.labelList,
      annotationList: meta.annotationList
    });
  }

  protected updateForm(meta: Meta): void {
    // setting the emitEvent option to false  prevents the valueChange subscription above to fire
    this.form.setValue({
      name: meta.name,
      description: meta.description || '',
      created: this.dateFormat(meta.created),
      createdBy: meta.createdBy || '',
      lastModified: this.dateFormat(meta.lastModified),
      lastModifiedBy: meta.lastModifiedBy || '',
      labelList: meta.labelList || [],
      annotationList: meta.annotationList || [],
    }, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
