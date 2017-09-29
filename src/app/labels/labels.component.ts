import {Component, forwardRef, Input, OnChanges} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Label} from '../commons/models/label.model';
import {MdChipInputEvent, ENTER} from '@angular/material';

const COMMA = 188;

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
  private addLabelCard = false;

  private labels: Label[];

  selectable: boolean;
  removable: boolean;

  fruits = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  constructor() {
    this.selectable = true;
    this.removable = true;
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
    console.log('Legger til ny label', key, value);
    this.labels.push({
      key: key,
      value: value
    });
    this.onChange(this.labels);
  }

  inputNewLabel() {
    this.addLabelCard = true;
  }

  remove(key: string, value: string): void {
    console.log('Remove trykket', key, value);
    console.log(this.labels);

    const index = this.labels.findIndex((element) => {
      if (element.key === key && element.value === value) {
        return true;
      } else {
        return false;
      }
    });

    this.labels.splice(index, 1);
    
    console.log(this.labels);
  }


  /* ADD EVENT CHIPS

    add(event: MdChipInputEvent): void {
      let input = event.input;
      let value = event.value;

      // Hent hvilken key det gjelder

  // Legg til value for key
      if ((value || '').trim()) {
        //this.labels.push({ this.label.key, value: value.trim() });
      }

  // Reset the input value
      if (input) {
        input.value = '';
      }
    }

*/


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
