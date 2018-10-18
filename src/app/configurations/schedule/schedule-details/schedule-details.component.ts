import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateTime} from '../../../commons/datetime';
import {CrawlScheduleConfig, Meta} from '../../../commons/models/config.model';
import {
  VALID_CRON_DOM_PATTERN,
  VALID_CRON_DOW_PATTERN,
  VALID_CRON_HOUR_PATTERN,
  VALID_CRON_MINUTE_PATTERN,
  VALID_CRON_MONTH_PATTERN
} from '../../../commons/validator';
import {RoleService} from '../../../auth/role.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'nb-NO'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ScheduleDetailsComponent implements OnChanges {

  @Input()
  set data(show) {
    this.shouldShow = show;
  }

  @Input()
  schedule: CrawlScheduleConfig;
  @Input()
  equalValidFrom: boolean;
  @Input()
  equalValidTo: boolean;

  @Output()
  save = new EventEmitter<CrawlScheduleConfig>();
  @Output()
  update = new EventEmitter<CrawlScheduleConfig>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<CrawlScheduleConfig>();
  @Output()
  deleteValidFrom = new EventEmitter();
  @Output()
  deleteValidTo = new EventEmitter();

  form: FormGroup;
  shouldShow = true;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm({
      id: {value: '', disabled: true},
      valid_from: '',
      valid_to: '',
      cron_expression: this.fb.group({
        minute: ['', [Validators.required, Validators.pattern(new RegExp(VALID_CRON_MINUTE_PATTERN))]],
        hour: ['', [Validators.required, Validators.pattern(new RegExp(VALID_CRON_HOUR_PATTERN))]],
        dom: ['', [Validators.required, Validators.pattern(new RegExp(VALID_CRON_DOM_PATTERN))]],
        month: ['', [Validators.required, Validators.pattern(new RegExp(VALID_CRON_MONTH_PATTERN))]],
        dow: ['', [Validators.required, Validators.pattern(new RegExp(VALID_CRON_DOW_PATTERN))]],
      }),
      meta: new Meta(),
    });
  }

  get canDelete(): boolean {
    return this.roleService.isAdmin();
  }

  get canEdit(): boolean {
    return this.roleService.isCurator() || this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return this.schedule && !this.schedule.id;
  }

  get canSave(): boolean {
    return this.form.valid && this.canEdit;
  }

  get canUpdate() {
    return this.form.valid && this.form.dirty && this.canEdit;
  }

  get canRevert() {
    return this.canEdit && this.form.dirty;
  }

  get name() {
    return this.form.get('meta').value.name;
  }

  get cronExpression() {
    return this.form.get('cron_expression');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schedule && !changes.schedule.currentValue) {
      this.form.reset();
      return;
    }

    if (this.schedule) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.schedule);
  }

  onDeleteAllValidFrom(): void {
    this.form.markAsDirty();
    this.deleteValidFrom.emit(true);
  }

  onDeleteAllValidTo(): void {
    this.form.markAsDirty();
    this.deleteValidTo.emit(true);
  }

  onRevert() {
    this.updateForm();
  }

  private createForm(controlsConfig: object) {
    this.form = this.fb.group(controlsConfig);
  }

  updateForm() {
    const cronSplit = this.schedule.cron_expression.split(' ');
    this.form.patchValue({
      id: this.schedule.id,
      valid_from: this.schedule.valid_from ? DateTime.adjustTime(this.schedule.valid_from) : '',
      valid_to: this.schedule.valid_to ? DateTime.adjustTime(this.schedule.valid_to) : '',
      cron_expression: {
        minute: cronSplit[0],
        hour: cronSplit[1],
        dom: cronSplit[2],
        month: cronSplit[3],
        dow: cronSplit[4],
      },
      meta: this.schedule.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private setCronExpression(formModel): string {
    return formModel.minute + ' '
      + formModel.hour + ' '
      + formModel.dom + ' '
      + formModel.month + ' '
      + formModel.dow;
  }

  private prepareSave(): CrawlScheduleConfig {
    const formModel = this.form.value;
    const formCronExpression = this.form.value.cron_expression;
    const validFromUTC = DateTime.dateToUtc(moment(formModel.valid_from), true);
    const validToUTC = DateTime.dateToUtc(moment(formModel.valid_to), false);
    const cronExpression = this.setCronExpression(formCronExpression);
    return {

      id: this.schedule.id,
      cron_expression: cronExpression,
      valid_from: validFromUTC ? validFromUTC : null,
      valid_to: validToUTC ? validToUTC : null,
      meta: formModel.meta,
    };
  }
}

