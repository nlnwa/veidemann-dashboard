import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';

import {DatePipe} from '@angular/common';
import {
  AbstractControl,
  AsyncValidator,
  FormBuilder,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {SeedUrlValidator} from '../../../../shared/validation/existing-url-validation';
import {MetaComponent} from '../meta/meta.component';
import {ConfigApiService} from '../../../core/services';
import {Observable, of} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {ConfigObject, ConfigRef, Meta} from '../../../../shared/models';
import {validUrlValidator} from './seed-urlvalidation';

export interface Parcel {
  seed: ConfigObject | ConfigObject[];
  entityRef: ConfigRef;
}

@Component({
  selector: 'app-seed-meta',
  templateUrl: './seed-meta.component.html',
  styleUrls: ['./seed-meta.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SeedMetaComponent), multi: true},
    {provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => SeedMetaComponent), multi: true}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMetaComponent extends MetaComponent implements AsyncValidator {

  @Input()
  entityRef: ConfigRef;

  @Output()
  move = new EventEmitter<Parcel>();

  private asyncUrlValidator: (entityRef: ConfigRef) => (control: AbstractControl) => Observable<ValidationErrors | null>;

  constructor(protected fb: FormBuilder,
              protected datePipe: DatePipe,
              private cdr: ChangeDetectorRef,
              private configApiService: ConfigApiService) {
    super(fb, datePipe);
    this.asyncUrlValidator = SeedUrlValidator.createBackendValidator(this.configApiService);
  }

  get isSingleUrl(): boolean {
    const url = this.name.value;
    const parts = url.split(/[\s]+/);
    if (parts.length > 1) {
      for (let i = 1; i < parts.length; i++) {
        if (parts[i] !== '') {
          return false;
        }
      }
    }
    return true;
  }

  protected createForm(): void {
    super.createForm();
  }

  updateForm(meta: Meta): void {
    this.name.clearValidators();
    this.name.clearAsyncValidators();
    this.name.setValidators(Validators.compose([Validators.required, validUrlValidator]));
    if (!meta.created) {
      this.name.setAsyncValidators(this.asyncUrlValidator(this.entityRef));
    }
    super.updateForm(meta);
  }

  onRemoveExistingUrl(seed: ConfigObject) {
    let value = '';
    const match = this.name.value.search(seed.meta.name) > 0;
    if (match) {
      value = this.name.value.replace(seed.meta.name, '').trim();
      this.name.setValue(value);
    } else {
      const url = new URL(seed.meta.name);
      const domain = url.hostname.replace('www.', '');
      value = this.name.value.replace(domain, '').trim();
      this.name.setValue(value);
    }
    if (!value) {
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  onRemoveExistingUrls(seeds: ConfigObject[]) {
    const replaced = seeds.reduce((acc, seed) => acc.replace(seed.meta.name, '')
      .trim()
      .replace(/\s{2,}/, ' \n'), this.name.value);
    this.name.setValue(replaced);
    if (!replaced) {
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  onMoveSeedToCurrentEntity(seed: ConfigObject) {
    this.onRemoveExistingUrl(seed);
    this.move.emit({seed, entityRef: this.entityRef});
  }

  onMoveSeedsToCurrentEntity(seeds: ConfigObject[]) {
    this.onRemoveExistingUrls(seeds);
    this.move.emit({seed: seeds, entityRef: this.entityRef});
  }

  goToUrl(url: string): void {
    window.open(url, '_blank');
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return (this.name.pending
        ? this.name.statusChanges.pipe(
          map(state => state === 'VALID' ? null : this.name.errors),
          tap(() => this.cdr.markForCheck()))
        : this.name.valid
          ? of(null)
          : of(this.name.errors)
    ).pipe(
      first() // must ensure the observable returned is completed
    );
  }
}
