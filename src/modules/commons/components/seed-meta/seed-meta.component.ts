import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Optional, Output} from '@angular/core';

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
import {SeedUrlValidator} from '../../validator/existing-url-validation';
import {MetaComponent} from '..';
import {BackendService} from '../../../core/services';
import {Observable, of} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {VALID_URL} from '../../validator/patterns';
import {ConfigObject, Meta} from '../../models';
import {SeedDataService} from '../../../configurations/services/data';


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

  @Output()
  move = new EventEmitter<ConfigObject | ConfigObject[]>();

  constructor(protected fb: FormBuilder,
              protected datePipe: DatePipe,
              private cdr: ChangeDetectorRef,
              private backendService: BackendService,
              @Optional() private seedDataService: SeedDataService) {
    super(fb, datePipe);
  }

  protected createForm(): void {
    super.createForm();
  }

  protected updateForm(meta: Meta): void {
    if (meta.created) {
      this.name.clearValidators();
      this.name.clearAsyncValidators();
      this.name.setValidators(Validators.compose([
        Validators.required,
        Validators.pattern(VALID_URL)
      ]));
    } else {
      this.name.clearValidators();
      this.name.clearAsyncValidators();
      this.name.setValidators(Validators.compose([
        Validators.required,
        SeedUrlValidator.createValidator(this.seedDataService)
      ]));
      this.name.setAsyncValidators(SeedUrlValidator.createBackendValidator(this.backendService));
    }
    super.updateForm(meta);
  }

  onRemoveExistingUrl(url: string) {
    const value = this.name.value.replace(url, '').trim();
    this.name.setValue(value);
    if (!value) {
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  onRemoveExistingUrls(urls: string[]) {
    const replaced = urls.reduce((acc, url) => acc.replace(url, '').trim(), this.name.value);
    this.name.setValue(replaced);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  onMoveSeedToCurrentEntity(seed: ConfigObject) {
    this.onRemoveExistingUrl(seed.meta.name);
    this.move.emit(seed);
  }

  onMoveSeedsToCurrentEntity(seeds: ConfigObject[]) {
    this.name.setValue('');
    this.move.emit(seeds);
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return (this.name.pending
        ? this.name.statusChanges.pipe(
          map(state => state === 'VALID' ? null : this.name.errors),
          tap(() => this.cdr.markForCheck())
        )
        : this.name.valid
          ? of(null)
          : of(this.name.errors)
    ).pipe(
      first() // must ensure the observable returned is completed
    );
  }
}
