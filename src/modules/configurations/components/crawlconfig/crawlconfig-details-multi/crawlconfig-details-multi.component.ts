import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NUMBER_OR_EMPTY_STRING} from '../../../../commons/validator/patterns';
import {ConfigObject, ConfigRef, CrawlConfig, Kind} from '../../../../commons/models';
import {CrawlConfigDetailsComponent} from '../crawlconfig-details/crawlconfig-details.component';
import {RoleService} from '../../../../core/services/auth';

@Component({
  templateUrl: './crawlconfig-details-multi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlConfigDetailsMultiComponent extends CrawlConfigDetailsComponent {

  shouldAddLabel = undefined;
  allSelected = false;

  constructor(protected fb: FormBuilder, protected roleService: RoleService) {
    super(fb, roleService);
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

  onRevert() {
    this.shouldAddLabel = undefined;
    super.onRevert();
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []},
      collectionRefId: '',
      browserConfigRefId: '',
      politenessRefId: '',
      extra: this.fb.group({
        extractText: {value: '', disabled: true},
        createScreenshot: {value: '', disabled: true},
      }),
      minimumDnsTtlS: ['', Validators.pattern(NUMBER_OR_EMPTY_STRING)],
      priorityWeight: ['', Validators.pattern(NUMBER_OR_EMPTY_STRING)],
    });
  }

  protected updateForm() {
    if (this.configObject.crawlConfig.extra.extractText !== null && !this.allSelected) {
      this.extractText.enable();
    } else {
      this.extractText.disable();
    }
    if (this.configObject.crawlConfig.extra.createScreenshot !== null && !this.allSelected) {
      this.createScreenshot.enable();
    } else {
      this.createScreenshot.disable();
    }
    this.form.setValue({
      labelList: this.configObject.meta.labelList,
      collectionRefId: this.configObject.crawlConfig.collectionRef ? this.configObject.crawlConfig.collectionRef.id : '',
      politenessRefId: this.configObject.crawlConfig.politenessRef ? this.configObject.crawlConfig.politenessRef.id : '',
      browserConfigRefId: this.configObject.crawlConfig.browserConfigRef ? this.configObject.crawlConfig.browserConfigRef.id : '',
      minimumDnsTtlS: this.configObject.crawlConfig.minimumDnsTtlS || '',
      priorityWeight: this.configObject.crawlConfig.priorityWeight || '',
      extra: this.configObject.crawlConfig.extra,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.labelList.disable();
    if (!(this.canEdit)) {
      this.form.disable();
    }
  }

  protected prepareSave(): any {
    const pathList: string[] = [];

    const formModel = this.form.value;

    const crawlConfig = new CrawlConfig();

    const updateTemplate = new ConfigObject({kind: Kind.CRAWLCONFIG, crawlConfig});

    if (this.labelList.dirty && this.shouldAddLabel !== undefined) {
      updateTemplate.meta.labelList = formModel.labelList;
      if (this.shouldAddLabel && (this.allSelected || this.configObject.meta.labelList !== formModel.labelList)) {
        pathList.push('meta.label+');
      } else {
        pathList.push('meta.label-');
      }
    }

    if (this.minDnsTtlSeconds.dirty
      && (this.allSelected || formModel.minimumDnsTtlSeconds !== this.configObject.crawlConfig.minimumDnsTtlS)) {
      crawlConfig.minimumDnsTtlS = formModel.minimumDnsTtlS;
      pathList.push('crawlConfig.minimumDnsTtlS');
    }

    if (this.priorityWeight.dirty && (this.allSelected || formModel.priorityWeight !== this.configObject.crawlConfig.priorityWeight)) {
      crawlConfig.priorityWeight = formModel.priorityWeight;
      pathList.push('crawlConfig.priorityWeight');
    }

    if (this.extractText.dirty && (this.allSelected || formModel.extra.extractText !== this.configObject.crawlConfig.extra.extractText)) {
      crawlConfig.extra.extractText = formModel.extra.extractText;
      pathList.push('crawlConfig.extra.extractText');
    }

    if (this.createScreenshot.dirty
      && (this.allSelected || formModel.extra.createScreenshot !== this.configObject.crawlConfig.extra.createScreenshot)) {
      crawlConfig.extra.createScreenshot = formModel.extra.createScreenshot;
      pathList.push('crawlConfig.extra.createScreenshot');
    }

    if (this.collectionRefId.dirty && (this.allSelected
      || formModel.collectionRefId !== (this.configObject.crawlConfig.collectionRef && this.configObject.crawlConfig.collectionRef.id))) {
      crawlConfig.collectionRef = new ConfigRef({kind: Kind.COLLECTION, id: formModel.collectionRefId});
      pathList.push('crawlConfig.collectionRef');
    } else {
      crawlConfig.collectionRef = null;
    }

    if (this.browserConfigRefId.dirty && (this.allSelected
      || formModel.browserConfigRefId !== (this.configObject.crawlConfig.browserConfigRef
        && this.configObject.crawlConfig.browserConfigRef.id))) {
      crawlConfig.browserConfigRef = new ConfigRef({kind: Kind.BROWSERCONFIG, id: formModel.browserConfigRefId});
      pathList.push('crawlConfig.browserConfigRef');
    } else {
      crawlConfig.browserConfigRef = null;
    }

    if (this.politenessRefId.dirty && (this.allSelected
      || formModel.politenessRefId !== (this.configObject.crawlConfig.politenessRef
        && this.configObject.crawlConfig.politenessRef.id))) {
      crawlConfig.politenessRef = new ConfigRef({kind: Kind.POLITENESSCONFIG, id: formModel.politenessRefId});
      pathList.push('crawlConfig.politenessRef');
    } else {
      crawlConfig.politenessRef = null;
    }

    return {updateTemplate, pathList};
  }
}

