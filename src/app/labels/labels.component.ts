import {Component, forwardRef, Input, OnChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Label} from '../commons/models/config.model';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LabelsComponent),
    multi: true
  }]
})
export class LabelsComponent implements OnChanges, ControlValueAccessor {

  @Input() disabled = false;
  @Input() type;
  public showAddLabelCard = false;

  private labels: Label[];

  newKeyInput: string;
  newValueInput: string;


  constructor() {

  }

  // Function to call when the rating changes.
  onChange = (labels: Label[]) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  ngOnChanges(): void {
    this.newKeyInput =  '';
    this.newValueInput = '';
    this.showAddLabelCard = false;
  }

  writeValue(labels: Label[]): void {
    if (labels == null) {
      this.labels = [];
    } else {
      this.labels = labels;
    }
    this.ngOnChanges();
  }

  registerOnChange(fn: (labels: Label[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get groups() {

    const grouping = {};

    this.labels.forEach(label => {
      if (grouping.hasOwnProperty(label.key)) {
        grouping[label.key].push(label.value);
      } else {
        grouping[label.key] = [label.value];
      }
    });

    return Object.keys(grouping).map(key => ({key, values: grouping[key]}));
  }

  onNewLabel(key: string, value: string) {
    this.labels.push({
      key: key,
      value: value
    });
    this.ngOnChanges();
    this.onChange(this.labels);
  }

  newLabelCard(value: boolean) {
    this.showAddLabelCard = value;
  }

  removeLabel(key: string, value: string): void {

    const index = this.labels.findIndex((element) => {
      if (element.key === key && element.value === value) {
        return true;
      } else {
        return false;
      }
    });

    this.labels.splice(index, 1);
    this.onChange(this.labels);
  }
}
