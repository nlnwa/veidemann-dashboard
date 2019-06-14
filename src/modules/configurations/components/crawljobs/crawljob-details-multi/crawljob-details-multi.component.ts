import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {NUMBER_OR_EMPTY_STRING} from '../../../../commons/validator/patterns';
import {ConfigObject, Kind} from '../../../../commons/models';
import {CrawljobDetailsComponent} from '../crawljob-details/crawljob-details.component';


@Component({
  templateUrl: './crawljob-details-multi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawljobDetailsMultiComponent extends CrawljobDetailsComponent {

  shouldAddLabel: boolean = undefined;
  allSelected = false;

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

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    if (shouldAdd !== undefined) {
      this.labelList.enable();
    }
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []},
      scheduleRef: this.fb.group({
        id: '',
        kind: Kind.CRAWLSCHEDULECONFIG,
      }),
      crawlConfigRef: this.fb.group({
        id: '',
        kind: Kind.CRAWLCONFIG,
      }),
      disabled: {value: '', disabled: true},
      limits: this.fb.group({
        depth: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        maxDurationS: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
        maxBytes: ['', [Validators.pattern(NUMBER_OR_EMPTY_STRING)]],
      })
    });
  }

  protected updateForm() {
    if (this.configObject.crawlJob.disabled !== undefined) {
      this.disabled.enable();
    } else {
      this.disabled.disable();
    }
    this.form.setValue({
      labelList: this.configObject.meta.labelList,
      disabled: !!this.configObject.crawlJob.disabled,
      scheduleRef: this.configObject.crawlJob.scheduleRef,
      crawlConfigRef: this.configObject.crawlJob.crawlConfigRef,
      limits: {
        depth: this.configObject.crawlJob.limits.depth || '',
        maxDurationS: this.configObject.crawlJob.limits.maxDurationS || '',
        maxBytes: this.configObject.crawlJob.limits.maxBytes || '',
      },
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.labelList.disable();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): any {
    const pathList: string[] = [];

    const formModel = this.form.value;

    const updateTemplate = new ConfigObject({kind: Kind.CRAWLJOB});
    const crawlJob = updateTemplate.crawlJob;

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.meta.labelList = formModel.labelList;
      if (this.shouldAddLabel) {
        pathList.push('meta.label+');
      } else {
        pathList.push('meta.label-');
      }
    }

    if (this.disabled.dirty && formModel.disabled !== undefined) {
      crawlJob.disabled = formModel.disabled;
      pathList.push('crawlJob.disabled');
    }

    if (this.depth.dirty &&
      (this.allSelected || formModel.limits.depth !== this.configObject.crawlJob.limits.depth)) {
      crawlJob.limits.depth = formModel.limits.depth;
      pathList.push('crawlJob.limits.depth');
    }

    if (this.maxBytes.dirty &&
      (this.allSelected || formModel.limits.maxBytes !== this.configObject.crawlJob.limits.maxBytes)) {
      crawlJob.limits.maxBytes = formModel.limits.maxBytes;
      pathList.push('crawlJob.limits.maxBytes');
    }

    if (this.maxDurationSeconds.dirty &&
      (this.allSelected || formModel.limits.maxDurationS !== this.configObject.crawlJob.limits.maxDurationS)) {
      crawlJob.limits.maxDurationS = formModel.limits.maxDurationS;
      pathList.push('crawlJob.limits.maxDurationS');
    }

    if (formModel.scheduleRef.id &&
      this.scheduleRef.dirty && (this.allSelected || formModel.scheduleRef !== this.configObject.crawlJob.scheduleRef)) {
      crawlJob.scheduleRef = formModel.scheduleRef;
      pathList.push('crawlJob.scheduleRef');
    } else {
      updateTemplate.crawlJob.scheduleRef = null;
    }

    if (formModel.crawlConfigRef.id && this.crawlConfigRef.dirty &&
      (this.allSelected || formModel.crawlConfigRef !== this.configObject.crawlJob.crawlConfigRef)) {
      crawlJob.crawlConfigRef = formModel.crawlConfigRef;
      pathList.push('crawlJob.crawlConfigRef');
    } else {
      crawlJob.crawlConfigRef = null;
    }

    return {updateTemplate, pathList};
  }
}
