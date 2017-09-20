import {Component, Input, OnChanges} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";
import {Label, CustomValidators} from "../../../commons";
import {BrowserscriptService} from "../../browserscript";
import {Browserconfig} from '../browserconfig';
import {BrowserconfigService} from '../browserconfig.service';

@Component({
  selector: 'browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css']
})
export class BrowserconfigDetailsComponent implements OnChanges {
  @Input()
  browserconfig: Browserconfig;
  browserconfigForm: FormGroup;

  browserScriptlist: any = [];
  browserScriptDropdownSettings = {};
  selectedbrowserScriptItems = [];


  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private browserconfigService: BrowserconfigService,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder,
              private browserscriptService: BrowserscriptService,) {
    this.createForm();
    this.filldropdown();
  }

  createForm() {
    this.browserconfigForm = this.fb.group({
      id: '',
      user_agent: ['', [Validators.required, Validators.minLength(1)]],
      window_width: ['', [Validators.required, CustomValidators.min(1)]],
      window_height: ['', [Validators.required, CustomValidators.min(1)]],
      page_load_timeout_ms: ['', [Validators.required, CustomValidators.min(0)]],
      sleep_after_pageload_ms: ['', [Validators.required, CustomValidators.min(0)]],
      //headers: this.fb.group({''}),
      script_id: null,
      script_selector: this.fb.array([]),

      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        label: this.fb.array([]),
      }),

    });
  }

  updateData(browserconfig: Browserconfig) {
    this.browserconfigForm.controls['id'].setValue(browserconfig.id);
    this.browserconfigForm.controls['user_agent'].setValue(browserconfig.user_agent);
    this.browserconfigForm.controls['window_width'].setValue(browserconfig.window_width);
    this.browserconfigForm.controls['window_height'].setValue(browserconfig.window_height);
    this.browserconfigForm.controls['page_load_timeout_ms'].setValue(browserconfig.page_load_timeout_ms);
    this.browserconfigForm.controls['sleep_after_pageload_ms'].setValue(browserconfig.sleep_after_pageload_ms);
    //this.browserconfigForm.controls['headers'].patchValue(browserconfig.headers);
    this.browserconfigForm.controls['meta'].patchValue({
      name: browserconfig.meta.name as string,
      description: browserconfig.meta.description as string,
    });
    this.setSelectedDropdown();
    this.selectedbrowserScriptItems = [];
    this.setLabel(browserconfig.meta.label);
  }

  ngOnChanges() {
    this.updateData(this.browserconfig);
  }

  createBrowserconfig() {
    this.browserconfig = this.prepareSaveBrowserconfig();
    this.browserconfigService.createBrowserconfig(this.browserconfig)
      .then((newBrowserconfig: Browserconfig) => {
        this.createHandler(newBrowserconfig);
      });
    this.mdSnackBar.open('Lagret');
  };


  updateBrowserconfig(browserconfig: Browserconfig): void {
    this.browserconfig = this.prepareSaveBrowserconfig();
    this.browserconfigService.updateBrowserconfig(this.browserconfig).then((updatedBrowserconfig: Browserconfig) => {
      this.updateHandler(updatedBrowserconfig);
      this.mdSnackBar.open('Lagret');
    });
  }

  deleteBrowserconfig(browserconfigId): void {
    this.browserconfigService.deleteBrowserconfig(browserconfigId).then((deletedBrowserconfig) => {
      this.deleteHandler(deletedBrowserconfig);
      if (deletedBrowserconfig === "not_allowed") {
        this.mdSnackBar.open('Feil: Ikke slettet..');
      } else {
        this.mdSnackBar.open('Slettet');
      }
    });
  }

  filldropdown() {
    this.browserscriptService.getAllBrowserscripts().map(browserscripts => browserscripts.value).forEach((value) => {
      value.forEach((key) => {
        this.browserScriptlist.push({id: key.id, itemName: key.meta.name, description: key.meta.description})
      })
    });
    this.browserScriptDropdownSettings = {
      singleSelection: false,
      text: "Velg Script",
      enableCheckAll: false,
      enableSearchFilter: true,
    };
  }

  setSelectedDropdown() {
    this.selectedbrowserScriptItems = [];
    if (this.browserconfig.script_id) {
      for (let i of this.browserconfig.script_id) {
        this.browserscriptService.getBrowserscript(i).map(crawljob => crawljob).forEach((value) => {
          value.forEach((key) => {
            this.selectedbrowserScriptItems.push({
              id: key.id,
              itemName: key.meta.name,
              description: key.meta.description
            })
          });
        });
      }
    }
    this.browserconfigForm.controls['script_id'].setValue(this.selectedbrowserScriptItems);
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

  setScript_selector(script_selector) {
    const script_selectorFGs = script_selector.map(script_selector => (this.fb.group(script_selector)));
    const script_selectorFormArray = this.fb.array(script_selectorFGs);
    this.browserconfigForm.setControl('script_selector', script_selectorFormArray);
  }

  addScript_selector() {
    const control = <FormArray>this.browserconfigForm.controls['script_selector'];
    control.push(this.initScript_selector());
  }

  removeScript_selector(i: number) {
    const control = <FormArray>this.browserconfigForm.controls['script_selector'];
    control.removeAt(i);
  }

  get script_selector(): FormArray {
    return this.browserconfigForm.get('script_selector') as FormArray;
  };

  initScript_selector() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      value: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }

  prepareSaveBrowserconfig(): Browserconfig {
    const formModel = this.browserconfigForm.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    const script_selectorDeepCopy: Label[] = formModel.script_selector.map(
      (label: Label) => Object.assign({}, label)
    );

    let script_idlist = [];
    for (let i of formModel.script_id) {
      let script_id = i.id;
      script_idlist.push(script_id);
    }

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveBrowserconfig: Browserconfig = {
      id: this.browserconfig.id,
      user_agent: formModel.user_agent,
      window_width: formModel.window_width,
      window_height: formModel.window_height,
      page_load_timeout_ms: formModel.page_load_timeout_ms,
      sleep_after_pageload_ms: formModel.sleep_after_pageload_ms,
      script_id: script_idlist,
      script_selector: {
        label: script_selectorDeepCopy
      },
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
