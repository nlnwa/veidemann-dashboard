import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../commons';
import {BrowserScriptService} from '../../browserscript';
import {BrowserConfigService} from '../browserconfig.service';
import {BrowserConfig, Label, Selector} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css'],
})
export class BrowserConfigDetailsComponent implements OnChanges {
  @Input()
  browserConfig: BrowserConfig;

  _form: FormGroup;

  get form(): FormGroup {
    return this._form;
  }

  set form(form: FormGroup) {
    this._form = form;
  }

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
              private snackBarService: SnackBarService,
              private fb: FormBuilder,
              private browserScriptService: BrowserScriptService) {
    this.createForm();
    this.fillDropdown();
  }

  createForm() {
    this.form = this.fb.group({
      id: '',
      user_agent: ['', [Validators.required, Validators.minLength(1)]],
      window_width: ['', [Validators.required, CustomValidators.min(1)]],
      window_height: ['', [Validators.required, CustomValidators.min(1)]],
      page_load_timeout_ms: ['', [Validators.required, CustomValidators.min(0)]],
      sleep_after_pageload_ms: ['', [Validators.required, CustomValidators.min(0)]],
      // headers: this.fb.group({''}),
      script_id: [],
      script_selector: [],
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        description: '',
        label: [],
      }),

    });
  }

  updateData(browserConfig: BrowserConfig) {
    this.form.controls['id'].setValue(browserConfig.id);
    this.form.controls['user_agent'].setValue(browserConfig.user_agent);
    this.form.controls['window_width'].setValue(browserConfig.window_width);
    this.form.controls['window_height'].setValue(browserConfig.window_height);
    this.form.controls['page_load_timeout_ms'].setValue(browserConfig.page_load_timeout_ms);
    this.form.controls['sleep_after_pageload_ms'].setValue(browserConfig.sleep_after_pageload_ms);
    // this.form.controls['headers'].patchValue(browserConfig.headers);
    this.form.controls['meta'].patchValue({
      name: browserConfig.meta.name as string,
      description: browserConfig.meta.description as string,
      label: [...browserConfig.meta.label],
    });
    this.setSelectedDropdown();
    this.selectedBrowserScriptItems = [];
    this.form.get('script_selector').setValue([...browserConfig.script_selector.label]);
    this.form.markAsPristine();
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
    this.snackBarService.openSnackBar('Lagret');
  };


  updateBrowserConfig(browserConfig: BrowserConfig): void {
    this.browserConfig = this.prepareSaveBrowserconfig();
    this.browserConfigService.update(this.browserConfig)
      .subscribe(updatedBrowserConfig => {
        this.updateHandler(updatedBrowserConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  deleteBrowserConfig(browserConfigId): void {
    this.browserConfigService.delete(browserConfigId)
      .subscribe((response) => {
        this.deleteHandler(browserConfigId);
        if (response instanceof Object) {
          this.snackBarService.openSnackBar('Feil: Ikke slettet..');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  }

  fillDropdown() {
    this.browserScriptService.list()
      .map(reply => reply.value)
      .subscribe((browserScripts) => {
        browserScripts.forEach((browserScript) => {
          this.browserScriptList.push({
            id: browserScript.id,
            itemName: browserScript.meta.name,
            description: browserScript.meta.description
          })
        });
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
          .subscribe(browserScript => {
            this.selectedBrowserScriptItems.push({
              id: browserScript.id,
              itemName: browserScript.meta.name,
              description: browserScript.meta.description
            });
            this.form.controls['script_id'].setValue(this.selectedBrowserScriptItems);
          });
      }
    }

  }

  revert() {
    this.ngOnChanges();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  prepareSaveBrowserconfig(): BrowserConfig {
    const formModel = this.form.value;
    const labelsDeepCopy: Label[] = formModel.meta.label.map(label => ({...label}));
    const script_selectorDeepCopy: Selector = {label: formModel.script_selector.map(label => ({...label}))};
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
      window_width: parseInt(formModel.window_width, 10),
      window_height: parseInt(formModel.window_height, 10),
      page_load_timeout_ms: formModel.page_load_timeout_ms,
      sleep_after_pageload_ms: formModel.sleep_after_pageload_ms,
      script_id: script_idlist,
      script_selector: script_selectorDeepCopy,
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
