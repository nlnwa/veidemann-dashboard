import {Component, Input} from "@angular/core";
import {Browserscript} from "../browserscript";
import {MdlSnackbarService} from "angular2-mdl";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";
import {BrowserscriptService} from "../browserscript.service";
import {Label} from "../../../commons/models/label";
import {CustomValidators} from "../../../commons/components/validators";


@Component({
  selector: 'browserscript-details',
  templateUrl: './browserscript-details.component.html',
  styleUrls: ['./browserscript-details.component.css']
})

export class BrowserscriptDetailsComponent {
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
              private mdlSnackbarService: MdlSnackbarService,
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
    this.browserscriptService.createBrowserscript(this.browserscript).then((newBrowserscript: Browserscript) => {
      this.createHandler(newBrowserscript);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }


  updateBrowserscript(browserscript: Browserscript): void {
    this.browserscript = this.prepareSaveBrowserscript();
    this.browserscriptService.updatePolitenessConfig(this.browserscript).then((updatedBrowserscript: Browserscript) => {
      this.updateHandler(updatedBrowserscript);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret'
      });
  }

  deleteBrowserscript(browserscriptId): void {
    this.browserscriptService.deletePolitenessConfig(browserscriptId).then((deletedBrowserscript) => {
      this.deleteHandler(deletedBrowserscript);
      if (deletedBrowserscript === "not_allowed") {
        this.mdlSnackbarService.showSnackbar(
          {
            message: 'Feil: Ikke slettet',
          });
      } else {
        this.mdlSnackbarService.showSnackbar(
          {
            message: 'Slettet',
          });
      }
    });
  }


  setLabel(label) {
    const labelFGs = label.map(label => (this.fb.group(label)));
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
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Tilbakestilt',
      });
  }
}
