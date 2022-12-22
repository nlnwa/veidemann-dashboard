import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfigObject, Label} from '../../../../../shared/models/config';
import {ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {combineLatest, Observable, Subject} from 'rxjs';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {map, startWith, switchMap} from 'rxjs/operators';
import {LabelService} from '../../../services/label.service';
import {UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'app-label-multi',
  templateUrl: './label-multi.component.html',
  styleUrls: ['./label-multi.component.css']
})
export class LabelMultiComponent implements OnInit {
  @Input()
  configObject: ConfigObject;

  @Input()
  allSelected: boolean;

  @Output()
  update = new EventEmitter<any>();

  private fetchLabelKeys: Subject<void>;

  control = new UntypedFormControl();

  shouldAddLabel = undefined;
  labelInputSeparators = [ENTER];
  labels: Label[] = [];
  filteredKey$: Observable<string[]>;

  // hack to sequence events between matAutocomplete and matChipList
  // see: https://github.com/angular/components/issues/8176
  protected seq = false;

  @ViewChild('chipInput') chipInputControl: ElementRef;

  constructor(protected labelService: LabelService) {
    this.fetchLabelKeys = new Subject();
  }

  ngOnInit(): void {
    const value$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => value || '')
    );
    const key$ = this.fetchLabelKeys.pipe(
      startWith(''),
      switchMap(() => this.labelService.getLabelKeys())
    );
    this.filteredKey$ = combineLatest([value$, key$])
      .pipe(
        map(([value, keys]) => {
          const filterValue = value.toLowerCase();
          return keys.filter(key => key.toLowerCase().startsWith(filterValue));
        })
      );
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    if (this.shouldAddLabel !== undefined) {
      this.labels = [];
    }
    this.shouldAddLabel = shouldAdd;
    this.update.emit({add: this.shouldAddLabel, labels: this.labels});
  }

  onAdd(event: MatChipInputEvent) {
    if (event.chipInput) {
      event.input.value = '';
    }

    let key = '';
    let value = event.value.trim();

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
    this.update.emit({add: this.shouldAddLabel, labels: this.labels});
  }

  onRemove(key: string, value: string) {
    const index = this.findLabelIndex(key, value);
    if (index !== -1) {
      this.labels.splice(index, 1);
      this.update.emit({add: this.shouldAddLabel, labels: this.labels});
    }
  }

  protected findLabelIndex(key: string, value: string): number {
    return this.labels.findIndex((element) => {
      return element.key === key && element.value === value;
    });
  }

  onRevert() {
    this.shouldAddLabel = undefined;
    this.labels = [];
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    const label: MatChipInputEvent = {input: undefined, chipInput: null, value: event.item.data};
    this.onAdd(label);
  }

  onAutocompleteOptionSelected(event) {
    this.seq = true;
    this.chipInputControl.nativeElement.value = event.option.value;
  }

}
