import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {PolitenessConfigDetailsComponent} from '..';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind, Label, RobotsPolicy} from '../../../../../shared/models/config';
import {NUMBER_OR_EMPTY_STRING} from '../../../../../shared/validation/patterns';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';

@Component({
  selector: 'app-politenessconfig-multi-dialog',
  templateUrl: './politenessconfig-multi-dialog.component.html',
  styleUrls: ['./politenessconfig-multi-dialog.component.css']
})
export class PolitenessConfigMultiDialogComponent extends PolitenessConfigDetailsComponent implements OnInit {

  allSelected = false;
  shouldAddLabel = undefined;
  shouldAddSelector = undefined;

  @ViewChild(LabelMultiComponent) labelMulti: LabelMultiComponent;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<PolitenessConfigMultiDialogComponent>) {
    super(fb, authService);
    this.configObject = this.data.configObject;
    this.robotsPolicies = this.data.options.robotsPolicies;
    this.allSelected = this.data.allSelected;
  }

  get canUpdate(): boolean {
    return this.form.valid && (
      this.form.dirty
      || ((this.shouldAddSelector !== undefined && this.crawlHostGroupSelectorList.value.length)
        || (this.shouldAddLabel !== undefined && this.labelList.value.length)
        || (this.robotsPolicy.enabled && (this.allSelected || this.configObject.politenessConfig.robotsPolicy === undefined))
      ));
  }

  get canRevert(): boolean {
    return this.form.dirty
      || (this.robotsPolicy.enabled && this.configObject.politenessConfig.robotsPolicy === undefined)
      || (this.shouldAddLabel !== undefined)
      || (this.shouldAddSelector !== undefined);
  }

  get labelList(): AbstractControl {
    return this.form.get('labelList');
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onEnableRobotsPolicy() {
    if (this.robotsPolicy.disabled) {
      this.robotsPolicy.enable();
    }
  }

  onToggleShouldAddSelector(shouldAdd: boolean): void {
    this.shouldAddSelector = shouldAdd;
    this.crawlHostGroupSelectorList.patchValue([]);
  }

  onUpdateLabels({add, labels}: { add: boolean, labels: Label[] }) {
    this.form.patchValue({
      labelList: labels
    });
    this.shouldAddLabel = add;
  }

  onRevert() {
    this.shouldAddLabel = undefined;
    this.labelMulti.onRevert();
    super.onRevert();
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []},
      robotsPolicy: '',
      minimumRobotsValidityDurationS: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      customRobots: null,
      minTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxTimeBetweenPageLoadMs: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      delayFactor: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      maxRetries: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      retryDelaySeconds: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      crawlHostGroupSelectorList: '',
    });
  }

  protected updateForm() {
    this.form.setValue({
      labelList: this.configObject.meta.labelList,
      robotsPolicy: this.configObject.politenessConfig.robotsPolicy || RobotsPolicy.OBEY_ROBOTS,
      minimumRobotsValidityDurationS: this.configObject.politenessConfig.minimumRobotsValidityDurationS || '',
      customRobots: this.configObject.politenessConfig.customRobots,
      minTimeBetweenPageLoadMs: this.configObject.politenessConfig.minTimeBetweenPageLoadMs || '',
      maxTimeBetweenPageLoadMs: this.configObject.politenessConfig.maxTimeBetweenPageLoadMs || '',
      delayFactor: this.configObject.politenessConfig.delayFactor || '',
      maxRetries: this.configObject.politenessConfig.maxRetries || '',
      retryDelaySeconds: this.configObject.politenessConfig.retryDelaySeconds || '',
      crawlHostGroupSelectorList: [[]]
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (this.configObject.politenessConfig.robotsPolicy === undefined) {
      this.robotsPolicy.disable();
    }
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): any {
    const pathList: string[] = [];

    const formModel = this.form.value;

    const updateTemplate = new ConfigObject({kind: Kind.POLITENESSCONFIG});
    const politenessConfig = updateTemplate.politenessConfig;

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.meta.labelList = formModel.labelList;
      if (this.shouldAddLabel) {
        pathList.push('meta.label+');
      } else {
        pathList.push('meta.label-');
      }
    }

    if (this.robotsPolicy.enabled && (this.allSelected || formModel.robotsPolicy !== this.configObject.politenessConfig.robotsPolicy)) {
      politenessConfig.robotsPolicy = formModel.robotsPolicy;
      pathList.push('politenessConfig.robotsPolicy');
    }

    if (this.customRobots.dirty && (this.allSelected || formModel.customRobots !== this.configObject.politenessConfig.customRobots)) {
      politenessConfig.customRobots = formModel.customRobots;
      pathList.push('politenessConfig.customRobots');

    }

    if (this.minRobotsValidDurationSec.dirty
      && (this.allSelected
        || formModel.minimumRobotsValidityDurationS !== this.configObject.politenessConfig.minimumRobotsValidityDurationS)) {
      politenessConfig.minimumRobotsValidityDurationS = formModel.minimumRobotsValidityDurationS;
      pathList.push('politenessConfig.minimumRobotsValidityDurationS');
    }

    if (this.minTimeBetweenPageloadMs.dirty
      && (this.allSelected
        || formModel.minTimeBetweenPageLoadMs !== this.configObject.politenessConfig.minTimeBetweenPageLoadMs)) {
      politenessConfig.minTimeBetweenPageLoadMs = formModel.minTimeBetweenPageLoadMs;
      pathList.push('politenessConfig.minTimeBetweenPageLoadMs');
    }

    if (this.maxTimeBetweenPageloadMs.dirty
      && (this.allSelected
        || formModel.maxTimeBetweenPageLoadMs !== this.configObject.politenessConfig.maxTimeBetweenPageLoadMs)) {
      politenessConfig.maxTimeBetweenPageLoadMs = formModel.maxTimeBetweenPageLoadMs;
      pathList.push('politenessConfig.maxTimeBetweenPageLoadMs');
    }

    if (this.delayFactor.dirty && (this.allSelected || formModel.delayFactor !== this.configObject.politenessConfig.delayFactor)) {
      politenessConfig.delayFactor = formModel.delayFactor;
      pathList.push('politenessConfig.delayFactor');
    }

    if (this.maxRetries.dirty && (this.allSelected || formModel.maxRetries !== this.configObject.politenessConfig.maxRetries)) {
      politenessConfig.maxRetries = formModel.maxRetries;
      pathList.push('politenessConfig.maxRetries');
    }

    if (this.retryDelaySeconds.dirty
      && (this.allSelected || formModel.retryDelaySeconds !== this.configObject.politenessConfig.retryDelaySeconds)) {
      politenessConfig.retryDelaySeconds = formModel.retryDelaySeconds;
      pathList.push('politenessConfig.retryDelaySeconds');
    }

    if (this.crawlHostGroupSelectorList.value.length && this.shouldAddSelector !== undefined) {
      politenessConfig.crawlHostGroupSelectorList = formModel.crawlHostGroupSelectorList.map(label => label.key + ':' + label.value);
      if (this.shouldAddSelector) {
        pathList.push('politenessConfig.crawlHostGroupSelector+');
      } else {
        pathList.push('politenessConfig.crawlHostGroupSelector-');
      }
    }

    return {updateTemplate, pathList};
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }
}
