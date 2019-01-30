import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateTime} from '../../../commons/datetime';
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
import {ConfigObject} from '../../../commons/models/configobject.model';
import {Meta} from '../../../commons/models/meta/meta.model';
import {CrawlScheduleConfig} from '../../../commons/models';
import {Kind} from '../../../commons/models/kind.model';

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
  configObject: ConfigObject;
  @Input()
  equalValidFrom: boolean;
  @Input()
  equalValidTo: boolean;

  @Output()
  save = new EventEmitter<ConfigObject>();
  @Output()
  update = new EventEmitter<ConfigObject>();
  // noinspection ReservedWordAsName
  @Output()
  delete = new EventEmitter<ConfigObject>();
  @Output()
  deleteValidFrom = new EventEmitter();
  @Output()
  deleteValidTo = new EventEmitter();

  form: FormGroup;
  shouldShow = true;
  shouldAddLabel = undefined;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm({
      id: {value: '', disabled: true},
      validFrom: '',
      validTo: '',
      cronExpression: this.fb.group({
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

  get name() {
    return this.form.get('meta').value.name;
  }

  get cronExpression() {
    return this.form.get('cronExpression');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.configObject && !changes.configObject.currentValue) {
      this.form.reset();
      return;
    }

    if (this.configObject) {
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
    this.delete.emit(this.configObject);
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

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    this.form.controls.meta.markAsDirty();
  }

  private createForm(controlsConfig: object) {
    this.form = this.fb.group(controlsConfig);
  }

  updateForm() {
    const cronSplit = this.configObject.crawlScheduleConfig.cronExpression.split(' ');
    this.form.patchValue({
      id: this.configObject.id,
      validFrom: this.configObject.crawlScheduleConfig.validFrom ? DateTime.adjustTime(this.configObject.crawlScheduleConfig.validFrom) : '',
      validTo: this.configObject.crawlScheduleConfig.validTo ? DateTime.adjustTime(this.configObject.crawlScheduleConfig.validTo) : '',
      cronExpression: {
        minute: cronSplit[0],
        hour: cronSplit[1],
        dom: cronSplit[2],
        month: cronSplit[3],
        dow: cronSplit[4],
      },
      meta: this.configObject.meta,
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

  private prepareSave(): ConfigObject {
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
}
