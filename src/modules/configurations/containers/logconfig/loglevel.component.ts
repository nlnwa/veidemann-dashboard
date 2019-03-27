import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogService} from '../../services/log.service';
import {SnackBarService} from '../../../core/services';
import {RoleService} from '../../../core/services/auth';
import {LogLevel, LogLevels} from '../../../commons/models';
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


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
              private roleService: RoleService,
              private cdr: ChangeDetectorRef) {
    this.createForm();
  }

  get canSave(): boolean {
    return this.form.valid && (this.form.dirty || this.addOrRemoved);
  }

  get canRevert(): boolean {
    return this.form.dirty || this.addOrRemoved;
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get logLevelsFormArray(): FormArray {
    return this.form.get('log_level') as FormArray;
  }

  ngOnInit() {
    this.logService.getLevels().pipe(take(1)).subscribe(levels => this.levelOptions = levels);
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
        this.updateForm();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onAdd() {
    this.logLevelsFormArray.push(this.createLogLevel());
    this.addOrRemoved = true;
  }

  onDelete(i: number) {
    this.logLevelsFormArray.removeAt(i);
    this.addOrRemoved = true;
  }

  onRevert() {
    this.updateForm();
    this.addOrRemoved = false;
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private createForm() {
    this.form = this.fb.group({
      log_level: this.fb.array([])
    });
  }

  private updateForm() {
    this.form.setControl('log_level', this.fb.array(this.logLevels.log_level.map(this.createLogLevel.bind(this))));
    if (this.form.disabled) {
      this.logLevelsFormArray.disable();
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
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
