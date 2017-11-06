import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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

  @Output()
  created = new EventEmitter<BrowserScript>();
  @Output()
  updated = new EventEmitter<BrowserScript>();
  @Output()
  deleted = new EventEmitter<BrowserScript>();

  @ViewChild('editor') editor;

  form: FormGroup;

  constructor(private browserScriptService: BrowserScriptService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.createForm();
  }

  get name() {
    return this.form.get('meta.name');
  }

  ngAfterViewInit() {
    this.editor.setTheme('chrome');
    this.editor.setMode('javascript');

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.browserScript.currentValue) {
      this.updateForm();
    }
  }

  onSave() {
    this.browserScript = this.prepareSave();
    this.browserScriptService.create(this.browserScript)
      .subscribe(newBrowserScript => {
        this.browserScript = newBrowserScript;
        this.updateForm();
        this.created.emit(newBrowserScript);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdate(): void {
    this.browserScript = this.prepareSave();
    this.browserScriptService.update(this.browserScript)
      .subscribe(updatedBrowserScript => {
        this.browserScript = updatedBrowserScript;
        this.updateForm();
        this.updated.emit(updatedBrowserScript);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onDelete(): void {
    this.browserScriptService.delete(this.browserScript.id)
      .subscribe(response => {
        this.deleted.emit(this.browserScript);
        this.browserScript = response;
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
      script: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        label: [],
      }),
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.browserScript.id,
      script: this.browserScript.script,
      meta: {
        name: this.browserScript.meta.name,
        description: this.browserScript.meta.description,
        label: [...this.browserScript.meta.label],
      }
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  };

  private prepareSave(): BrowserScript {
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
}
