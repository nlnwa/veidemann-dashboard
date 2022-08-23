import {AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  UntypedFormBuilder,
  UntypedFormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FILESIZE_PATTERN} from '../../../../shared/validation';


const incrementBases = {
  2: [
    [['b', 'bit', 'bits'], 1 / 8],
    [['B', 'Byte', 'Bytes', 'bytes'], 1],
    [['Kb'], 128],
    [['k', 'K', 'kb', 'KB', 'KiB', 'Ki', 'ki'], 1024],
    [['Mb'], 131072],
    [['m', 'M', 'mb', 'MB', 'MiB', 'Mi', 'mi'], Math.pow(1024, 2)],
    [['Gb'], 1.342e+8],
    [['g', 'G', 'gb', 'GB', 'GiB', 'Gi', 'gi'], Math.pow(1024, 3)],
    [['Tb'], 1.374e+11],
    [['t', 'T', 'tb', 'TB', 'TiB', 'Ti', 'ti'], Math.pow(1024, 4)],
    [['Pb'], 1.407e+14],
    [['p', 'P', 'pb', 'PB', 'PiB', 'Pi', 'pi'], Math.pow(1024, 5)],
    [['Eb'], 1.441e+17],
    [['e', 'E', 'eb', 'EB', 'EiB', 'Ei', 'ei'], Math.pow(1024, 6)]
  ],
};

@Component({
  selector: 'app-filesize-input',
  templateUrl: './filesize-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilesizeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FilesizeInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilesizeInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {


  constructor(protected fb: UntypedFormBuilder) {
    this.createForm();
  }

  @Input() placeholder: string;

  form: UntypedFormGroup;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  // ControlValueAccessor callbacks
  onChange: (filesize: number) => void;
  onTouched: (filesize: number) => void;

  get fileSize(): AbstractControl {
    return this.form.get('fileSize');
  }


  ngAfterViewInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((size) => {
      this.onChange(this.fileSizeToBytes(size.fileSize));
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  registerOnChange(fn: (filesize: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(bytes: number): void {
    this.updateForm(bytes);
  }

  protected createForm(): void {
    this.form = this.fb.group({
      fileSize: ['', [Validators.pattern(FILESIZE_PATTERN)]]
    });
  }

  protected updateForm(fileSize: number): void {
    if (fileSize) {
      const hrFilesize = this.bytesToHumanReadable(fileSize);
      this.form.patchValue({
        fileSize: hrFilesize || ''
      });
    } else {
      this.form.patchValue({
        fileSize: ''
      });
    }

  }

  bytesToHumanReadable(bytes: number, decimals = 2): string {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  parsableUnit(unit) {
    return unit.match(/\D*/).pop() === unit;
  }

  validAmount(amount) {
    return !isNaN(parseFloat(amount)) && isFinite(amount);
  }

  fileSizeToBytes(size: string): number {
    const parsed = size.trim().toString().match(/^([0-9\.,]*)(?:\s*)?(.*)$/);
    const amount = Number(parsed[1].replace(',', '.'));
    const unit = parsed[2];

    const validUnit = (sourceUnit) => {
      return sourceUnit === unit;
    };

    if (!this.validAmount(amount) || !this.parsableUnit(unit)) {
      this.fileSize.setErrors({invalidSize: {valid: false, size}});
    }

    if (unit === '') {
      return Math.round(Number(amount));
    }

    for (const increment of incrementBases['2']) {
      if ((increment[0] as string[]).some(validUnit)) {
        return Math.round(amount * Number(increment[1]));
      }
    }
    this.fileSize.setErrors({invalidUnit: {valid: false, unit}});
  }

  validate(ctrl): ValidationErrors | null {
    return this.form.valid ? null : this.form.errors;
  }

}
