import {Component, Input, OnChanges} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators, Label} from '../../../commons';
import {BrowserscriptService} from '../../browserscript';
import {BrowserConfig} from '../browserconfig.model';
import {BrowserconfigService} from '../browserconfig.service';

@Component({
  selector: 'app-browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css']
})
export class BrowserconfigDetailsComponent implements OnChanges {
  @Input()
  browserconfig: BrowserConfig;
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
              private browserscriptService: BrowserscriptService) {
    this.createForm();
    this.fillDropdown();
  }

  createForm() {
    this.browserconfigForm = this.fb.group({
      id: '',
      user_agent: ['', [Validators.required, Validators.minLength(1)]],
      window_width: ['', [Validators.required, CustomValidators.min(1)]],
      window_height: ['', [Validators.required, CustomValidators.min(1)]],
      page_load_timeout_ms: ['', [Validators.required, CustomValidators.min(0)]],
      sleep_after_pageload_ms: ['', [Validators.required, CustomValidators.min(0)]],
      // headers: this.fb.group({''}),
      script_id: null,
      script_selector: this.fb.array([]),

      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        label: this.fb.array([]),
      }),

    });
  }

  updateData(browserconfig: BrowserConfig) {
    this.browserconfigForm.controls['id'].setValue(browserconfig.id);
    this.browserconfigForm.controls['user_agent'].setValue(browserconfig.user_agent);
    this.browserconfigForm.controls['window_width'].setValue(browserconfig.window_width);
    this.browserconfigForm.controls['window_height'].setValue(browserconfig.window_height);
    this.browserconfigForm.controls['page_load_timeout_ms'].setValue(browserconfig.page_load_timeout_ms);
    this.browserconfigForm.controls['sleep_after_pageload_ms'].setValue(browserconfig.sleep_after_pageload_ms);
    // this.browserconfigForm.controls['headers'].patchValue(browserConfig.headers);
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
    this.browserconfigService.createBrowserConfig(this.browserconfig)
      .subscribe(newBrowserconfig => {
        this.createHandler(newBrowserconfig);
      });
    this.mdSnackBar.open('Lagret');
  };


  updateBrowserconfig(browserconfig: BrowserConfig): void {
    this.browserconfig = this.prepareSaveBrowserconfig();
    this.browserconfigService.updateBrowserConfig(this.browserconfig)
      .subscribe(updatedBrowserconfig => {
        this.updateHandler(updatedBrowserconfig);
        this.mdSnackBar.open('Lagret');
      });
  }

  deleteBrowserconfig(browserconfigId): void {
    this.browserconfigService.deleteBrowserConfig(browserconfigId)
      .subscribe(deletedBrowserConfig => {
        this.deleteHandler(deletedBrowserConfig);
        if (deletedBrowserConfig === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet..');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  }

  fillDropdown() {
    this.browserscriptService.getAllBrowserScripts()
      .map(reply => reply.value)
      .subscribe((browserScripts) => {
        browserScripts.forEach((browserScript) =>
          this.browserScriptlist.push({
            id: browserScript.id,
            itemName: browserScript.meta.name,
            description: browserScript.meta.description
          }));
      });
    this.browserScriptDropdownSettings = {
      singleSelection: false,
      text: 'Velg Script',
      enableCheckAll: false,
      enableSearchFilter: true,
    };
  }

  setSelectedDropdown() {
    this.selectedbrowserScriptItems = [];
    if (this.browserconfig.script_id) {
      for (const i of this.browserconfig.script_id) {
        this.browserscriptService.getBrowserScript(i)
          .subscribe(browserScript =>
            this.selectedbrowserScriptItems.push({
              id: browserScript.id,
              itemName: browserScript.meta.name,
              description: browserScript.meta.description
            })
          );
      }
    }

    this.browserconfigForm.controls['script_id'].setValue(this.selectedbrowserScriptItems);
  }

  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
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
  }
  ;

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      value: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  setScriptSelector(scriptSelector) {
    const scriptSelectorFG = scriptSelector.map(ss => (this.fb.group(ss)));
    const script_selectorFormArray = this.fb.array(scriptSelectorFG);
    this.browserconfigForm.setControl('script_selector', script_selectorFormArray);
  }

  addScriptSelector() {
    const control = <FormArray>this.browserconfigForm.controls['script_selector'];
    control.push(this.initScriptSelector());
  }

  removeScriptSelector(i: number) {
    const control = <FormArray>this.browserconfigForm.controls['script_selector'];
    control.removeAt(i);
  }

  get script_selector(): FormArray {
    return this.browserconfigForm.get('script_selector') as FormArray;
  }
  ;

  initScriptSelector() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      value: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  revert() {
    this.ngOnChanges();
    this.mdSnackBar.open('Tilbakestilt');
  }

  prepareSaveBrowserconfig(): BrowserConfig {
    const formModel = this.browserconfigForm.value;

    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

    const script_selectorDeepCopy: Label[] = formModel.script_selector.map(
      (label: Label) => Object.assign({}, label)
    );

    const script_idlist = [];
    for (const i of formModel.script_id) {
      const script_id = i.id;
      script_idlist.push(script_id);
    }

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveBrowserconfig: BrowserConfig = {
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
