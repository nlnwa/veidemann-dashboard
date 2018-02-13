import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LogService} from '../log.service';
import {LogLevel} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../commons/snack-bar/snack-bar.service';
import {RoleService} from '../../../auth/role.service';


@Component({
  selector: 'app-loglevel',
  templateUrl: './loglevel.component.html',
  styleUrls: ['./loglevel.component.css']
})
export class LoglevelComponent implements OnChanges {

  form: FormGroup;
  logLevels: LogLevel[] = [];

  constructor(private logService: LogService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService,
              private roleService: RoleService) {

    this.form = this.fb.group({
      log_level: this.fb.array([]),

    });
    this.getLogLevels();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get levels() {
    return this.logService.getLevels();
  }

  get log_level(): FormArray {
    return this.form.get('log_level') as FormArray;
  };

  get log_levelArray() {
    return <FormArray>this.form.get('log_level');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.logLevels.currentValue) {
      this.updateForm();
    }
  }

  onSave(logconfig) {
    this.logService.saveLogConfig(logconfig).subscribe();
    this.form.markAsPristine();
    this.logLevels = [];
    this.getLogLevels();
    this.snackBarService.openSnackBar('Lagret');
  }

  onAdd() {
    this.log_levelArray.push(this.initLogconfig());
  }

  onDelete(i: number) {
    this.log_levelArray.removeAt(i);
    this.form.markAsDirty();
  }

  onRevert() {
    this.updateForm();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private updateForm() {
    const logconfigFG: FormGroup[] = this.logLevels.map(config => this.fb.group(config));
    const logconfigFormArray = this.fb.array(logconfigFG);
    if (this.form.disabled) {
      logconfigFormArray.disable();
    }
    this.form.setControl('log_level', logconfigFormArray);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private getLogLevels() {
    this.logService.getLogConfig()
      .map(response => response.log_level)
      .subscribe(logLevels => {
        logLevels.forEach((logLevel) => {
          this.logLevels.push(logLevel);
        });
        this.updateForm();
      });
  }

  private initLogconfig() {
    return this.fb.group({
      logger: ['', [Validators.required, Validators.minLength(1)]],
      level: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

}
