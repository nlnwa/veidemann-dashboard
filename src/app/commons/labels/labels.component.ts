import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {NO_COLON} from '../validator/patterns';
import {Label} from '../models';


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
export class LabelsComponent implements ControlValueAccessor, OnInit {

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
  groups$: Observable<any> = this.groupsSubject.asObservable();

  private labels: Label[];

  constructor(private fb: FormBuilder) {
  }

  get showUpdate(): boolean {
    return this.showUpdateLabel;
  }

  get canUpdate(): boolean {
    return !this.isDisabled;
  }

  get key() {
    return this.labelForm.get('key');
  }

  get value() {
    return this.labelForm.get('value');
  }

  ngOnInit(): void {
    this.createForm();
  }

  // implement ControlValueAccessor
  writeValue(labels: Label[]): void {
    if (labels === null) {
      this.labels = [];
    } else {
      this.labels = labels.map(label => new Label({key: label.key, value: label.value}));
    }
    this.reset();
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

  onSave(value: string): void {
    if (Kind.LABEL === this.kind) {
      this.onSaveLabel(value);
    } else {
      this.onSaveSelector(value);
    }
  }

  onSaveLabel(value: string): void {
    let key = '';
    value = value.trim();

    if (value === '') {
      return;
    }

    const parts = value.split(':');
    if (parts.length > 1) {
      key = parts.shift();
      value = parts.join(':');
      if (key.length < 1 || value.length < 1) {
        return;
      }
    } else {
      return;
    }

    if (this.findLabelIndex(key, value) > -1) {
      return;
    }

    this.labels.push(new Label({key, value}));

    this.onChange(this.labels);
    this.reset();
  }

  onSaveSelector(value: string): void {
    let key = '';
    value = value.trim();

    if (value === '') {
      return;
    }

    const parts = value.split(':');
    if (parts.length > 1) {
      key = parts.shift();
      value = parts.join(':');
    } else {
      key = parts[0].trim();
      value = '';
    }

    if (this.findLabelIndex(key, value) > -1) {
      return;
    }

    this.labels.push(new Label({key, value}));

    this.onChange(this.labels);
    this.reset();
  }

  onUpdateLabel(key: string, value: string): void {
    key = key.trim();
    value = value.trim();

    // remove old
    this.labels.splice(this.clickedIndex, 1);
    // add updated
    this.labels.push(new Label({key, value}));

    this.onChange(this.labels);
    this.reset();
  }

  onRemoveLabel(key: string, value: string): void {
    const index = this.findLabelIndex(key, value);
    if (index !== -1) {
      this.labels.splice(index, 1);
    }
    this.onChange(this.labels);
    this.reset();
  }

  onAbort(): void {
    this.labelForm.disable();
  }

  private reset() {
    this.regroup();
    this.labelForm.reset();
    this.labelForm.disable();
  }

  private findLabelIndex(key: string, value: string): number {
    return this.labels.findIndex((element) => {
      return element.key === key && element.value === value;
    });
  }

  private createForm(): void {
    this.labelForm = this.fb.group({
      key: this.kind === Kind.LABEL
        ? ['', [Validators.required, Validators.pattern(NO_COLON)]]
        : '',
      value: this.kind === Kind.LABEL
        ? ['', Validators.required]
        : ''
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
