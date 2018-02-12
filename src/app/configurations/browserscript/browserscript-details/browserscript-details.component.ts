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
import {BrowserScript} from '../../../commons/models/config.model';

import 'brace/index';
import 'brace/theme/chrome';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';
import {DateTime} from '../../../commons/datetime';
import {RoleService} from '../../../roles/roles.service';

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
  save = new EventEmitter<BrowserScript>();
  @Output()
  update = new EventEmitter<BrowserScript>();
  @Output()
  delete = new EventEmitter<BrowserScript>();

  @ViewChild('editor') editor;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }


  get isAdmin(): boolean {
    return this.roleService.isAdmin();
  }

  get showSave(): boolean {
    return (this.browserScript && !this.browserScript.id);
  }

  get canSave() {
    return this.form.valid;
  }

  get canUpdate() {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert() {
    return this.form.dirty;
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
      if (!this.browserScript) {
        this.form.reset();
      }
    }
    if (this.browserScript) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.browserScript);
  }

  onRevert() {
    this.updateForm();
  }

  onEditorChangeFontSize(value) {
    const currentFontSize = this.editor.getEditor().getFontSize();
    if (value === 'up') {
      this.editor.setOptions({
        fontSize: currentFontSize + 1,
      })
    }
    if (value === 'down') {
      this.editor.setOptions({
        fontSize: currentFontSize - 1,
      })
    }
  }

  onEditorDarkTheme() {
    this.editor.setTheme('monokai');
  }

  onEditorLightTheme() {
    this.editor.setTheme('chrome');
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      script: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: this.fb.group({seconds: {value: '', disabled: true}}),
        created_by: {value: '', disabled: true},
        last_modified: this.fb.group({seconds: {value: '', disabled: true}}),
        last_modified_by: {value: '', disabled: true},
        label: [],
      }),
    });
    if (!this.isAdmin) {
      this.form.disable();
    }
  }

  private updateForm() {
    this.form.patchValue({
      id: this.browserScript.id,
      script: this.browserScript.script,
      meta: {
        name: this.browserScript.meta.name,
        description: this.browserScript.meta.description,
        created: {
          seconds: DateTime.convertFullTimestamp(this.browserScript.meta.created.seconds),
        },
        created_by: this.browserScript.meta.created_by,
        last_modified: {
          seconds: DateTime.convertFullTimestamp(this.browserScript.meta.last_modified.seconds),
        },
        last_modified_by: this.browserScript.meta.last_modified_by,
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
        label: labelsDeepCopy
      }
    };
  }
}
