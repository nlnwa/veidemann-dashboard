import {AfterViewInit, Component, Input, OnChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrowserScriptService} from '../browserscript.service';
import {BrowserScript} from '../../../commons/models/config.model';
import {SnackBarService} from '../../../snack-bar-service/snack-bar.service';

import 'brace/index';
import 'brace/theme/chrome';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';

declare var ace: any;


@Component({
  selector: 'app-browserscript-details',
  templateUrl: './browserscript-details.component.html',
  styleUrls: ['./browserscript-details.component.css'],
})

export class BrowserScriptDetailsComponent implements OnChanges, AfterViewInit {
  @Input()
  browserScript: BrowserScript;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  @ViewChild('editor') editor;

  form: FormGroup;

  constructor(private browserScriptService: BrowserScriptService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngAfterViewInit() {
    this.editor.setTheme('chrome');
    this.editor.setMode('javascript');

  }

  createForm() {
    this.form = this.fb.group({
      id: '',
      script: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        label: [],
      }),
    });
  }

  updateData(browserScript: BrowserScript) {
    this.form.controls['id'].setValue(browserScript.id);
    this.form.controls['script'].setValue(browserScript.script);
    this.form.controls['meta'].patchValue({
      name: browserScript.meta.name as string,
      description: browserScript.meta.description as string,
      label: [...browserScript.meta.label],
    });
    this.form.markAsPristine();
  };

  ngOnChanges() {
    this.updateData(this.browserScript);

  }

  createBrowserScript() {
    this.browserScript = this.prepareSaveBrowserScript();
    this.browserScriptService.create(this.browserScript)
      .subscribe(newBrowserScript => {
        this.createHandler(newBrowserScript);
      });
    this.snackBarService.openSnackBar('Lagret');
  }


  updateBrowserScript(browserScript: BrowserScript): void {
    this.browserScript = this.prepareSaveBrowserScript();
    this.browserScriptService.update(this.browserScript)
      .subscribe(updatedBrowserScript => {
        this.updateHandler(updatedBrowserScript);
      });
    this.snackBarService.openSnackBar('Lagret');
  }

  deleteBrowserScript(browserScriptId): void {
    this.browserScriptService.delete(browserScriptId)
      .subscribe(response => {
        this.deleteHandler(browserScriptId);
        if (response instanceof Object) {
          this.snackBarService.openSnackBar('Feil: Ikke slettet');
        } else {
          this.snackBarService.openSnackBar('Slettet');
        }
      });
  }

  prepareSaveBrowserScript(): BrowserScript {
    const formModel = this.form.value;
    const labelsDeepCopy = formModel.meta.label.map(label => ({...label}));
    return {
      id: this.browserScript.id,
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
  }

  revert() {
    this.ngOnChanges();
    this.snackBarService.openSnackBar('Tilbakestilt');
  }
}
