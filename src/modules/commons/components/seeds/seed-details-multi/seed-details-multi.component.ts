import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {AuthService} from '../../../../core/services/auth';
import {ConfigObject, ConfigRef, Kind} from '../../../models';
import {SeedDetailComponent} from '../seed-details/seed-details.component';


@Component({
  templateUrl: './seed-details-multi.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedDetailMultiComponent extends SeedDetailComponent {

  shouldAddLabel = undefined;
  shouldAddCrawlJob = undefined;
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
      || (this.shouldAddLabel !== undefined)
      || (this.shouldAddCrawlJob !== undefined)
    );
  }

  get canRevert(): boolean {
    return this.form.dirty || this.shouldAddLabel !== undefined;
  }

  onRevert() {
    this.shouldAddCrawlJob = this.shouldAddLabel = undefined;
    super.onRevert();
  }

  onToggleShouldAddLabels(shouldAdd: boolean): void {
    this.shouldAddLabel = shouldAdd;
    if (shouldAdd !== undefined) {
      this.labelList.enable();
    }
  }

  onToggleShouldAddCrawlJob(shouldAdd: boolean): void {
    this.shouldAddCrawlJob = shouldAdd;
    if (shouldAdd !== undefined) {
      this.jobRefListId.enable();
    }
  }

  protected createForm() {
    this.form = this.fb.group({
      labelList: {value: []},
      disabled: {value: '', disabled: true},
      jobRefListId: {value: []}
    });
  }

  protected updateForm() {
    if (this.configObject.seed.disabled !== undefined) {
      this.disabled.enable();
    } else {
      this.disabled.disable();
    }
    this.form.setValue({
      labelList: this.configObject.meta.labelList,
      disabled: !!this.configObject.seed.disabled,
      jobRefListId: this.configObject.seed.jobRefList.map(job => job.id),
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.labelList.disable();
    this.jobRefListId.disable();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  /**
   * NB: Disabled values in form must be copied from model and not the view model (form.value)
   */
  protected prepareSave(): any {
    const formModel = this.form.value;
    const pathList: string[] = [];
    const updateTemplate = new ConfigObject({kind: Kind.SEED});
    const seed = updateTemplate.seed;

    if (formModel.disabled !== undefined) {
      seed.disabled = formModel.disabled;
      pathList.push('seed.disabled');
    }

    if (this.shouldAddCrawlJob !== undefined) {
      seed.jobRefList = formModel.jobRefListId.map(id => new ConfigRef({id, kind: Kind.CRAWLJOB}));
      console.log('jobRefList: ', seed.jobRefList);
      if (this.shouldAddCrawlJob) {
        pathList.push('seed.jobRef+');
      } else {
        pathList.push('seed.jobRef-');
      }
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
}
