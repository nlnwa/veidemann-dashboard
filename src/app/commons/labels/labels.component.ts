import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Label} from '../models/config.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export enum Kind {
  LABEL = 'Label',
  SELECTOR = 'Selector',
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

  private clickedIndex = -1;
  private showUpdateLabel = false;

  private groupsSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private groups$: Observable<any> = this.groupsSubject.asObservable();

  private labels: Label[];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get showUpdate(): boolean {
    return this.showUpdateLabel;
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
      this.labels = [...labels];
      this.regroup();
      this.labelForm.disable();
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

  onClickLabel(key: string, value: string): void {
    this.showUpdateLabel = true;
    this.clickedIndex = this.findLabelIndex(key, value);
    this.labelForm.enable();
    this.labelForm.reset({key, value});
  }

  onSaveLabel(value: string): void {
    let key = '';
    value = value.trim();

    if (value === '') {
      return;
    }

    const parts = value.split(':');
    if (parts.length > 1) {
      key = parts[0].trim();
      value = parts[1].trim();
      if (key.length < 1 || value.length < 1) {
        return;
      }
    } else {
      return;
    }

    if (this.findLabelIndex(key, value) > -1) {
      return;
    }

    this.labels.push({key, value});
    this.regroup();
    this.onChange(this.labels);
    this.labelForm.reset();
    this.labelForm.disable();
  }

  onUpdateLabel(key: string, value: string): void {
    key = key.trim();
    value = value.trim();

    // remove old
    this.labels.splice(this.clickedIndex, 1);
    // add updated
    this.labels.push({key, value});

    this.regroup();
    this.onChange(this.labels);
    this.labelForm.reset();
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

