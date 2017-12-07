import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserScriptDetailsComponent} from './browserscript-details.component';
import {BrowserScript, Label} from '../../../commons/models/config.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {AceEditorModule} from 'ng2-ace-editor';

describe('BrowserScriptDetailsComponent', () => {
  let component: BrowserScriptDetailsComponent;
  let fixture: ComponentFixture<BrowserScriptDetailsComponent>;
  let expectedBrowserScript: BrowserScript;
  let expectedLabel: Label;

  // Async beforeEach needed when using external template
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserScriptDetailsComponent],
      providers: [FormBuilder],
      imports: [AceEditorModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserScriptDetailsComponent);
    component = fixture.componentInstance;

    expectedLabel = {
      key: 'Test',
      value: 'test',
    };

    expectedBrowserScript = {
      id: '1000',
      script: 'var test=5; console.log(test)',
      meta: {
        name: 'Test',
        description: 'Dette er en test',
        created: {seconds: '1511964561'},
        created_by: 'admin',
        last_modified: {seconds: '1511964561'},
        last_modified_by: 'admin',
        label: [expectedLabel]
      }
    };

    component.browserScript = expectedBrowserScript;

    component.ngOnChanges({
      browserScript: new SimpleChange(null, component.browserScript, null)
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined()
  });

  it('should have the correct data from @Input ', () => {
    expect(component.browserScript.id).toEqual('1000');
    expect(component.browserScript.script).toEqual('var test=5; console.log(test)');
    expect(component.browserScript.meta.name).toEqual('Test');
    expect(component.browserScript.meta.description).toEqual('Dette er en test');
    expect(component.browserScript.meta.label).toEqual([expectedLabel]);
  });

  it('should create a "FormGroup"', () => {
    expect(component.form instanceof FormGroup).toBe(true);
  });

  it('should have a valid form', () => {
    expect(component.form.valid).toBe(true);
    expect(component.form.valid).not.toBe(false);
  });

  it('Form should not be valid after removing a required field', () => {
    component.form.patchValue({
      meta: {
        name: '',
      }
    });
    expect(component.form.valid).toBe(false);
  });


  it('Should update correct data', (done) => {
    // Update the form with an invalid value
    component.form.patchValue({
      meta: {
        name: 'E',
      }
    });

    expect(component.form.valid).toBe(false);

    component.form.patchValue({
      meta: {
        name: 'Endret navn',
      }
    });
    expect(component.form.valid).toBe(true);

    component.update.subscribe((browserScriptValue: BrowserScript) => {
      expect(browserScriptValue.id).toBe(expectedBrowserScript.id);
      expect(browserScriptValue.script).toBe(expectedBrowserScript.script);
      expect(browserScriptValue.meta.name).toBe('Endret navn');
      expect(browserScriptValue.meta.description).toBe(expectedBrowserScript.meta.description);
      expect(browserScriptValue.meta.label).toEqual(expectedBrowserScript.meta.label);
      done();
    });

    component.onUpdate();
  });

  it('Should save correct data', (done) => {
    expect(component.form.valid).toBe(true);

    component.save.subscribe((browserScriptValue: BrowserScript) => {
      expect(browserScriptValue.id).toBe(expectedBrowserScript.id);
      expect(browserScriptValue.script).toBe(expectedBrowserScript.script);
      expect(browserScriptValue.meta.name).toBe(expectedBrowserScript.meta.name);
      expect(browserScriptValue.meta.description).toBe(expectedBrowserScript.meta.description);
      expect(browserScriptValue.meta.label).toEqual(expectedBrowserScript.meta.label);
      done();
    });

    component.onSave();

  });

});

