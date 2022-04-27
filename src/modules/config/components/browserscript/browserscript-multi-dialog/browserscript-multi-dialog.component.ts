import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BrowserScriptDetailsComponent} from '..';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind, Label} from '../../../../../shared/models/config';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {MonacoEditorLoaderService} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-browserscript-multi-dialog',
  templateUrl: './browserscript-multi-dialog.component.html',
  styleUrls: ['./browserscript-multi-dialog.component.css']
})
export class BrowserScriptMultiDialogComponent extends BrowserScriptDetailsComponent implements OnInit {

  shouldAddLabel = undefined;
  allSelected = false;

  @ViewChild(LabelMultiComponent) labelMulti: LabelMultiComponent;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<BrowserScriptMultiDialogComponent>,
              protected cdr: ChangeDetectorRef,
              protected mls: MonacoEditorLoaderService) {
    super(fb, authService, cdr, mls);
    this.configObject = this.data.configObject;
    this.allSelected = this.data.allSelected;
  }

  get labelList(): AbstractControl {
    return this.form.get('labelList');
  }

  get canUpdate(): boolean {
    return this.form.valid && (this.form.dirty || (this.shouldAddLabel !== undefined && this.labelList.value.length));
  }

  get canRevert(): boolean {
    return this.form.dirty || this.shouldAddLabel !== undefined;
  }

  ngOnInit(): void {
    this.updateForm();
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
      labelList: {value: [], disabled: false}
    });
  }

  protected updateForm(): void {
    this.form.setValue({
      labelList: this.configObject.meta.labelList
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
      kind: Kind.BROWSERSCRIPT,
    });

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
