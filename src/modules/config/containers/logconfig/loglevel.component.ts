import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../../../core/services';
import {AuthService} from '../../../core/services/auth';
import {LogLevel, LogLevels} from '../../../commons/models';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {LogService} from '../../services';


@Component({
  selector: 'app-loglevel',
  templateUrl: './loglevel.component.html',
  styleUrls: ['./loglevel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LogService]
})
export class LoglevelComponent implements OnInit, OnDestroy {

  form: FormGroup;
  logLevels: LogLevels = new LogLevels();
  levelOptions: string[];
  addOrRemoved = false;

  private ngUnsubscribe = new Subject();

  constructor(private logService: LogService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute) {
    this.createForm();
  }

  get canSave(): boolean {
    return this.form.valid && (this.form.dirty || this.addOrRemoved);
  }

  get canRevert(): boolean {
    return this.form.dirty || this.addOrRemoved;
  }

  get canEdit(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  get logLevelList(): FormArray {
    return this.form.get('logLevelList') as FormArray;
  }

  ngOnInit() {
    this.levelOptions = this.route.snapshot.data.levels;
    this.getLogLevels();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSave() {
    this.logService.saveLogConfig(this.prepareSave())
      .subscribe(logLevels => {
        this.logLevels = logLevels;
        this.addOrRemoved = false;
        this.updateForm();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onAdd() {
    this.logLevelList.push(this.createLogLevel());
    this.addOrRemoved = true;
  }

  onDelete(i: number) {
    this.logLevelList.removeAt(i);
    this.addOrRemoved = true;
  }

  onRevert() {
    this.updateForm();
    this.addOrRemoved = false;
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private createForm() {
    this.form = this.fb.group({
      logLevelList: this.fb.array([])
    });
  }

  private updateForm() {
    this.form.setControl('logLevelList', this.fb.array(this.logLevels.logLevelList.map(this.createLogLevel.bind(this))));
    if (this.form.disabled) {
      this.logLevelList.disable();
    }
    if (!this.canEdit) {
      this.form.disable();
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.cdr.markForCheck();
  }

  private prepareSave(): LogLevels {
    return new LogLevels(this.form.value);
  }

  private createLogLevel(logLevel: LogLevel = new LogLevel()): FormGroup {
    return this.fb.group({
      logger: [logLevel.logger, [Validators.required, Validators.minLength(1)]],
      level: [logLevel.level, [Validators.required, Validators.minLength(1)]]
    });
  }

  private getLogLevels() {
    this.logService.getLogConfig()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(logLevels => {
        this.logLevels = logLevels;
        this.updateForm();
      });
  }
}
