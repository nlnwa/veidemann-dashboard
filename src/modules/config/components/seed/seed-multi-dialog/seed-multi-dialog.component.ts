import {Component, Inject, OnInit} from '@angular/core';
import {SeedDetailsComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, ConfigRef, Kind} from '../../../../../shared/models/config';

@Component({
  selector: 'app-seed-multi-dialog',
  templateUrl: './seed-multi-dialog.component.html',
  styleUrls: ['./seed-multi-dialog.component.css']
})
export class SeedMultiDialogComponent extends SeedDetailsComponent implements OnInit {

  shouldAddLabel = undefined;
  shouldAddCrawlJob = undefined;
  allSelected = false;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<SeedMultiDialogComponent>) {
    super(fb, authService);
    this.configObject = this.data.configObject;
    this.crawlJobs = this.data.options.crawlJobs;
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

  ngOnInit(): void {
    this.updateForm();
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
  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }

}
