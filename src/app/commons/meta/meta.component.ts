import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {DateTime} from '../datetime/datetime';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Meta} from '../models/config.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: MetaComponent, multi: true}],
})
export class MetaComponent implements AfterViewInit, ControlValueAccessor {

  meta: FormGroup;

  // ControlValueAccessor callback functions
  onChange: (meta: Meta) => void;
  onTouched: (meta: Meta) => void;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.meta.valueChanges.subscribe((meta) => {
      this.onChange(meta);
    });
  }

  writeValue(meta: Meta): void {
    if (meta !== null) {
      this.updateForm(meta);
    }
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
      this.meta.disable();
    } else {
      this.meta.enable();
    }
  }


  get editable(): boolean {
    return this.meta.enabled;
  }

  public createForm(): void {
    this.meta = this.fb.group({
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
    this.meta.patchValue({

      name: meta.name,
      description: meta.description,
      created: DateTime.formatTimestamp(meta.created),
      created_by: meta.created_by,
      last_modified: DateTime.formatTimestamp(meta.last_modified),
      last_modified_by: meta.last_modified_by,
      label: meta.label || [],
    });
    this.meta.markAsPristine();
    this.meta.markAsUntouched();
  };
}
