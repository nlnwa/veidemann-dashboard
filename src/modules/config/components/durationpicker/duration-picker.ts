import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  UntypedFormBuilder,
  UntypedFormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {UnitOfTime} from '../../../../shared/models/duration/unit-time.model';
import {Duration} from '../../../../shared/models/duration/duration.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NUMBER_OR_EMPTY_STRING} from '../../../../shared/validation/patterns';
import * as moment from 'moment';

@Component({
  selector: 'app-duration-picker',
  templateUrl: './duration-picker.component.html',
  styleUrls: ['./duration-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationPickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationPickerComponent),
      multi: true
    }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DurationPickerComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @Input() unit: UnitOfTime;
  @Input() durationGranularity: string;

  @Output()
  private formGroupChange = new EventEmitter<number>();

  readonly UnitOfTime = UnitOfTime;

  form: UntypedFormGroup;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  // ControlValueAccessor callbacks
  onChange: (duration: number) => void;
  onTouched: (duration: number) => void;

  showMilliseconds = false;
  showSeconds = false;
  showMinutes = false;
  showHours = false;
  showDays = false;


  constructor(protected fb: UntypedFormBuilder) {
    this.createForm();
  }

  get milliseconds(): AbstractControl {
    return this.form.get('milliseconds');
  }

  get seconds(): AbstractControl {
    return this.form.get('seconds');
  }

  get minutes(): AbstractControl {
    return this.form.get('minutes');
  }

  get hours(): AbstractControl {
    return this.form.get('hours');
  }

  get days(): AbstractControl {
    return this.form.get('days');
  }

  ngOnInit(): void {
    if (this.durationGranularity) {
      const parts = this.durationGranularity.split(':');
      this.showMilliseconds = parts.includes('ms');
      this.showSeconds = parts.includes('s');
      this.showMinutes = parts.includes('m');
      this.showHours = parts.includes('h');
      this.showDays = parts.includes('d');
    }
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((duration) => {
      this.onChange(this.durationToTime(duration));
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  writeValue(time: number): void {
    this.updateForm(time);
  }

  registerOnChange(fn: (duration: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    disabled ? this.form.disable() : this.form.enable();
  }

  protected createForm(): void {
    this.form = this.fb.group({
      milliseconds: ['', [Validators.min(0), Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      seconds: ['', [Validators.min(0), Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      minutes: ['', [Validators.min(0), Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      hours: ['', [Validators.min(0), Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      days: ['', [Validators.min(0), Validators.pattern(NUMBER_OR_EMPTY_STRING)]]
    });
  }

  protected updateForm(time: number): void {
    const duration = this.timeToDuration(time);
    this.form.patchValue({
      milliseconds: duration.milliseconds || '',
      seconds: duration.seconds || '',
      minutes: duration.minutes || '',
      hours: duration.hours || '',
      days: duration.days || ''
    });
  }

  timeToDuration(time: number): Duration {
    switch (this.unit) {
      case UnitOfTime.SECOND:
        return this.secondsToDuration(time);
      case UnitOfTime.MILLISECOND:
        return this.msToDuration(time);
    }
  }

  secondsToDuration(seconds: number): Duration {
    const s = moment.duration(seconds, 'seconds');
    return new Duration({
      days: s.days(),
      hours: s.hours(),
      minutes: s.minutes(),
      seconds: s.seconds(),
      milliseconds: null,
    });
  }

  msToDuration(milliseconds: number): Duration {
    const ms = moment.duration(milliseconds);
    return new Duration({
      days: null,
      hours: null,
      minutes: ms.minutes(),
      seconds: ms.seconds(),
      milliseconds: ms.milliseconds(),
    });
  }

  durationToTime(duration: Duration): number {
    switch (this.unit) {
      case UnitOfTime.SECOND:
        return this.durationToSeconds(duration);
      case UnitOfTime.MILLISECOND:
        return this.durationToMs(duration);
    }
  }

  durationToSeconds(duration: Duration): number {
    const seconds = (
        duration.days * (24 * 3600)) +
      (duration.hours * 3600) +
      (duration.minutes * 60) +
      duration.seconds;
    return seconds;
  }

  durationToMs(duration: Duration) {
    const ms = (
      (duration.minutes * 60000) + (duration.seconds * 1000) + duration.milliseconds
    );
    return ms;
  }

  validate(ctrl): ValidationErrors | null {
    return this.form.valid ? null : {invalidForm: {valid: false, message: 'Feltene kan kun inneholde positive tall'}};
  }


}
