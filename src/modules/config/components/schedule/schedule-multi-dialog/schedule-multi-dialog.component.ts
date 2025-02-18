import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ScheduleDetailsComponent} from '..';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind, Label} from '../../../../../shared/models/config';
import {DateTime} from '../../../../../shared/func';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';

@Component({
    selector: 'app-schedule-multi-dialog',
    templateUrl: './schedule-multi-dialog.component.html',
    styleUrls: ['./schedule-multi-dialog.component.css'],
    standalone: false
})
export class ScheduleMultiDialogComponent extends ScheduleDetailsComponent implements OnInit {

  shouldAddLabel = undefined;
  allSelected = false;
  shouldRemoveValidFromTo = false;

  @ViewChild(LabelMultiComponent) labelMulti: LabelMultiComponent;

  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<ScheduleMultiDialogComponent>) {
    super(fb, authService);
    this.configObject = this.data.configObject;
    this.allSelected = this.data.allSelected;
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

  ngOnInit(): void {
    this.updateForm();
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

  onRevert() {
    this.shouldAddLabel = undefined;
    this.labelMulti.onRevert();
    super.onRevert();
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

  onUpdateLabels({add, labels}: { add: boolean, labels: Label[] }) {
    this.form.patchValue({
      labelList: labels
    });
    this.shouldAddLabel = add;
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: [], disabled: false},
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

    if (this.shouldRemoveValidFromTo) {
      crawlScheduleConfig.validFrom = '';
      crawlScheduleConfig.validTo = '';
      pathList.push('crawlScheduleConfig.validFrom', 'crawlScheduleConfig.validTo');
    }

    return {updateTemplate, pathList};
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }

}
