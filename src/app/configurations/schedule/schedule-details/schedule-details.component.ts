import {Component, Input, OnChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdSnackBar} from '@angular/material';
import {DateTime, Label} from '../../../commons/';
import {Schedule} from '../schedule';
import {ScheduleService} from '../schedule.service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnChanges {
  @Input()
  schedule: Schedule;
  scheduleForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;
  private valid_from_unix: any;
  private valid_to_unix: any;

  constructor(private scheduleService: ScheduleService,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder,
              private convertTimestamp: DateTime) {
    this.createForm();
  }

  createForm() {
    this.scheduleForm = this.fb.group({
      id: {value: '', disabled: true},
      cron_expression: this.fb.group({
        minute: ['', [Validators.required, Validators.minLength(1)]],
        hour: ['', [Validators.required, Validators.minLength(1)]],
        dom: ['', [Validators.required, Validators.minLength(1)]],
        month: ['', [Validators.required, Validators.minLength(1)]],
        dow: ['', [Validators.required, Validators.minLength(1)]],
      }),
      valid_from: this.fb.group({
        year: null,
        month: null,
        day: null,
      }),
      valid_to: this.fb.group({
        year: null,
        month: null,
        day: null,
      }),
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
//        label: this.fb.array([]),
      }),
    });
  }

  updateData(schedule: Schedule) {
    const cron_splitted = schedule.cron_expression.split(' ');
    if (schedule.valid_from !== null) {
      const valid_from_splitted = this.convertTimestamp.convertTimestamp_s_to_yyyymmddhhmm(schedule.valid_from.seconds).split('-');
      this.scheduleForm.controls['valid_from'].setValue({
        year: valid_from_splitted[0],
        month: valid_from_splitted[1],
        day: valid_from_splitted[2],
      });
    } else {
      this.scheduleForm.controls['valid_from'].setValue({
        year: null,
        month: null,
        day: null,
      });
    }

    if (schedule.valid_to !== null) {
      const valid_to_splitted = this.convertTimestamp.convertTimestamp_s_to_yyyymmddhhmm(schedule.valid_to.seconds).split('-');
      this.scheduleForm.controls['valid_to'].setValue({
        year: valid_to_splitted[0],
        month: valid_to_splitted[1],
        day: valid_to_splitted[2],
      });
    } else {
      this.scheduleForm.controls['valid_to'].setValue({
        year: null,
        month: null,
        day: null,
      });
    }
    this.scheduleForm.controls['id'].setValue(schedule.id);
    this.scheduleForm.controls['cron_expression'].setValue({
      minute: cron_splitted[0],
      hour: cron_splitted[1],
      dom: cron_splitted[2],
      month: cron_splitted[3],
      dow: cron_splitted[4],
    });
    this.scheduleForm.controls['meta'].patchValue({
      name: schedule.meta.name as string,
      description: schedule.meta.description as string,
    });
    this.setLabel(schedule.meta.label);

  }

  ngOnChanges() {
    this.updateData(this.schedule);
  }

  createSchedule() {
    this.schedule = this.prepareSaveSchedule();
    this.scheduleService.createSchedule(this.schedule)
      .map((newSchedule: Schedule) => {
        this.createHandler(newSchedule);
      });
    this.mdSnackBar.open('Lagret');
  }

  updateSchedule(schedule: Schedule): void {
    this.schedule = this.prepareSaveSchedule();
    this.scheduleService.updateSchedule(this.schedule)
      .map((updatedSchedule: Schedule) => {
        this.updateHandler(updatedSchedule);
      });
    this.mdSnackBar.open('Lagret');
  }

  deleteSchedule(scheduleId): void {
    this.scheduleService.deleteSchedule(scheduleId)
      .map((deletedSchedule) => {
        this.deleteHandler(deletedSchedule);
        if (deletedSchedule === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet..');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  }


  prepareSaveSchedule(): Schedule {
    const formModel = this.scheduleForm.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // allow null and from_date
    if (formModel.valid_from.year !== null && formModel.valid_from.month !== null && formModel.valid_from.day !== null) {
      const
        valid_from = formModel.valid_from.year +
          '-' + formModel.valid_from.month +
          '-' + formModel.valid_from.day;
      this.valid_from_unix = {seconds: (this.convertTimestamp.convertTimestamp_yyyymmddhhmm_to_unix(valid_from) / 1000)};
    } else {
      this.valid_from_unix = null;
    }

    // allow null and a to date
    if (formModel.valid_to.year !== null && formModel.valid_to.month !== null && formModel.valid_to.day !== null) {
      const valid_to = formModel.valid_to.year + '-'
        + formModel.valid_to.month + '-'
        + formModel.valid_to.day;
      this.valid_to_unix = {seconds: (this.convertTimestamp.convertTimestamp_yyyymmddhhmm_to_unix(valid_to) / 1000)};
    } else {
      this.valid_to_unix = null;
    }

    const cron_expression = formModel.cron_expression.minute + ' '
      + formModel.cron_expression.hour + ' '
      + formModel.cron_expression.dom + ' '
      + formModel.cron_expression.month + ' '
      + formModel.cron_expression.dow;

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveSchedule: Schedule = {
      id: this.schedule.id,
      cron_expression: cron_expression,
      valid_from: this.valid_from_unix,
      valid_to: this.valid_to_unix,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        // created_by: '',
        // last_modified: null,
        last_modified_by: '',
        label: labelsDeepCopy
      }
    };
    return saveSchedule;
  }


  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.scheduleForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.scheduleForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.scheduleForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.scheduleForm.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }
}

