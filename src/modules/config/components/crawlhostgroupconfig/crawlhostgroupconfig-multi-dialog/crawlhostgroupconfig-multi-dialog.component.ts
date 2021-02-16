import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CrawlHostGroupConfigDetailsComponent} from '..';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind, Label} from '../../../../../shared/models/config';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {NUMBER_OR_EMPTY_STRING} from '../../../../../shared/validation/patterns';

@Component({
  selector: 'app-crawlhostgroupconfig-multi-dialog',
  templateUrl: './crawlhostgroupconfig-multi-dialog.component.html',
  styleUrls: ['./crawlhostgroupconfig-multi-dialog.component.css']
})
export class CrawlHostGroupConfigMultiDialogComponent extends CrawlHostGroupConfigDetailsComponent implements OnInit {

  shouldAddLabel = undefined;
  allSelected = false;

  @ViewChild(LabelMultiComponent) labelMulti: LabelMultiComponent;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<CrawlHostGroupConfigMultiDialogComponent>) {
    super(fb, authService);
    this.configObject = this.data.configObject;
    this.allSelected = this.data.allSelected;
  }

  get labelList(): AbstractControl {
    return this.form.get('labelList');
  }

  get canUpdate(): boolean {
    return this.form.valid && (
      this.form.dirty
      || (this.shouldAddLabel !== undefined && this.labelList.value.length)
    );
  }

  get canRevert(): boolean {
    return this.form.dirty || this.shouldAddLabel !== undefined;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onRevert() {
    this.shouldAddLabel = undefined;
    this.labelMulti.onRevert();
    super.onRevert();
  }

  onUpdateLabels({add, labels}: { add: boolean, labels: Label[] }) {
    this.form.patchValue({
      labelList: labels
    });
    this.shouldAddLabel = add;
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []},
      minTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      delayFactor: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxRetries: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      retryDelaySeconds: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
    });
  }

  protected updateForm() {
    this.form.setValue({
      labelList: this.configObject.meta.labelList,
      minTimeBetweenPageLoadMs: this.configObject.crawlHostGroupConfig.minTimeBetweenPageLoadMs || '',
      maxTimeBetweenPageLoadMs: this.configObject.crawlHostGroupConfig.maxTimeBetweenPageLoadMs || '',
      delayFactor: this.configObject.crawlHostGroupConfig.delayFactor || '',
      maxRetries: this.configObject.crawlHostGroupConfig.maxRetries || '',
      retryDelaySeconds: this.configObject.crawlHostGroupConfig.retryDelaySeconds || '',
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): any {
    const formModel = this.form.value;
    const pathList: string[] = [];
    const updateTemplate = new ConfigObject({
      kind: Kind.CRAWLHOSTGROUPCONFIG,
    });
    const crawlHostGroupConfig = updateTemplate.crawlHostGroupConfig;

    if (this.minTimeBetweenPageloadMs.dirty
      && (this.allSelected
        || formModel.minTimeBetweenPageLoadMs !== this.configObject.crawlHostGroupConfig.minTimeBetweenPageLoadMs)) {
      crawlHostGroupConfig.minTimeBetweenPageLoadMs = formModel.minTimeBetweenPageLoadMs;
      pathList.push('crawlHostGroupConfig.minTimeBetweenPageLoadMs');
    }

    if (this.maxTimeBetweenPageloadMs.dirty
      && (this.allSelected
        || formModel.maxTimeBetweenPageLoadMs !== this.configObject.crawlHostGroupConfig.maxTimeBetweenPageLoadMs)) {
      crawlHostGroupConfig.maxTimeBetweenPageLoadMs = formModel.maxTimeBetweenPageLoadMs;
      pathList.push('crawlHostGroupConfig.maxTimeBetweenPageLoadMs');
    }

    if (this.delayFactor.dirty && (this.allSelected || formModel.delayFactor !== this.configObject.crawlHostGroupConfig.delayFactor)) {
      crawlHostGroupConfig.delayFactor = formModel.delayFactor;
      pathList.push('crawlHostGroupConfig.delayFactor');
    }

    if (this.maxRetries.dirty && (this.allSelected || formModel.maxRetries !== this.configObject.crawlHostGroupConfig.maxRetries)) {
      crawlHostGroupConfig.maxRetries = formModel.maxRetries;
      pathList.push('crawlHostGroupConfig.maxRetries');
    }

    if (this.retryDelaySeconds.dirty
      && (this.allSelected || formModel.retryDelaySeconds !== this.configObject.crawlHostGroupConfig.retryDelaySeconds)) {
      crawlHostGroupConfig.retryDelaySeconds = formModel.retryDelaySeconds;
      pathList.push('crawlHostGroupConfig.retryDelaySeconds');
    }

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.meta.labelList = formModel.labelList;
      if (this.shouldAddLabel) {
        pathList.push('meta.label+');
      } else {
        pathList.push('meta.label-');
      }
    }

    return {updateTemplate, pathList};
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }

}
