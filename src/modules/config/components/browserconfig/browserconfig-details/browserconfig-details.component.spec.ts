import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BrowserConfigDetailsComponent} from './browserconfig-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {MaterialModule} from '../../../../commons/material.module';
import {AnnotationComponent, DurationPickerComponent, LabelComponent, MetaComponent, SelectorComponent} from '../..';
import {
  Annotation,
  BrowserConfig,
  BrowserScript,
  BrowserScriptType,
  ConfigObject,
  ConfigRef,
  Kind,
  Label,
  Meta
} from '../../../../../shared/models';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';
import {ReactiveFormsModule} from '@angular/forms';
import {MockComponent} from 'ng-mocks';
import {SimpleChange} from '@angular/core';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatLegacySelectHarness as MatSelectHarness} from '@angular/material/legacy-select/testing';
import {MatLegacyFormFieldHarness as MatFormFieldHarness} from '@angular/material/legacy-form-field/testing';
import {MatLegacyButtonHarness as MatButtonHarness} from '@angular/material/legacy-button/testing';

const exampleBrowserConfig: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.BROWSERCONFIG,
  meta: new Meta({
    name: 'Example BrowserConfig',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example browserConfig',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  browserConfig: new BrowserConfig({
    userAgent: 'veidemann/1.0',
    windowWidth: 1920,
    windowHeight: 1080,
    pageLoadTimeoutMs: 1000,
    maxInactivityTimeMs: 1000,
    scriptRefList: [new ConfigRef({kind: Kind.BROWSERSCRIPT, id: 'example_browserscript'})],
    scriptSelectorList: [],
  })
};

const exampleBrowserscripts = [
  new ConfigObject({
    id: 'browserscript_configObject_id',
    apiVersion: 'v1',
    kind: Kind.BROWSERSCRIPT,
    meta: new Meta({
      name: 'Example browserscript',
      createdBy: 'test',
      created: '01.01.1970',
      lastModified: '01.01.2021',
      lastModifiedBy: 'test',
      description: 'This is an example browserScript',
      labelList: [new Label({key: 'test', value: 'label'})],
      annotationList: [new Annotation({key: 'test', value: 'annotation'})]
    }),
    browserScript: new BrowserScript({
      script: '`console.log(example);',
      browserScriptType: BrowserScriptType.ON_LOAD,
      urlRegexpList: []
    })
  }),
  new ConfigObject({
    id: 'browserscript2_configObject_id',
    apiVersion: 'v1',
    kind: Kind.BROWSERSCRIPT,
    meta: new Meta({
      name: 'Example browserscript 2',
      createdBy: 'test',
      created: '01.01.1970',
      lastModified: '01.01.2021',
      lastModifiedBy: 'test',
      description: 'This is another example browserScript',
      labelList: [new Label({key: 'test', value: 'label'})],
      annotationList: [new Annotation({key: 'test', value: 'annotation'})]
    }),
    browserScript: new BrowserScript({
      script: '`console.log(example2);',
      browserScriptType: BrowserScriptType.ON_LOAD,
      urlRegexpList: []
    })
  })
];


