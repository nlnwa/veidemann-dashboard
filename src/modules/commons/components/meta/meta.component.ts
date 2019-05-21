import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import {DatePipe} from '@angular/common';
import {
  AbstractControl,
  AsyncValidator,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {Meta} from '../../models';
import {VALID_URL} from '../../validator/patterns';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {SeedUrlValidator} from '../../validator/existing-url-validation';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MetaComponent), multi: true},
    {provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => MetaComponent), multi: true},
    SeedUrlValidator
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaComponent implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor, AsyncValidator {
  @Input()
  nameIsUrl: boolean;

  @Input()
  id: string;

  @ViewChild('autosize')
  txtAreaAutosize: CdkTextareaAutosize;

  form: FormGroup;

  // ControlValueAccessor callbacks
  onChange: (meta: Meta) => void;
  onTouched: (meta: Meta) => void;

  ngUnsubscribe: Subject<void> = new Subject<void>();
  timeoutHandle: number;

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private cdr: ChangeDetectorRef,
              public urlValidator: SeedUrlValidator) {
    this.createForm();
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.nameIsUrl && changes.id) {
      if (this.nameIsUrl) {
        if (!this.id) {
          this.name.setAsyncValidators(this.urlValidator.validate.bind(this.urlValidator));
        } else {
          clearTimeout(this.timeoutHandle);
          this.name.clearAsyncValidators();
          this.name.markAsPristine();
          this.name.markAsUntouched();
          this.cdr.markForCheck();

        }
        this.name.setValidators(
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.pattern(VALID_URL)
          ]));
      }
    }
  }

  ngAfterViewInit() {
    this.form.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => this.onChange(new Meta(value)));
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
  validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    if (this.form.valid) {
      return of(null);
    }
    if (this.nameIsUrl) {
      const that = this;
      this.timeoutHandle = setTimeout(() => {
        that.onChange(that.form.value);
        that.cdr.markForCheck();
      });
    }
    return of({invalid: true});
  }

  onRemoveExistingUrl(url: string) {
    const urls = this.name.value;
    const replaced = urls.replace(url, '');
    this.name.setValue(replaced);
  }

  private dateFormat(timestamp: string): string {
    if (timestamp) {
      return this.datePipe.transform(timestamp, 'medium', 'UTC');
    } else {
      return '';
    }
  }

  private createForm(): void {
    const meta = new Meta();
    this.form = this.fb.group({
      name: [meta.name, [Validators.required, Validators.minLength(2)]],
      description: meta.description,
      created: {value: meta.created, disabled: true},
      createdBy: {value: meta.createdBy, disabled: true},
      lastModified: {value: meta.lastModified, disabled: true},
      lastModifiedBy: {value: meta.lastModifiedBy, disabled: true},
      labelList: meta.labelList,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private updateForm(meta: Meta): void {
    // setting the emitEvent option to false  prevents the valueChange subscription above to fire
    this.form.setValue({
      name: meta.name,
      description: meta.description || '',
      created: this.dateFormat(meta.created),
      createdBy: meta.createdBy || '',
      lastModified: this.dateFormat(meta.lastModified),
      lastModifiedBy: meta.lastModifiedBy || '',
      labelList: meta.labelList || [],
    }, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
