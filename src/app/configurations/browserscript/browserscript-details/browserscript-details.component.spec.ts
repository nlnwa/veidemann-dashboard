import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserScriptDetailsComponent} from './browserscript-details.component';
import {BrowserScript, Label} from '../../../commons/models/config.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {DateTime} from '../../../commons/datetime';
import {AceEditorModule} from "ng2-ace-editor";

describe('BrowserScriptDetailsComponent', () => {
  let component: BrowserScriptDetailsComponent;
  let fixture: ComponentFixture<BrowserScriptDetailsComponent>;
  let expectedBrowserScript;
  let expectedLabel;

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


    // Pretend that it was wired to something that supplied a browserscript
    expectedBrowserScript = new BrowserScript();
    expectedLabel = new Label();

    // meta.label mock
    expectedLabel = {
      type: 'Test',
      value: 'test',
    };

    // BrowserScript mock
    expectedBrowserScript = {
      id: '1000',
      script: 'var test=5; console.log(test)',
      meta: {
        name: 'Test',
        description: 'Dette er en test',
        created: DateTime.convertFullTimestamp(1511964561),
        created_by: 'admin',
        last_modified: DateTime.convertFullTimestamp(1511964561),
        last_modified_by: 'admin',
        label: [expectedLabel]
      }
    };

    // Setting the @Input for the component to be our mocked  browserscript object
    component.browserScript = expectedBrowserScript;

    // Triggering ngOnchanges which in turn calls updateForm() and fills the form
    component.ngOnChanges({
      browserScript: new SimpleChange(null, component.browserScript, null)
    });

    fixture.detectChanges();
  });

  // Tests
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
    // Check that form is invalid after update
    expect(component.form.valid).toBe(false);

    // Update the form with a valid value
    component.form.patchValue({
      meta: {
        name: 'Endret navn',
      }
    });
    expect(component.form.valid).toBe(true);
    // check that the form is valid after update

    // Subscribe to the output of the component and check that emitted values are the same as the ones in the form
    component.update.subscribe((browserScriptValue: BrowserScript) => {
      expect(browserScriptValue.id).toBe(expectedBrowserScript.id);
      expect(browserScriptValue.script).toBe(expectedBrowserScript.script);
      expect(browserScriptValue.meta.name).toBe('Endret navn');
      expect(browserScriptValue.meta.description).toBe(expectedBrowserScript.meta.description);
      expect(browserScriptValue.meta.label).toEqual(expectedBrowserScript.meta.label);
      done();
    });

    // trigger the update function
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

