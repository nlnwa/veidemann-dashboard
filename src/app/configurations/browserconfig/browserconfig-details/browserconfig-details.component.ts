import {Component, Input, OnChanges} from "@angular/core";
import {BrowserconfigService} from "../browserconfig.service";
import {Browserconfig} from "../browserconfig";
import {MdlSnackbarService} from "angular2-mdl";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";
import {Label} from "../../../commons/models/label";
import {CustomValidators} from "../../../commons/components/validators";

@Component({
  selector: 'browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css']
})
export class BrowserconfigDetailsComponent implements OnChanges {
  @Input()
  browserconfig: Browserconfig;
  browserconfigForm: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private browserconfigService: BrowserconfigService,
              private mdlSnackbarService: MdlSnackbarService,
              private fb: FormBuilder) {
    this.createForm()
  }

  createForm() {
    this.browserconfigForm = this.fb.group({
      id: '',
      user_agent: ['', [Validators.required, Validators.minLength(1)]],
      window_width: ['', [Validators.required, CustomValidators.min(1)]],
      window_height: ['', [Validators.required, CustomValidators.min(1)]],
      page_load_timeout_ms: ['', [Validators.required, CustomValidators.min(0)]],
      sleep_after_pageload_ms: ['', [Validators.required, CustomValidators.min(0)]],
      headers: this.fb.group({}),
      script_id: this.fb.array([]),
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        label: this.fb.array([]),
      }),
    });
  }

  ngOnChanges() {
    this.updateData(this.browserconfig);
  }

  updateData(browserconfig: Browserconfig) {
    this.browserconfigForm.controls['id'].setValue(browserconfig.id);
    this.browserconfigForm.controls['user_agent'].setValue(browserconfig.user_agent);
    this.browserconfigForm.controls['window_width'].setValue(browserconfig.window_width);
    this.browserconfigForm.controls['window_height'].setValue(browserconfig.window_height);
    this.browserconfigForm.controls['page_load_timeout_ms'].setValue(browserconfig.page_load_timeout_ms);
    this.browserconfigForm.controls['sleep_after_pageload_ms'].setValue(browserconfig.sleep_after_pageload_ms);
    // this.browserconfigForm.controls['headers'].patchValue({heihei: browserconfig.headers});
    this.browserconfigForm.controls['meta'].patchValue({
      name: browserconfig.meta.name as string,
      description: browserconfig.meta.description as string,
    });
    //this.setScript(browserconfig.script_id);

    this.setLabel(browserconfig.meta.label);
  }

  createBrowserconfig() {
    this.browserconfig = this.prepareSaveBrowserconfig();
    this.browserconfigService.createBrowserconfig(this.browserconfig)
      .then((newBrowserconfig: Browserconfig) => {
        this.createHandler(newBrowserconfig);
      });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  };


  updateBrowserconfig(browserconfig: Browserconfig): void {
    this.browserconfig = this.prepareSaveBrowserconfig();
    this.browserconfigService.updateBrowserconfig(this.browserconfig).then((updatedBrowserconfig: Browserconfig) => {
      this.updateHandler(updatedBrowserconfig);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  deleteBrowserconfig(browserconfigId): void {
    this.browserconfigService.deleteBrowserconfig(browserconfigId).then((deletedBrowserconfig) => {
      this.deleteHandler(deletedBrowserconfig);
      if (deletedBrowserconfig === "not_allowed") {
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
    this.browserconfigForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.browserconfigForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.browserconfigForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.browserconfigForm.get('label') as FormArray;
  };

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      value: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  revert() {
    this.ngOnChanges();
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Tilbakestilt',
      });
  }

  prepareSaveBrowserconfig(): Browserconfig {
    const formModel = this.browserconfigForm.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveBrowserconfig: Browserconfig = {
      id: this.browserconfig.id,
      user_agent: formModel.user_agent,
      window_width: formModel.window_width,
      window_height: formModel.window_height,
      page_load_timeout_ms: formModel.page_load_timeout_ms,
      sleep_after_pageload_ms: formModel.sleep_after_pageload_ms,
      script_id: formModel.script_id,
      headers: formModel.headers,
      meta: {
        name: formModel.meta.name as string,
        description: formModel.meta.description as string,
        // created: '',
        // created_by: '',
        // last_modified: null,
        last_modified_by: '',
        label: labelsDeepCopy
      }
    };
    return saveBrowserconfig;
  }
}
