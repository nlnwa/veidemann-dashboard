import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {Kind} from '../../../commons/models';
import {ConfigOptions} from '../../containers';
import {Query} from '../../func/query';

@Component({
  selector: 'app-config-query',
  styleUrls: ['config-query.component.scss'],
  templateUrl: './config-query.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigQueryComponent implements OnChanges, AfterViewInit {
  readonly Kind = Kind;

  form: FormGroup;

  // tslint:disable-next-line:variable-name
  private _term: string;

  @Input()
  query: Partial<Query>;

  @Output()
  queryChange: EventEmitter<Partial<Query>>;

  @Input()
  options: ConfigOptions;

  constructor(private fb: FormBuilder) {
    this.queryChange = new EventEmitter<Partial<Query>>();
    this.createForm();
  }

  get term(): string {
    return this._term;
  }

  set term(term: string) {
    this._term = term;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query) {
      if (this.query) {
        this.updateForm();
      } else {
        this.form.reset();
      }
    }
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe((value) => {
      this.onQuery({...value, term: this.term});
    });
  }

  onQuery(value: Query) {
    this.queryChange.emit(value);
  }

  onSearch(term: string) {
    this.onQuery({...this.form.value, term});
  }

  private createForm(): void {
    this.form = this.fb.group({
      entityId: '',
      scheduleId: '',
      crawlConfigId: '',
      collectionId: '',
      browserConfigId: '',
      politenessId: '',
      crawlJobIdList: {value: []},
      scriptIdList: {value: []},
    });
  }

  private updateForm(): void {
    this.term = this.query.term;

    this.form.patchValue(this.query, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
