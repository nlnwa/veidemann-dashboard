import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserScriptDetailsComponent} from './browserscript-details.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {BrowserScript, ConfigObject, Kind, Label, Meta} from '../../../../commons/models';

describe('BrowserScriptDetailsComponent', () => {
  let component: BrowserScriptDetailsComponent;
  let fixture: ComponentFixture<BrowserScriptDetailsComponent>;
  let expectedLabel: Label;
  let expectedConfigObject: ConfigObject;

  // Async beforeEach needed when using external template
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserScriptDetailsComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserScriptDetailsComponent);
    component = fixture.componentInstance;

    expectedLabel = new Label({
      key: 'Test',
      value: 'test',
    });

    expectedConfigObject = new ConfigObject({
      id: '1000',
      apiVersion: 'v1',
      kind: Kind.BROWSERSCRIPT,
      browserScript: new BrowserScript({script: 'var test=5; console.log(test)'}),
      meta: new Meta({
        name: 'Test',
        description: 'Dette er en test',
        created: '1511964561',
        createdBy: 'admin',
        lastModified: '1511964561',
        lastModifiedBy: 'admin',
        labelList: [expectedLabel]
      })
    });

    component.configObject = expectedConfigObject;

    component.ngOnChanges({
      browserScript: new SimpleChange(null, component.configObject, null)
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should have the correct data from @Input ', () => {
    expect(component.configObject.id).toEqual('1000');
    expect(component.configObject.browserScript.script).toEqual('var test=5; console.log(test)');
    expect(component.configObject.meta.name).toEqual('Test');
    expect(component.configObject.meta.description).toEqual('Dette er en test');
    expect(component.configObject.meta.labelList).toEqual([expectedLabel]);
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

    component.update.subscribe((value: ConfigObject) => {
      expect(value.id).toBe(expectedConfigObject.id);
      expect(value.browserScript).toBe(expectedConfigObject.browserScript);
      expect(value.meta.name).toBe('Endret navn');
      expect(value.meta.description).toBe(expectedConfigObject.meta.description);
      expect(value.meta.labelList).toEqual(expectedConfigObject.meta.labelList);
      done();
    });

    component.onUpdate();
  });

  it('Should save correct data', (done) => {
    expect(component.form.valid).toBe(true);

    component.save.subscribe((value: ConfigObject) => {
      expect(value.id).toBe(expectedConfigObject.id);
      expect(value.browserScript).toBe(expectedConfigObject.browserScript);
      expect(value.meta.name).toBe(expectedConfigObject.meta.name);
      expect(value.meta.description).toBe(expectedConfigObject.meta.description);
      expect(value.meta.labelList).toEqual(expectedConfigObject.meta.labelList);
      done();
    });

    component.onSave();

  });

});