describe('BrowserConfigDetailsComponent', () => {
  let component: BrowserConfigDetailsComponent;
  let fixture: ComponentFixture<BrowserConfigDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;

  let userAgentFormField: MatFormFieldHarness;
  let userAgentInput: any;
  let windowHeightFormField: MatFormFieldHarness;
  let windowHeightInput: any;
  let windowWidthFormField: MatFormFieldHarness;
  let windowWidthInput: any;
  let browserScriptSelect: MatSelectHarness;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AbilityModule,
        MaterialModule,
        RouterTestingModule,
        CoreTestingModule.forRoot(),
        CommonsModule,
        NoopAnimationsModule,
      ],
      declarations: [
        BrowserConfigDetailsComponent,
        MetaComponent,
        MockComponent(DurationPickerComponent),
        SelectorComponent,
        LabelComponent,
        AnnotationComponent,
      ],
      providers: [
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        },
        {
          provide: AuthService, useValue: {
            canUpdate: () => true,
            canDelete: () => true
          }
        },
      ]
    })
      .compileComponents();
  }));


  beforeEach(async () => {
    fixture = TestBed.createComponent(BrowserConfigDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleBrowserConfig);
    component.browserScripts = exampleBrowserscripts;
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();

    userAgentFormField = await loader.getHarness(MatFormFieldHarness.with({selector: '[data-testid="userAgent"]'}));
    userAgentInput = (await userAgentFormField.getControl()) as any;
    windowHeightFormField = await loader.getHarness(MatFormFieldHarness.with({selector: '[data-testid="windowHeight"]'}));
    windowHeightInput = (await windowHeightFormField.getControl()) as any;
    windowWidthFormField = await loader.getHarness(MatFormFieldHarness.with({selector: '[data-testid="windowWidth"]'}));
    windowWidthInput = (await windowWidthFormField.getControl()) as any;
    browserScriptSelect = await loader.getHarness(MatSelectHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new browserconfig', () => {
    beforeEach(async () => {
      component.configObject.id = '';
      component.ngOnChanges({
        configObject: new SimpleChange(null, component.configObject, null)
      });
      fixture.detectChanges();
      saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'SAVE'}));
    });

    /**
     * Checking that the save button is shown when creating a new config.
     * Should be disabled when form is invalid.
     * When clicking the save button a save event should be emitted.
     */

    it('should show save button when creating a new browserConfig if form is valid: ', async () => {
      await userAgentInput.setValue('t');
      fixture.detectChanges();
      expect(await saveButton.isDisabled()).toBeTruthy();
      expect(component.canSave).toBeFalsy();
      await userAgentInput.setValue('test');
      fixture.detectChanges();
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();
    });

    it('Clicking the save button should emit a save event', async () => {
      await userAgentInput.setValue('test');
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();

      let cfg: ConfigObject | undefined;
      component.save.subscribe((config: ConfigObject) => {
        cfg = config;
      });

      await saveButton.click();
      expect(cfg.browserConfig.userAgent).toBe('test');
    });
  });

  describe('Updating an existing browserconfig', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      windowWidthInput.setValue('1024');
      fixture.detectChanges();
      expect(component.windowHeight.valid).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('Clicking update button emits an update event', async () => {
      let update: ConfigObject | undefined;
      component.update.subscribe((config: ConfigObject) => {
        update = config;
      });

      await userAgentInput.setValue('test');
      fixture.detectChanges();

      await updateButton.click();
      expect(update.browserConfig.userAgent).toBe('test');
    });

    /** Testing field validators.
     * Checking form status before and after updating field with invalid values.
     * Ensuring that the form can't be saved if a field is invalid, and that an error message is shown.
     */

    it('userAgent validates, displays error message and disables update button if invalid', async () => {
      await userAgentInput.setValue('t');
      fixture.detectChanges();
      userAgentInput.blur();

      expect(component.canUpdate).toBeFalsy();
      expect(await userAgentFormField.isControlValid()).toBeFalsy();
      expect(await userAgentFormField.getTextErrors()).toEqual(['Must contain at least 2 characters.']);
      expect(component.userAgent.hasError('minlength')).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeTruthy();

      userAgentInput.setValue('veidemann/1.0');
      fixture.detectChanges();
      expect(await userAgentFormField.isControlValid()).toBeTruthy();
      expect(await userAgentFormField.getTextErrors()).toEqual([]);
      expect(component.userAgent.hasError('minlength')).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();
    });

    it('windowWidth validates, displays error message and disables update button if invalid', async () => {
      await windowWidthInput.setValue('nineteen twenty');
      fixture.detectChanges();
      windowWidthInput.blur();
      expect(component.canUpdate).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(await windowWidthFormField.isControlValid()).toBeFalsy();
      expect(await windowWidthFormField.getTextErrors()).toEqual(['Must be a number.']);

      // Setting input to a valid value, form should be valid and able to be updated.
      await windowWidthInput.setValue('1024');
      fixture.detectChanges();
      windowWidthInput.blur();
      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(await windowWidthFormField.isControlValid()).toBeTruthy();
      expect(await windowWidthFormField.getTextErrors()).toEqual([]);
    });

    it('windowHeight validates, displays error message and disables update button if invalid', async () => {
      // Setting input to an invalid value, should not be able to update form and should get an error message.
      await windowHeightInput.setValue('ten eighty');
      fixture.detectChanges();
      windowHeightInput.blur();

      expect(component.canUpdate).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(await windowHeightFormField.isControlValid()).toBeFalsy();
      expect(await windowHeightFormField.getTextErrors()).toEqual(['Must be a number.']);

      // Setting input to a valid value, form should be valid and able to be updated.
      await windowHeightInput.setValue('768');
      fixture.detectChanges();
      windowHeightInput.blur();

      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(await windowHeightFormField.isControlValid()).toBeTruthy();
      expect(await windowHeightFormField.getTextErrors()).toEqual([]);
    });

    it('BrowserScript dropdown should contain all options', async () => {
      await browserScriptSelect.open();
      const options = await browserScriptSelect.getOptions();
      expect(options.length).toEqual(2);
    });

    it('updates form value when browerscript is selected from dropdown', async () => {
      await browserScriptSelect.open();
      const options = await browserScriptSelect.getOptions();
      await options[0].click();
      expect(component.scriptRefIdList.value).toContain('browserscript_configObject_id');
      await options[1].click();
      expect(component.scriptRefIdList.value).toEqual(['browserscript_configObject_id', 'browserscript2_configObject_id']);
      await browserScriptSelect.close();
      expect(await browserScriptSelect.isOpen()).toBeFalsy();
    });

    it('revert button becomes active when form is dirty', async () => {
      expect(await revertButton.isDisabled()).toBeTruthy();
      await userAgentInput.setValue('update');
      fixture.detectChanges();
      expect(component.canRevert).toBeTruthy();
      expect(await revertButton.isDisabled()).toBeFalsy();
    });

    it('Clicking revert buttons reverts form back to initial values', async () => {
      expect(await revertButton.isDisabled()).toBeTruthy();
      await userAgentInput.setValue('update');
      fixture.detectChanges();
      expect(component.canRevert).toBeTruthy();
      await revertButton.click();
      fixture.detectChanges();
      expect(await userAgentInput.getValue()).toEqual('veidemann/1.0');
      expect(component.canRevert).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
    });

    it('Clicking delete button emits a delete event', async () => {
      let del: ConfigObject | undefined;
      component.delete.subscribe((config: ConfigObject) => {
        del = config;
      });

      expect(await deleteButton.isDisabled()).toBeFalsy();
      expect(component.canDelete).toBeTruthy();
      await deleteButton.click();

      expect(del.browserConfig).toBe(component.configObject.browserConfig);
    });
  });
});
