import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateTime} from '../../../commons/';
import {ScheduleService} from '../schedule.service';
import {Schedule} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css'],
})
export class ScheduleDetailsComponent implements OnChanges {
  @Input()
  schedule: Schedule;

  _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  set form(form: FormGroup) {
    this._form = form;
  }

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  private valid_from_unix: any;
  private valid_to_unix: any;

  constructor(private scheduleService: ScheduleService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
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
        label: [],
      }),
    });
  }

  updateData(schedule: Schedule) {
    const cron_splitted = schedule.cron_expression.split(' ');
    if (schedule.valid_from !== null) {
      const valid_from_splitted = DateTime.convertTimestamp_s_to_yyyymmddhhmm(schedule.valid_from.seconds).split('-');
      this.form.controls['valid_from'].setValue({
        year: valid_from_splitted[0],
        month: valid_from_splitted[1],
        day: valid_from_splitted[2],
      });
    } else {
      this.form.controls['valid_from'].setValue({
        year: null,
        month: null,
        day: null,
      });
    }

    if (schedule.valid_to !== null) {
      const valid_to_splitted = DateTime.convertTimestamp_s_to_yyyymmddhhmm(schedule.valid_to.seconds).split('-');
      this.form.controls['valid_to'].setValue({
        year: valid_to_splitted[0],
        month: valid_to_splitted[1],
        day: valid_to_splitted[2],
      });
    } else {
      this.form.controls['valid_to'].setValue({
        year: null,
        month: null,
        day: null,
      });
    }
    this.form.controls['id'].setValue(schedule.id);
    this.form.controls['cron_expression'].setValue({
      minute: cron_splitted[0],
      hour: cron_splitted[1],
      dom: cron_splitted[2],
      month: cron_splitted[3],
      dow: cron_splitted[4],
    });
    this.form.controls['meta'].patchValue({
      name: schedule.meta.name as string,
      description: schedule.meta.description as string,
      label: [...schedule.meta.label],
    });
    this.form.markAsPristine();

  }

  ngOnChanges() {
    this.updateData(this.schedule);
  }

  createSchedule() {
    this.schedule = this.prepareSaveSchedule();
    this.scheduleService.create(this.schedule)
      .subscribe((newSchedule: Schedule) => {
        this.createHandler(newSchedule);
      });
    this.snackBarService.openSnackBar('Lagret');
  }

  updateSchedule(schedule: Schedule): void {
    this.schedule = this.prepareSaveSchedule();
    this.scheduleService.update(this.schedule)
      .subscribe((updatedSchedule: Schedule) => {
        this.updateHandler(updatedSchedule);
      });
    this.snackBarService.openSnackBar('Lagret');
  }

  deleteSchedule(scheduleId): void {
    this.scheduleService.delete(scheduleId)
      .subscribe((deletedSchedule) => {
        this.deleteHandler(deletedSchedule).subscribe();
        if (deletedSchedule === 'not_allowed') {
          this.snackBarService.openSnackBar('Feil: Ikke slettet..');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  }


  prepareSaveSchedule(): Schedule {
    const formModel = this.form.value;
    // deep copy of form model lairs
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));

    // allow null and from_date
    if (formModel.valid_from.year !== null && formModel.valid_from.month !== null && formModel.valid_from.day !== null) {
      const
        valid_from = formModel.valid_from.year +
          '-' + formModel.valid_from.month +
          '-' + formModel.valid_from.day;
      this.valid_from_unix = {seconds: (DateTime.convertTimestamp_yyyymmddhhmm_to_unix(valid_from) / 1000)};
    } else {
      this.valid_from_unix = null;
    }

    // allow null and a to date
    if (formModel.valid_to.year !== null && formModel.valid_to.month !== null && formModel.valid_to.day !== null) {
      const valid_to = formModel.valid_to.year + '-'
        + formModel.valid_to.month + '-'
        + formModel.valid_to.day;
      this.valid_to_unix = {seconds: (DateTime.convertTimestamp_yyyymmddhhmm_to_unix(valid_to) / 1000)};
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
    return {
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
  }

  revert() {
    this.ngOnChanges();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }
}

