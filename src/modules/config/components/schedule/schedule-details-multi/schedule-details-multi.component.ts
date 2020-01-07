import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import {ConfigObject, DateTime, Kind} from '../../../../commons';
import {AuthService} from '../../../../core/services/auth';
import {ScheduleDetailsComponent} from '../schedule-details/schedule-details.component';


@Component({
  selector: 'app-schedule-details-multi',
  templateUrl: './schedule-details-multi.component.html',
  styleUrls: ['../schedule-details/schedule-details.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'nb-NO'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ScheduleDetailsMultiComponent extends ScheduleDetailsComponent {

  shouldAddLabel = undefined;
  allSelected = false;
  shouldRemoveValidFromTo = false;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
    super(fb, authService);
  }

  get labelList() {
    return this.form.get('labelList');
  }

  get canUpdate(): boolean {
    return this.form.valid && (
      this.form.dirty
      || (this.shouldAddLabel !== undefined && this.labelList.value.length)
    );
  }

  get canRevert(): boolean {
    return this.form.dirty
      || this.shouldAddLabel !== undefined;
  }

  get validFrom() {
    return this.form.get('validFrom');
  }

  get validTo() {
    return this.form.get('validTo');
  }

  shouldDisableValidFromTo() {
    if (this.configObject.crawlScheduleConfig.validFrom !== undefined) {
      this.validFrom.enable();
    } else {
      this.validFrom.disable();
    }

    if (this.configObject.crawlScheduleConfig.validTo !== undefined) {
      this.validTo.enable();
    } else {
      this.validTo.disable();
    }
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    if (shouldAdd !== undefined) {
      this.labelList.enable();
    }
  }

  onRemoveValidFromTo(): void {
    this.validFrom.enable();
    this.validTo.enable();

    this.form.patchValue({
      validFrom: null,
      validTo: null
    });
    this.form.markAsDirty();
    this.form.markAsTouched();
    this.shouldRemoveValidFromTo = true;
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []},
      validFrom: '',
      validTo: '',
    });
  }

  protected updateForm() {
    this.form.setValue({
      labelList: this.configObject.meta.labelList,
      validFrom: this.configObject.crawlScheduleConfig.validFrom
        ? DateTime.adjustTime(this.configObject.crawlScheduleConfig.validFrom)
        : null,
      validTo: this.configObject.crawlScheduleConfig.validTo
        ? DateTime.adjustTime(this.configObject.crawlScheduleConfig.validTo)
        : null,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.shouldDisableValidFromTo();
    this.labelList.disable();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): any {
    const formModel = this.form.value;
    const pathList: string[] = [];

    const updateTemplate = new ConfigObject({kind: Kind.CRAWLSCHEDULECONFIG});
    const crawlScheduleConfig = updateTemplate.crawlScheduleConfig;

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.meta.labelList = formModel.labelList;
      if (this.shouldAddLabel) {
        pathList.push('meta.label+');
      } else {
        pathList.push('meta.label-');
      }
    }

    // BUG in backend sets date to 1.1.1970 when validFrom/validTo is empty

    if (this.validFrom.dirty && (this.allSelected || formModel.validFrom !== this.configObject.crawlScheduleConfig.validFrom)) {
      crawlScheduleConfig.validFrom = formModel.validFrom ? DateTime.dateToUtc(formModel.validFrom, true) : null;
      pathList.push('crawlScheduleConfig.validFrom');
    }

    if (this.validTo.dirty && (this.allSelected || formModel.validTo !== this.configObject.crawlScheduleConfig.validTo)) {
      crawlScheduleConfig.validTo = formModel.validTo ? DateTime.dateToUtc(formModel.validTo, false) : null;
      pathList.push('crawlScheduleConfig.validTo');
    }

    if (this.shouldRemoveValidFromTo)  {
      crawlScheduleConfig.validFrom = '';
      crawlScheduleConfig.validTo = '';
      pathList.push('crawlScheduleConfig.validFrom', 'crawlScheduleConfig.validTo');
    }

    return {updateTemplate, pathList};
  }
}
