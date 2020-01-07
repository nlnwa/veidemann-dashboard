import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {NO_COLON} from '../../../commons/validator/patterns';
import {Label} from '../../../commons/models';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material';
import {LabelService} from '../../services/label.service';


@Component({
  selector: 'app-labels',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: LabelComponent, multi: true}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements ControlValueAccessor, OnInit {

  @Input() removable = true;

  @Input()
  placeholder = 'Label';

  protected keys: Subject<string[]>;
  key$: Observable<string[]>;

  control = new FormControl();

  // ControlValueAccessor callback functions
  onChange: (labels: Label[]) => void;
  onTouched: (labels: Label[]) => void;

  labelForm: FormGroup;
  labelInputSeparators = [ENTER, COMMA];

  disabled = false;

  // hack to sequence events between matAutocomplete and matChipList
  // see: https://github.com/angular/components/issues/8176
  protected seq = false;

  protected clickedIndex = -1;
  protected showUpdateLabel = false;

  protected groupsSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  groups$: Observable<any> = this.groupsSubject.asObservable();

  protected labels: Label[];

  filteredKey$: Observable<string[]>;

  @ViewChild('chipInput', {static: true}) chipInputControl: ElementRef;

  constructor(protected fb: FormBuilder,
              protected cdr: ChangeDetectorRef,
              protected labelService: LabelService) {
    this.createForm();
    this.keys = new Subject();


    this.key$ = this.keys.asObservable();
  }

  get showUpdate(): boolean {
    return this.showUpdateLabel;
  }

  get canUpdate(): boolean {
    return !this.disabled;
  }

  get key(): AbstractControl {
    return this.labelForm.get('key');
  }

  get value(): AbstractControl {
    return this.labelForm.get('value');
  }

  ngOnInit(): void {
    // this.fetchLabelKeys();
    this.filteredKey$ = combineLatest([
      this.control.valueChanges.pipe(
        startWith(''),
        map(value => value || '')
      ),
      this.labelService.getLabelKeys()
    ])
      .pipe(
        map(([value, keys]) => {
          const filterValue = value.toLowerCase();
          return keys.filter(key => key.toLowerCase().startsWith(filterValue));
        })
      );
  }

  fetchLabelKeys() {
    this.labelService.getLabelKeys()
      .subscribe(keys => this.keys.next(keys));
  }

  onAutocompleteOptionSelected(event) {
    this.seq = true;
    this.chipInputControl.nativeElement.value = event.option.value;
  }

  // implement ControlValueAccessor
  writeValue(labels: Label[]): void {
    if (labels === null) {
      this.labels = [];
    } else {
      // this.fetchLabelKeys();
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
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.disabled ? this.control.disable() : this.control.enable();
    this.cdr.markForCheck();
  }

  onClickLabel(key: string, value: string): void {
    if (this.disabled) {
      return;
    }
    this.showUpdateLabel = true;
    this.clickedIndex = this.findLabelIndex(key, value);
    this.labelForm.enable();
    this.labelForm.reset({key, value});
  }

  onDrop(event) {
    const label = event.item.data;
    this.save(label);
  }

  onSave(event: MatChipInputEvent): void {
    if (this.seq) {
      this.seq = false;
      return;
    }

    this.save(event.value);

    this.chipInputControl.nativeElement.value = '';
  }

  protected save(value: string): void {
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

  protected reset() {
    this.regroup();
    this.labelForm.reset();
    this.labelForm.disable();
    this.cdr.detectChanges();
  }

  protected findLabelIndex(key: string, value: string): number {
    return this.labels.findIndex((element) => {
      return element.key === key && element.value === value;
    });
  }

  protected createForm(): void {
    this.labelForm = this.fb.group({
      key: ['', [Validators.required, Validators.pattern(NO_COLON)]],
      value: ['', Validators.required]
    });
    this.labelForm.disable();
  }

  // group labels with similar key together
  protected regroup(): void {
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
