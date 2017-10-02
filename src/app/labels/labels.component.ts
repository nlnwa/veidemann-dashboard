import {Component, forwardRef, Input, OnChanges} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
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
  }

  writeValue(labels: Label[]): void {
    if (labels == null) {
      this.labels = [];
    } else {
      this.labels = labels;
    }
    console.log('writeValue', this.labels);
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
    this.newKeyInput =  '';
    this.newValueInput = '';
    this.onChange(this.labels);
  }

  inputNewLabel() {
    this.showAddLabelCard = true;
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




  /*------ OLD LABEL FUNCTIONS --------------

  setLabel(label) {
      const labelFGs = label.map(lbl => (this.fb.group(lbl)));
      const labelFormArray = this.fb.array(labelFGs);
      this.crawlHostGroupConfigFG.setControl('label', labelFormArray);
    }

    addLabel() {
      const control = <FormArray>this.crawlHostGroupConfigFG.controls['label'];
      control.push(this.initLabel());
    }

    removeLabel(i: number) {
      const control = <FormArray>this.crawlHostGroupConfigFG.controls['label'];
      control.removeAt(i);
    }

    get label(): FormArray {
      return this.crawlHostGroupConfigFG.get('label') as FormArray;
    };

    initLabel() {
      return this.fb.group({
        key: ['', [Validators.required, Validators.minLength(2)]],
        value: ['', [Validators.required, Validators.minLength(2)]],
      });
    }*/


}
