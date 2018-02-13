import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Label} from '../models/config.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/Observable';

export enum Kind {
  LABEL = 'label',
  SELECTOR = 'selector',
}

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: LabelsComponent, multi: true}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsComponent implements ControlValueAccessor {

  @Input() removable = true;
  @Input() kind: string = Kind.LABEL;

  // ControlValueAccessor callback functions
  onChange: (labels: Label[]) => void;
  onTouched: (labels: Label[]) => void;

  labelForm: FormGroup;
  labelInputSeparators = [ENTER, COMMA];

  private isDisabled = false;

  private groupsSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private groups$: Observable<any> = this.groupsSubject.asObservable();

  private labels: Label[];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get selector(): boolean {
    return this.kind === Kind.SELECTOR
  }

  get canUpdate(): boolean {
    return !this.isDisabled;
  }

  get canDelete(): boolean {
    return this.removable;
  }

  get groups(): Observable<any> {
    return this.groups$;
  }

  // implement ControlValueAccessor
  writeValue(labels: Label[]): void {
    if (labels == null) {
      this.labels = [];
    } else {
      this.labels = labels;
      this.regroup();
    }
  }

  // implement ControlValueAccessor
  registerOnChange(fn: (labels: Label[]) => void): void {
    this.onChange = fn;
  }

  // implement ControlValueAccessor
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // implement ControlValueAccessor
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onCreateLabel() {
    this.labelForm.enable();
    this.labelForm.reset({key: '', value: ''});
  }

  onClickLabel(key: string, value: string): void {
    this.labelForm.enable();
    this.labelForm.reset({key, value});
  }

  onSaveLabel(key: string, value: string): void {
    key = key.trim();
    value = value.trim();

    if (value === '' || key === '') {
      return
    }

    if (key === null) {
      const parts = value.split(':', 1);
      if (parts.length > 1) {
        key = parts[0];
        value = parts[1];
      }
    }

    if (this.findLabelIndex(key, value) > -1) {
      return
    }

    this.labels.push({key, value});
    this.regroup();
    this.onChange(this.labels);
    this.labelForm.disable();
  }

  onUpdateLabel(key: string, value: string): void {
    key = key.trim();
    value = value.trim();

    // remove old
    const index = this.findLabelIndex(key, value);
    this.labels.splice(index, 1);
    // add updated
    this.labels.push({key, value});

    this.regroup();
    this.onChange(this.labels);
    this.labelForm.disable();
  }

  onRemoveLabel(key: string, value: string): void {
    const index = this.findLabelIndex(key, value);
    if (index !== -1) {
      this.labels.splice(index, 1);
    }
    this.regroup();
    this.onChange(this.labels);
  }

  onAbort(): void {
    this.labelForm.disable();
  }

  private findLabelIndex(key: string, value: string): number {
    return this.labels.findIndex((element) => {
      return element.key === key && element.value === value;
    });
  }

  private findLabel(key: string, value: string): Label | null {
    const index = this.findLabelIndex(key, value);
    return index === -1 ? null : this.labels[index];
  }

  private createForm(): void {
    this.labelForm = this.fb.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      value: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.labelForm.disable();
  }

  private regroup(): void {
    const grouping = {};

    this.labels.forEach(label => {
      if (grouping.hasOwnProperty(label.key)) {
        grouping[label.key].push(label.value);
      } else {
        grouping[label.key] = [label.value];
      }
    });
    this.groupsSubject.next(Object.keys(grouping).map(key => ({key, values: grouping[key]})));
  }

}

