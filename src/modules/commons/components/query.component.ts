import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {JobExecutionStatusQuery} from '../../report/services';
import {isValidDate} from '../../../shared/func';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class QueryComponent<T> implements AfterViewInit, OnChanges, OnDestroy {

  form: FormGroup;

  private subscription: Subscription;

  @Input()
  query: Partial<T>;

  @Output()
  queryChange: EventEmitter<Partial<T>>;

  protected constructor(protected fb: FormBuilder) {
    this.subscription = Subscription.EMPTY;
    this.queryChange = new EventEmitter<Partial<T>>();
    this.createForm();
  }

  ngAfterViewInit() {
    this.subscription = this.form.valueChanges.subscribe(value => {
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
    this.subscription.unsubscribe();
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

      // match date values and convert to ISO string if valid
      if (value && key.match(/time/i)) {
        const date = new Date(value);
        if (isValidDate(date)) {
          query[key] = date.toISOString();
        } else {
          query[key] = '';
        }
      }

    }
    return query;
  }
}
