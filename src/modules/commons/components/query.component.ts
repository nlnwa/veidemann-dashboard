import {AfterViewInit, Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {parseDateAndTime} from '../../../shared/func';

@Directive()
export abstract class QueryComponent<T> implements AfterViewInit, OnChanges, OnDestroy {

  form: UntypedFormGroup;

  private formChanges: Subscription;

  @Input()
  query: Partial<T>;

  @Output()
  queryChange: EventEmitter<Partial<T>>;

  protected constructor(protected fb: UntypedFormBuilder) {
    this.formChanges = Subscription.EMPTY;
    this.queryChange = new EventEmitter<Partial<T>>();
    this.createForm();
  }

  ngAfterViewInit() {
    this.formChanges = this.form.valueChanges.subscribe(value => {
      this.onQuery(value);
    });
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

  ngOnDestroy(): void {
    this.formChanges.unsubscribe();
  }

  onQuery(query: T) {
    this.queryChange.emit(this.transform(query));
  }

  protected createForm(): void {
    this.form = this.fb.group({});
  }

  protected updateForm(): void {
    this.form.patchValue(this.query, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  protected transform(query: T): T {
    for (const [key, value] of Object.entries(query)) {
      if (value && key.match(/time/i)) {
        query[key] = parseDateAndTime(value) ?? '';
      }
    }
    return query;
  }
}
