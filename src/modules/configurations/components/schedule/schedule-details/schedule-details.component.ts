import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import * as moment from 'moment';

import {
  ConfigObject,
  CrawlScheduleConfig,
  DateTime,
  Kind,
  Meta,
  VALID_CRON_DOM_PATTERN,
  VALID_CRON_DOW_PATTERN,
  VALID_CRON_HOUR_PATTERN,
  VALID_CRON_MINUTE_PATTERN,
  VALID_CRON_MONTH_PATTERN
} from '../../../../commons';
import {AuthService} from '../../../../core/services/auth';


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
  configObject: ConfigObject;

  @Output()
  save = new EventEmitter<ConfigObject>();

  @Output()
  update = new EventEmitter<ConfigObject>();
  // noinspection ReservedWordAsName

  @Output()
  delete = new EventEmitter<ConfigObject>();

  form: FormGroup;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
    this.createForm();
  }

  get canDelete(): boolean {
    return this.authService.isAdmin();
  }

  get canEdit(): boolean {
    return this.authService.isCurator() || this.authService.isAdmin();
  }

  get showSave(): boolean {
    return this.configObject && !this.configObject.id;
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

  get cronExpression() {
    return this.form.get('cronExpression');
  }

  get validFrom() {
    return this.form.get('validFrom');
  }

  get validTo() {
    return this.form.get('validTo');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject) {
      if (this.configObject) {
        this.updateForm();
      } else {
        this.form.reset();
      }
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.configObject);
  }

  onRevert() {
    this.updateForm();
  }

  protected createForm() {
    this.form = this.fb.group({
      id: {value: ''},
      validFrom: '',
      validTo: '',
      cronExpression: this.fb.group({
        minute: ['', [Validators.required, Validators.pattern(VALID_CRON_MINUTE_PATTERN)]],
        hour: ['', [Validators.required, Validators.pattern(VALID_CRON_HOUR_PATTERN)]],
        dom: ['', [Validators.required, Validators.pattern(VALID_CRON_DOM_PATTERN)]],
        month: ['', [Validators.required, Validators.pattern(VALID_CRON_MONTH_PATTERN)]],
        dow: ['', [Validators.required, Validators.pattern(VALID_CRON_DOW_PATTERN)]],
      }),
      meta: new Meta(),
    });
  }

  protected updateForm() {
    const [minute, hour, dom, month, dow] = this.configObject.crawlScheduleConfig.cronExpression.split(' ');
    this.form.setValue({
      id: this.configObject.id,
      validFrom: this.configObject.crawlScheduleConfig.validFrom
        ? DateTime.adjustTime(this.configObject.crawlScheduleConfig.validFrom)
        : null,
      validTo: this.configObject.crawlScheduleConfig.validTo
        ? DateTime.adjustTime(this.configObject.crawlScheduleConfig.validTo)
        : null,
      cronExpression: {
        minute: minute || '',
        hour: hour || '',
        dom: dom || '',
        month: month || '',
        dow: dow || '',
      },
      meta: this.configObject.meta,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): ConfigObject {
    const formModel = this.form.value;

    const configObject = new ConfigObject({kind: Kind.CRAWLSCHEDULECONFIG});
    if (this.configObject.id !== '') {
      configObject.id = this.configObject.id;
    }

    const crawlScheduleConfig = new CrawlScheduleConfig();
    const validFromUTC = DateTime.dateToUtc(moment(formModel.validFrom), true);
    const validToUTC = DateTime.dateToUtc(moment(formModel.validTo), false);

    crawlScheduleConfig.validFrom = validFromUTC ? validFromUTC : null;
    crawlScheduleConfig.validTo = validToUTC ? validToUTC : null;
    crawlScheduleConfig.cronExpression = this.setCronExpression(this.form.value.cronExpression);

    configObject.meta = formModel.meta;
    configObject.crawlScheduleConfig = crawlScheduleConfig;
    return configObject;
  }

  protected setCronExpression(cronExpression): string {
    const {minute, hour, dom, month, dow} = cronExpression;
    return minute + ' ' + hour + ' ' + dom + ' ' + month + ' ' + dow;
  }
}
