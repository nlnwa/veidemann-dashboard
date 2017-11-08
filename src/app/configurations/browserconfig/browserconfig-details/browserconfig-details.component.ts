import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../commons';
import {BrowserScriptService} from '../../browserscript';
import {BrowserConfigService} from '../browserconfig.service';
import {BrowserConfig, Label, Selector} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-browserconfig-details',
  templateUrl: './browserconfig-details.component.html',
  styleUrls: ['./browserconfig-details.component.css'],
})
export class BrowserConfigDetailsComponent implements OnChanges {

  @Input()
  browserConfig: BrowserConfig;

  @Output()
  created = new EventEmitter<BrowserConfig>();
  @Output()
  updated = new EventEmitter<BrowserConfig>();
  @Output()
  deleted = new EventEmitter<BrowserConfig>();

  form: FormGroup;

  browserScriptList: any = [];
  browserScriptDropdownSettings = {
    singleSelection: false,
    text: 'Velg Script',
    enableCheckAll: false,
    enableSearchFilter: true,
  };
  selectedBrowserScriptItems = [];

  private completedSubject = new Subject<any>();
  private completed$ = this.completedSubject.asObservable();
  private isReady = false;
  private isWaiting = false;

  constructor(private browserConfigService: BrowserConfigService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder,
              private browserScriptService: BrowserScriptService) {
    this.fillDropdown();
    const subscription = this.completed$.subscribe(() => {
      this.isReady = true;
      if (this.isWaiting) {
        this.updateForm();
      }
      subscription.unsubscribe();
    });
    this.createForm();
  }

  get name() {
    return this.form.get('meta.name');
  }

  get user_agent() {
    return this.form.get('user_agent');
  }

  get window_width() {
    return this.form.get('window_width');
  }

  get window_height() {
    return this.form.get('window_height');
  }

  get page_load_timeout_ms() {
    return this.form.get('page_load_timeout_ms');
  }

  get sleep_after_pageload_ms() {
    return this.form.get('sleep_after_pageload_ms');
  }

  get script_id() {
    return this.form.get('script_id');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.browserConfig && changes.browserConfig.currentValue) {
      if (this.isReady) {
        this.updateForm();
      } else {
        this.isWaiting = true;
      }
    }
  }

  onSave() {
    this.browserConfig = this.prepareSave();
    this.browserConfigService.create(this.browserConfig)
      .subscribe(newBrowserConfig => {
        this.browserConfig = newBrowserConfig;
        this.updateForm();
        this.created.emit(newBrowserConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  };

  onUpdate(): void {
    this.browserConfig = this.prepareSave();
    this.browserConfigService.update(this.browserConfig)
      .subscribe(updatedBrowserConfig => {
        this.browserConfig = updatedBrowserConfig;
        this.updateForm();
        this.updated.emit(updatedBrowserConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onDelete(): void {
    this.browserConfigService.delete(this.browserConfig.id)
      .subscribe((response) => {
        this.deleted.emit(this.browserConfig);
        this.browserConfig = response;
        this.form.reset();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onRevert() {
    this.updateForm();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
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

  private updateForm() {
    this.form.patchValue({
      id: this.browserConfig.id,
      user_agent: this.browserConfig.user_agent,
      window_width: this.browserConfig.window_width,
      window_height: this.browserConfig.window_height,
      page_load_timeout_ms: this.browserConfig.page_load_timeout_ms,
      sleep_after_pageload_ms: this.browserConfig.sleep_after_pageload_ms,
      //headers: this.browserConfig.headers;
      script_selector: [...this.browserConfig.script_selector.label],
      meta: {
        name: this.browserConfig.meta.name,
        description: this.browserConfig.meta.description,
        label: [...this.browserConfig.meta.label]
      }
    });
    this.setSelectedDropdown();
    this.form.markAsPristine();
    this.form.markAsUntouched();

  }

  private prepareSave(): BrowserConfig {
    const formModel = this.form.value;
    const labelsDeepCopy: Label[] = formModel.meta.label.map(label => ({...label}));
    const script_selectorDeepCopy: Selector = {label: formModel.script_selector.map(label => ({...label}))};
    const scriptIdList = formModel.script_id.map((listItem) => listItem.id);
    return {
      id: this.browserConfig.id,
      user_agent: formModel.user_agent,
      window_width: parseInt(formModel.window_width, 10),
      window_height: parseInt(formModel.window_height, 10),
      page_load_timeout_ms: formModel.page_load_timeout_ms,
      sleep_after_pageload_ms: formModel.sleep_after_pageload_ms,
      script_id: scriptIdList,
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

  private fillDropdown() {
    this.browserScriptService.list()
      .map(reply => reply.value)
      .subscribe((browserScripts) => {
          this.browserScriptList = browserScripts.map((browserScript) =>
            ({
              id: browserScript.id,
              itemName: browserScript.meta.name,
            }));
        },
        null,
        () => this.completedSubject.next());
  }

  private setSelectedDropdown() {
    this.selectedBrowserScriptItems = this.browserScriptList.reduce((acc, curr) => {
      for (let i = 0; i < this.browserConfig.script_id.length; i++) {
        if (this.browserConfig.script_id[i] === curr.id) {
          acc.push(curr);
          break;
        }
      }
      return acc;
    }, []);
  }
}
