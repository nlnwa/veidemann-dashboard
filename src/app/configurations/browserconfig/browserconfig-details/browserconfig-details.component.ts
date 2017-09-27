import {Component, Input, OnChanges} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../commons';
import {BrowserScriptService} from '../../browserscript';
import {BrowserConfigService} from '../browserconfig.service';
import {BrowserConfig, Label} from '../../../commons/models/config.model';

@Component({
  selector: 'app-browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css']
})
export class BrowserConfigDetailsComponent implements OnChanges {
  @Input()
  browserConfig: BrowserConfig;
  browserConfigForm: FormGroup;

  browserScriptList: any = [];
  browserScriptDropdownSettings = {};
  selectedBrowserScriptItems = [];


  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private browserConfigService: BrowserConfigService,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder,
              private browserScriptService: BrowserScriptService) {
    this.createForm();
    this.fillDropdown();
  }

  createForm() {
    this.browserConfigForm = this.fb.group({
      id: '',
      user_agent: ['', [Validators.required, Validators.minLength(1)]],
      window_width: ['', [Validators.required, CustomValidators.min(1)]],
      window_height: ['', [Validators.required, CustomValidators.min(1)]],
      page_load_timeout_ms: ['', [Validators.required, CustomValidators.min(0)]],
      sleep_after_pageload_ms: ['', [Validators.required, CustomValidators.min(0)]],
      // headers: this.fb.group({''}),
      script_id: [],
      script_selector: this.fb.array([]),

      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        label: this.fb.array([]),
      }),

    });
  }

  updateData(browserConfig: BrowserConfig) {
    this.browserConfigForm.controls['id'].setValue(browserConfig.id);
    this.browserConfigForm.controls['user_agent'].setValue(browserConfig.user_agent);
    this.browserConfigForm.controls['window_width'].setValue(browserConfig.window_width);
    this.browserConfigForm.controls['window_height'].setValue(browserConfig.window_height);
    this.browserConfigForm.controls['page_load_timeout_ms'].setValue(browserConfig.page_load_timeout_ms);
    this.browserConfigForm.controls['sleep_after_pageload_ms'].setValue(browserConfig.sleep_after_pageload_ms);
    // this.browserConfigForm.controls['headers'].patchValue(browserConfig.headers);
    this.browserConfigForm.controls['meta'].patchValue({
      name: browserConfig.meta.name as string,
      description: browserConfig.meta.description as string,
    });
    this.setSelectedDropdown();
    this.selectedBrowserScriptItems = [];
    this.setLabel(browserConfig.meta.label);
  }

  ngOnChanges() {
    this.updateData(this.browserConfig);
  }

  createBrowserConfig() {
    this.browserConfig = this.prepareSaveBrowserconfig();
    this.browserConfigService.create(this.browserConfig)
      .subscribe(newBrowserConfig => {
        this.createHandler(newBrowserConfig);
      });
    this.mdSnackBar.open('Lagret');
  };


  updateBrowserConfig(browserConfig: BrowserConfig): void {
    this.browserConfig = this.prepareSaveBrowserconfig();
    this.browserConfigService.update(this.browserConfig)
      .subscribe(updatedBrowserConfig => {
        this.updateHandler(updatedBrowserConfig);
        this.mdSnackBar.open('Lagret');
      });
  }

  deleteBrowserConfig(browserConfigId): void {
    this.browserConfigService.delete(browserConfigId)
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
    this.browserScriptService.list()
      .map(reply => reply.value)
      .subscribe((browserScripts) => {
        browserScripts.forEach((browserScript) =>
          this.browserScriptList.push({
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
    this.selectedBrowserScriptItems = [];
    if (this.browserConfig.script_id) {
      for (const i of this.browserConfig.script_id) {
        this.browserScriptService.get(i)
          .subscribe(browserScript =>
            this.selectedBrowserScriptItems.push({
              id: browserScript.id,
              itemName: browserScript.meta.name,
              description: browserScript.meta.description
            })
          );
      }
    }

    this.browserConfigForm.controls['script_id'].setValue(this.selectedBrowserScriptItems);
  }

  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.browserConfigForm.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.browserConfigForm.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.browserConfigForm.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.browserConfigForm.get('label') as FormArray;
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
    this.browserConfigForm.setControl('script_selector', script_selectorFormArray);
  }

  addScriptSelector() {
    const control = <FormArray>this.browserConfigForm.controls['script_selector'];
    control.push(this.initScriptSelector());
  }

  removeScriptSelector(i: number) {
    const control = <FormArray>this.browserConfigForm.controls['script_selector'];
    control.removeAt(i);
  }

  get script_selector(): FormArray {
    return this.browserConfigForm.get('script_selector') as FormArray;
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
    const formModel = this.browserConfigForm.value;

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
    return {
      id: this.browserConfig.id,
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
  }
}
