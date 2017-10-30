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
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  form: FormGroup;

  // Regular expressions for cron expression
  minuteRegEx = new RegExp([/^[*]$|^(([*][\/])?([0-9]|[1-5]?[0-9]))$/
    , /|^([0-9]|[1-5]?[0-9])((,([0-9]|[1-5]?[0-9]))|(-([0-9]|[1-5]?[0-9])))*$/
  ].map(r => r.source).join(''));

  hourRegEx = new RegExp([/^[*]$|^([0-9]|1[0-9]|2[0-3])/
    , /((,([0-9]|1[0-9]|2[0-3]))|(-([0-9]|1[0-9]|2[0-3])))*$/
  ].map(r => r.source).join(''));

  domRegEx = new RegExp([/^[*]$|^([1-9]|1[0-9]|2[0-9]|3[0-1])/
    , /((,([1-9]|1[0-9]|2[0-9]|3[0-1]))|(-([1-9]|1[0-9]|2[0-9]|3[0-1])))*$/
  ].map(r => r.source).join(''));

  monthRegEx = new RegExp(['^[*]$|^([1-9]|1[0-2]|(jan)|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|(dec))',
    '((,([1-9]|1[0-2]|(jan)|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|(dec)))|(-([1-9]|1[0-2]|(jan)',
    '|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|(dec))))*$'].join(''));

  dowRegEx = new RegExp([/^[*]$|^([0-6]|(mon)|(tue)|(wed)|(thu)|(fri)|(sat)|(sun))/
    , /((,([0-6]|(mon)|(tue)|(wed)|(thu)|(fri)|(sat)|(sun)))|(-([0-6]|(mon)|(tue)|(wed)|(thu)|(fri)|(sat)|(sun))))*$/
  ].map(r => r.source).join(''));

  // Regular expression for valid from/to
  yyyyRegEx = /[2-9][0-9][0-9][0-9]/;
  mmRegEx = /^0?[1-9]$|^1[0-2]$/;
  ddRegEx = /^0?[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/;

  constructor(private scheduleService: ScheduleService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      cron_expression: this.fb.group({
        minute: ['', [Validators.required, Validators.pattern(this.minuteRegEx)]],
        hour: ['', [Validators.required, Validators.pattern(this.hourRegEx)]],
        dom: ['', [Validators.required, Validators.pattern(this.domRegEx)]],
        month: ['', [Validators.required, Validators.pattern(this.monthRegEx)]],
        dow: ['', [Validators.required, Validators.pattern(this.dowRegEx)]],
      }),
      valid_from: this.fb.group({
        year: ['', [Validators.maxLength(4), Validators.pattern(this.yyyyRegEx)]],
        month: ['', [Validators.maxLength(2), Validators.pattern(this.mmRegEx)]],
        day: ['', [Validators.maxLength(2), Validators.pattern(this.ddRegEx)]]
      }),
      valid_to: this.fb.group({
        year: ['', [Validators.maxLength(4), Validators.pattern(this.yyyyRegEx)]],
        month: ['', [Validators.maxLength(2), Validators.pattern(this.mmRegEx)]],
        day: ['', [Validators.maxLength(2), Validators.pattern(this.ddRegEx)]]
      }),
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        label: [],
      }),
    });
  }

  updateForm(schedule: Schedule) {
    const cron_splitted = schedule.cron_expression.split(' ');
    if (schedule.valid_from !== null) {
      const {year, month, day,} = DateTime.fromSecondsToDateUTC(this.schedule.valid_from.seconds);
      this.form.controls['valid_from'].setValue({
        year: year,
        month: month + 1,
        day: day,
      });
    } else {
      this.form.controls['valid_from'].setValue({
        year: '',
        month: '',
        day: '',
      });
    }

    if (schedule.valid_to !== null) {
      const {year, month, day,} = DateTime.fromSecondsToDateUTC(this.schedule.valid_to.seconds);
      this.form.controls['valid_to'].setValue({
        year: year,
        month: month + 1,
        day: day,
      });
    } else {
      this.form.controls['valid_to'].setValue({
        year: '',
        month: '',
        day: '',
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
    this.updateForm(this.schedule);
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
      .subscribe((response) => {
        this.deleteHandler(scheduleId);
        if (response instanceof Object) {
          this.snackBarService.openSnackBar('Feil: Ikke slettet..');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  }

  setCronExpression(formModel) {
    return formModel.minute + ' '
      + formModel.hour + ' '
      + formModel.dom + ' '
      + formModel.month + ' '
      + formModel.dow;
  }

  prepareSaveSchedule(): Schedule {
    const formModel = this.form.value;
    const formCronExpression = this.form.value.cron_expression;
    const formValidFrom = this.form.value.valid_from;
    const formValidTo = this.form.value.valid_to;
    const validFrom = DateTime.setValidFromSecondsUTC(formValidFrom.year, formValidFrom.month, formValidFrom.day);
    const validTo = DateTime.setValidToSecondsUTC(formValidTo.year, formValidTo.month, formValidTo.day);
    const cronExpression = this.setCronExpression(formCronExpression);

    return {
      id: this.schedule.id,
      cron_expression: cronExpression,
      valid_from: {seconds: validFrom},
      valid_to: {seconds: validTo},
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        // created_by: '',
        // last_modified: null,
        last_modified_by: '',
        label: formModel.meta.label.map(label => ({...label})),
      }
    };
  }

  revert() {
    this.ngOnChanges();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }
}

