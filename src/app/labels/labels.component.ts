import {Component, forwardRef, Input, OnChanges} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Label} from '../commons/models/label.model';

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

  private labels: Label[];
  visible: true;
  selectable: true;
  removable: true;
  addOnBlur: true;

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
    console.log(this.labels);
  }

  registerOnChange(fn: (labels: Label[]) => void): void {
    console.log('registerOnChange', fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  /*
  Labels
  [
    { key: 'Collection', value: 'Språkrådet' },
    { key: 'Collection', value: 'NITO' },
    { key: 'Orgnummer', value: '8923723720' }
  ]

  Grouping
  {
    'Collection': [ 'S' 'NITO'],
    'Org': [ 'O': [ '3232' ]
  }

  Group
  [
    { key: 'Collection', values:  [ 'Språv', 'Nito'] },
    { key: 'Org', values:  [ '2323']
  ]
  */

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

  onNewLabel(event: any) {
    console.log('Legger til ny label' + JSON.stringify(event.currentTarget.newKey.value));
    this.labels.push({
      key: event.target.newKey,
      value: event.target.newValue
    });
    this.onChange(this.labels);
  }

  /*
    addLabel(event: any) {
      console.log('Typing in input field');
      this.labels.push({
        key: 'Test1111',
        value: event.target.value
      });
      this.onChange(this.labels);
    }



   // remove(fruit: any): void {
   //   let index = this.fruits.indexOf(fruit);
   //
   //   if (index >= 0) {
   //     this.fruits.splice(index, 1);
   //   }
   // }
    /*
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
