import {Component, OnInit} from "@angular/core";
import {LogService} from "../";
import {FormGroup, FormBuilder, FormArray, Validators} from "@angular/forms";

@Component({
  selector: 'app-loglevel',
  templateUrl: './loglevel.component.html',
  styleUrls: ['./loglevel.component.css']
})
export class LoglevelComponent implements OnInit {

  logForm: FormGroup;
  loglist = [];
  levelList = [];

  constructor(private logService: LogService,
              private fb: FormBuilder,) {

    this.logForm = this.fb.group({
      log_level: this.fb.array([]),
    })
  }


  ngOnInit() {
    this.levelList.push({text: 'ALL'});
    this.levelList.push({text: 'TRACE'});
    this.levelList.push({text: 'DEBUG'});
    this.levelList.push({text: 'INFO'});
    this.levelList.push({text: 'WARN'});
    this.levelList.push({text: 'ERROR'});
    this.levelList.push({text: 'FATAL'});
    this.levelList.push({text: 'OFF'});
    this.logService.getAllLogconfigs().map(logconfig => logconfig.log_level).forEach((value) => {
      value.forEach((key) => {
        this.loglist.push({logger: key.logger, level: key.level});
      })
    });

    setTimeout(() => {
      this.setLogconfig(this.loglist);
    },200);
  };



  setLogconfig(logconfig) {
    this.loglist = [];
    const logconfigFGs = logconfig.map(logconfig => (this.fb.group(logconfig)));
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

  saveLog(logconfig) {
      this.logService.updateLogconfig(logconfig)
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
