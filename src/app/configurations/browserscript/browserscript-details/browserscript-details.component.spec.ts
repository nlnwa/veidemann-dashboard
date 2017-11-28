import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserScriptDetailsComponent} from './browserscript-details.component';
import {BrowserScript, Label} from '../../../commons/models/config.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';

describe('BrowserScriptDetailsComponent', () => {
  let component: BrowserScriptDetailsComponent;
  let fixture: ComponentFixture<BrowserScriptDetailsComponent>;
  let expectedBrowserScript;
  let testLabel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserScriptDetailsComponent],
      providers: [
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserScriptDetailsComponent);
    component = fixture.componentInstance;


    // Pretend that it was wired to something that supplied a browserscript
    expectedBrowserScript = new BrowserScript();
    testLabel = new Label();

    testLabel = {
      type: 'Test',
      value: 'test',
    }
    expectedBrowserScript = {
      id: '1000',
      script: 'var test=5; console.log(test)',
      meta: {
        name: 'Test',
        description: 'Dette er en test',
        created: '',
        created_by: 'admin',
        last_modified: '',
        last_modified_by: 'admin',
        label: [testLabel]
      }
    }

    component.browserScript = expectedBrowserScript;
    component.ngOnChanges({
      browserScript: new SimpleChange(null, component.browserScript, null)
    });

    fixture.detectChanges();
    // component.ngAfterViewInit();
    console.log(component.browserScript);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined()
  });

  it('should have the correct data from @Input ', () => {
    expect(component.browserScript.id).toEqual('1000');
    expect(component.browserScript.script).toContain('var');
    expect(component.browserScript.meta.name).toEqual('Test');
    expect(component.browserScript.meta.description).toEqual('Dette er en test');
    expect(component.browserScript.meta.label).toEqual([testLabel]);
  });

  it('should create a "FormGroup"', () => {
    expect(component.form instanceof FormGroup).toBe(true);
  });

  it('form should contain data', () => {
    console.log(component.form);
  });


  it('Form should be valid', () => {
    expect(component.form.valid).toBe(true);
    expect(component.form.valid).not.toBe(false);
  });

  it('Should not be able to update or save form', () => {
    expect(component.showSave).toBe(false);
    expect(component.canUpdate).toBe(false);
  })

  // Test that data supplied to form is correct and that logic for buttons is correct.
  it('should disable update button', () => {
    expect(component.canUpdate).toBe(false);
    console.log('status update', component.canUpdate);
  })


  // Test update data in form. Buttons should be enabled, and form validation should work

  it('Form should not be valid after removing name', () => {
    component.form.patchValue({
      meta: {
        name: '',
      }
    });
    expect(component.form.valid).toBe(false);
  })

  it('Should enable update button when editing form', () => {

    const compiled = fixture.debugElement.nativeElement;
    const nameInput = compiled.querySelector('input[formControlName=name]');
    nameInput.value = 'Test 2';

    dispatchEvent(nameInput);

    console.log(component.form);
    console.log('Form valid', component.form.valid);
    console.log('Kan oppdateres', component.canUpdate);
    console.log('Form dirty', component.form.dirty);
    expect(component.form.valid).toBe(true);
    expect(component.canUpdate).toBe(true);
  })

  // Test that saved updated data is correct
});

