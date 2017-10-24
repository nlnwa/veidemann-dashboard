import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogService} from '../log.service';
import {LogLevel} from '../../../commons/models/config.model';


@Component({
  selector: 'app-loglevel',
  templateUrl: './loglevel.component.html',
  styleUrls: ['./loglevel.component.css']
})
export class LoglevelComponent implements OnInit {

  logForm: FormGroup;
  logLevels: LogLevel[] = [];

  constructor(private logService: LogService,
              private fb: FormBuilder) {

    this.logForm = this.fb.group({
      log_level: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.logService.getLogConfig()
      .map(response => response.log_level)
      .subscribe(logLevels => {
        logLevels.forEach((logLevel) => {
          this.logLevels.push(logLevel);
        });
        this.setLogconfig(this.logLevels);
      });
  }

  get levels() {
    return this.logService.getLevels();
  }

  setLogconfig(logconfig) {
    this.logLevels = [];
    const logconfigFGs = logconfig.map(config => (this.fb.group(config)));
    const logconfigFormArray = this.fb.array(logconfigFGs);
    this.logForm.setControl('log_level', logconfigFormArray);
  }

  get log_level(): FormArray {
    return this.logForm.get('log_level') as FormArray;
  };

  initLogconfig() {
    return this.fb.group({
      logger: ['', [Validators.required, Validators.minLength(1)]],
      level: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  saveLogConfig(logconfig) {
    this.logService.saveLogConfig(logconfig).subscribe();
  }

  addLogconfig() {
    const control = <FormArray>this.logForm.controls['log_level'];
    control.push(this.initLogconfig());
  }

  removeLogconfig(i: number) {
    const control = <FormArray>this.logForm.controls['log_level'];
    control.removeAt(i);
  }

}
