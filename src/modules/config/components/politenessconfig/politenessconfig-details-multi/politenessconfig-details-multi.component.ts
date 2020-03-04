import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../../../shared/validation/patterns';
import {ConfigObject, Kind, Label} from '../../../../../shared/models';
import {PolitenessConfigDetailsComponent} from '../politenessconfig-details/politenessconfig-details.component';
import {RobotsPolicy} from '../../../../../shared/models/config/politenessconfig.model';

@Component({
  selector: 'app-politenessconfig-details-multi',
  templateUrl: './politenessconfig-details-multi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolitenessConfigDetailsMultiComponent extends PolitenessConfigDetailsComponent {

  allSelected = false;
  // adding or subtracting labels ect when updating multiple configs.
  shouldAddLabel = undefined;
  shouldAddSelector = undefined;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
    super(fb, authService);
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

  onEnableRobotsPolicy() {
    if (this.robotsPolicy.disabled) {
      this.robotsPolicy.enable();
    }
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    if (shouldAdd !== undefined) {
      this.labelList.enable();
    }
  }

  onToggleShouldAddSelector(shouldAdd: boolean): void {
    this.shouldAddSelector = shouldAdd;
    if (shouldAdd !== undefined) {
      this.crawlHostGroupSelectorList.enable();
    }
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
      crawlHostGroupSelectorList: this.configObject.politenessConfig.crawlHostGroupSelectorList.map(selector => {
        const parts = selector.split(':', 2);
        const key = parts.shift();
        const value = parts.join(':');
        return new Label({key, value});
      })
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.labelList.disable();
    this.crawlHostGroupSelectorList.disable();
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
}
