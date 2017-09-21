import {Component, Input, OnChanges} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Label} from '../../../commons/';
import {Browserscript} from '../browserscript';
import {BrowserscriptService} from '../browserscript.service';


@Component({
  selector: 'app-browserscript-details',
  templateUrl: './browserscript-details.component.html',
  styleUrls: ['./browserscript-details.component.css']
})

export class BrowserscriptDetailsComponent implements OnChanges {
  @Input()
  browserscript: Browserscript;
  browserscriptForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;


  constructor(private browserscriptService: BrowserscriptService,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.browserscriptForm = this.fb.group({
      id: '',
      script: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
//        label: this.fb.array([]),
      }),
    });
  }

  updateData(browserscript: Browserscript) {
    this.browserscriptForm.controls['id'].setValue(browserscript.id);
    this.browserscriptForm.controls['script'].setValue(browserscript.script);
    this.browserscriptForm.controls['meta'].patchValue({
      name: browserscript.meta.name as string,
      description: browserscript.meta.description as string,
    });
    this.setLabel(browserscript.meta.label);
  };

  ngOnChanges() {
    this.updateData(this.browserscript);

  }

  createBrowserscript() {
    this.browserscript = this.prepareSaveBrowserscript();
    this.browserscriptService.createBrowserscript(this.browserscript).map((newBrowserscript: Browserscript) => {
      this.createHandler(newBrowserscript);
    });
    this.mdSnackBar.open('Lagret');
  }


  updateBrowserscript(browserscript: Browserscript): void {
    this.browserscript = this.prepareSaveBrowserscript();
    this.browserscriptService.updatePolitenessConfig(this.browserscript).map((updatedBrowserscript: Browserscript) => {
      this.updateHandler(updatedBrowserscript);
    });
    this.mdSnackBar.open('Lagret');
  }

  deleteBrowserscript(browserscriptId): void {
    this.browserscriptService.deletePolitenessConfig(browserscriptId).map((deletedBrowserscript) => {
      this.deleteHandler(deletedBrowserscript);
      if (deletedBrowserscript === 'not_allowed') {
        this.mdSnackBar.open('Feil: Ikke slettet');
      } else {
        this.mdSnackBar.open('Slettet');
      }
    });
  }


  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.browserscriptForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.browserscriptForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.browserscriptForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.browserscriptForm.get('label') as FormArray;
  }

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  prepareSaveBrowserscript(): Browserscript {
    const formModel = this.browserscriptForm.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveBrowserscript: Browserscript = {
      id: this.browserscript.id,
      script: formModel.script,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        created_by: '',
        // last_modified: null,
        last_modified_by: '',
        label: labelsDeepCopy
      }
    };
    return saveBrowserscript;
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }
}