import {Component, Input, OnChanges} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Label} from '../../../commons/';
import {BrowserScript} from '../browserscript.model';
import {BrowserScriptService} from '../browserscript.service';


@Component({
  selector: 'app-browserscript-details',
  templateUrl: './browserscript-details.component.html',
  styleUrls: ['./browserscript-details.component.css']
})

export class BrowserScriptDetailsComponent implements OnChanges {
  @Input()
  browserScript: BrowserScript;
  browserScriptFG: FormGroup;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;


  constructor(private browserScriptService: BrowserScriptService,
              private mdSnackBar: MdSnackBar,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.browserScriptFG = this.fb.group({
      id: '',
      script: '',
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
//        label: this.fb.array([]),
      }),
    });
  }

  updateData(browserScript: BrowserScript) {
    this.browserScriptFG.controls['id'].setValue(browserScript.id);
    this.browserScriptFG.controls['script'].setValue(browserScript.script);
    this.browserScriptFG.controls['meta'].patchValue({
      name: browserScript.meta.name as string,
      description: browserScript.meta.description as string,
    });
    this.setLabel(browserScript.meta.label);
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
    this.mdSnackBar.open('Lagret');
  }


  updateBrowserScript(browserScript: BrowserScript): void {
    this.browserScript = this.prepareSaveBrowserScript();
    this.browserScriptService.update(this.browserScript)
      .subscribe(updatedBrowserScript => {
        this.updateHandler(updatedBrowserScript);
      });
    this.mdSnackBar.open('Lagret');
  }

  deleteBrowserScript(browserScriptId): void {
    this.browserScriptService.delete(browserScriptId)
      .subscribe(response => {
        this.deleteHandler(response);
        if (response === 'not_allowed') {
          this.mdSnackBar.open('Feil: Ikke slettet');
        } else {
          this.mdSnackBar.open('Slettet');
        }
      });
  }


  setLabel(label) {
    const labelFGs = label.map(lbl => (this.fb.group(lbl)));
    const labelFormArray = this.fb.array(labelFGs);
    this.browserScriptFG.setControl('label', labelFormArray);
  }

  addLabel() {
    const control = <FormArray>this.browserScriptFG.controls['label'];
    control.push(this.initLabel());
  }

  removeLabel(i: number) {
    const control = <FormArray>this.browserScriptFG.controls['label'];
    control.removeAt(i);
  }

  get label(): FormArray {
    return this.browserScriptFG.get('label') as FormArray;
  }

  initLabel() {
    return this.fb.group({
      key: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  prepareSaveBrowserScript(): BrowserScript {
    const formModel = this.browserScriptFG.value;
    // deep copy of form model lairs
    const labelsDeepCopy: Label[] = formModel.label.map(
      (label: Label) => Object.assign({}, label)
    );

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
    this.mdSnackBar.open('Tilbakestilt');
  }
}
