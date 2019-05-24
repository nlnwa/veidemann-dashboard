import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ViewChild} from '@angular/core';

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
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {SeedUrlValidator} from '../../validator/existing-url-validation';
import {MetaComponent} from '../meta/meta.component';
import {BackendService} from '../../../core/services';
import {Observable, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {VALID_URL} from '../../validator/patterns';
import {ConfigObject, ConfigRef, Meta} from '../../models';


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
  move = new EventEmitter<ConfigObject>();

  @ViewChild('autosize')
  txtAreaAutosize: CdkTextareaAutosize;

  constructor(protected fb: FormBuilder,
              protected datePipe: DatePipe,
              private cdr: ChangeDetectorRef,
              private backendService: BackendService) {
    super(fb, datePipe);
  }

  protected createForm(): void {
    super.createForm();
    this.name.setValidators(Validators.compose([this.name.validator, Validators.pattern(VALID_URL)]));
  }

  protected updateForm(meta: Meta): void {
    if (meta.created) {
      this.name.clearAsyncValidators();
    } else {
      this.name.setAsyncValidators(SeedUrlValidator.createValidator(this.backendService));
    }
    super.updateForm(meta);
  }

  onRemoveExistingUrl(url: string) {
    const urls: string = this.name.value;
    const replaced = urls.replace(url, '').trim();
    this.name.setValue(replaced);
  }

  onMoveSeedToCurrentEntity(seed: any) {
    this.onRemoveExistingUrl(seed.meta.name);
    this.move.emit(seed);
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!this.name.pending) {
      return this.name.valid ? of(null) : of(this.name.errors);
    } else {
      return this.name.statusChanges.pipe(
        tap(state => {
          if (state === 'INVALID') {
            this.checkSeedExistsWithSameEntity(this.name.errors.seedExists);
          }
        }),
        map(state => state === 'VALID' ? null : this.name.errors),
        tap(() => this.cdr.markForCheck()),
        take(1)
      );
    }
  }

  private checkSeedExistsWithSameEntity(seeds) {
    for (const seed of seeds) {
      const seedEntityId = seed.seed.entityRef.id;
      if (seedEntityId === this.entityRef.id && !this.created.value) {
        Promise.resolve().then(() => this.onRemoveExistingUrl(seed.meta.name));
      }
    }
  }
}
