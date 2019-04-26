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
import {Meta} from '../../models';
import {VALID_URL} from '../../validator/patterns';


@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MetaComponent, multi: true},
    {provide: NG_VALIDATORS, useExisting: MetaComponent, multi: true}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaComponent implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor, Validator {
  @Input()
  nameIsUrl: boolean;

  @Input()
  id: string;

  form: FormGroup;

  // ControlValueAccessor callbacks
  onChange: (meta: Meta) => void;
  onTouched: (meta: Meta) => void;

  private valueSubscription: Subscription;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
    this.createForm();
  }

  get created() {
    return this.form.get('created');
  }

  get createdBy() {
    return this.form.get('createdBy');
  }

  get lastModified() {
    return this.form.get('lastModified');
  }

  get lastModifiedBy() {
    return this.form.get('lastModifiedBy');
  }

  get editable(): boolean {
    return this.form.enabled;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nameIsUrl) {
       if (this.nameIsUrl) {
         this.form.get('name').setValidators(
           Validators.compose(
             [
               Validators.pattern(VALID_URL),
               Validators.required,
               Validators.minLength(2)
             ]));
       }
     }
  }

  ngAfterViewInit() {
    this.valueSubscription = this.form.valueChanges.subscribe(
      ({name, description, created, createdBy, lastModified, lastModifiedBy, labelList}) => this.onChange(new Meta({
        name, description, created, createdBy, lastModified, lastModifiedBy, labelList
      })));
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
  setDisabledState(disabled: boolean): void {
    disabled ? this.form.disable() : this.form.enable();
  }

  // implement Validator
  validate(ctrl: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : {'invalidMeta': true};
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
  }

  private updateForm(meta: Meta): void {
    // setting the emitEvent option to false  prevents the valueChange subscription above to fire
    this.form.patchValue({
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
