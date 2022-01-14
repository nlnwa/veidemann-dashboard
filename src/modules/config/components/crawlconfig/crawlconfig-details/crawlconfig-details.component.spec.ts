import {CrawlConfigDetailsComponent} from './crawlconfig-details.component';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {Annotation, ConfigObject, CrawlConfig, Kind, Label, Meta} from '../../../../../shared/models';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MetaComponent} from '../../meta/meta.component';
import {LabelComponent} from '../../label/label.component';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AnnotationComponent} from '../../annotation/annotation.component';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';
import {HarnessLoader} from '@angular/cdk/testing';
import {ExtraConfig} from '../../../../../shared/models/config/crawlconfig.model';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SimpleChange} from '@angular/core';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../commons/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MatCheckboxHarness} from '@angular/material/checkbox/testing';

const exampleCrawlConfig: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.CRAWLCONFIG,
  meta: new Meta({
    name: 'Example CrawlConfig',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example crawlConfig',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  crawlConfig: new CrawlConfig({
    priorityWeight: 100,
    minimumDnsTtlS: 100,
    collectionRef: null,
    politenessRef: null,
    browserConfigRef: null,
    extra: new ExtraConfig({createScreenshot: true}),
  })
};

describe('CrawlConfigDetailsComponent', () => {
  let component: CrawlConfigDetailsComponent;
  let fixture: ComponentFixture<CrawlConfigDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;

  let screenshotCheckbox: MatCheckboxHarness;

  let priorityWeightFormField: MatFormFieldHarness;
  let priorityWeightInput: any;
  let minimumDnsTtlSFormField: MatFormFieldHarness;
  let minimumDnsTtlSInput: any;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AbilityModule,
        MaterialModule,
        RouterTestingModule,
        CoreTestingModule.forRoot(),
        CommonsModule,
        NoopAnimationsModule
      ],
      declarations: [
        CrawlConfigDetailsComponent,
        MetaComponent,
        LabelComponent,
        AnnotationComponent
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
    fixture = TestBed.createComponent(CrawlConfigDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleCrawlConfig);
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();

    priorityWeightFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness.with(
      {selector: '[data-testid="priorityWeight"]'}));
    priorityWeightInput = (await priorityWeightFormField.getControl()) as any;
    minimumDnsTtlSFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness.with(
      {selector: '[data-testid="minimumDnsTtlS"]'}
    ));
    minimumDnsTtlSInput = (await minimumDnsTtlSFormField.getControl()) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Creating a new crawlconfig', () => {
    beforeEach(async () => {
      component.configObject.id = '';
      component.ngOnChanges({
        configObject: new SimpleChange(null, component.configObject, null)
      });
      fixture.detectChanges();
      saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'SAVE'}));
    });

    it('show save button when creating a new config if form is valid', async () => {
      await minimumDnsTtlSInput.setValue('ten');
      fixture.detectChanges();
      expect(await saveButton.isDisabled()).toBeTruthy();
      expect(component.canSave).toBeFalsy();
      await minimumDnsTtlSInput.setValue('10');
      fixture.detectChanges();
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();
    });

    it('clicking the save button emits a save event', async () => {
      await minimumDnsTtlSInput.setValue('200');
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();

      let cfg: ConfigObject | undefined;
      component.save.subscribe((config: ConfigObject) => {
        cfg = config;
      });
      await saveButton.click();
      expect(cfg.crawlConfig.minimumDnsTtlS).toEqual(200);
    });
  });

  describe('Updating a crawlConfig', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));

      screenshotCheckbox = await loader.getHarness<MatCheckboxHarness>(MatCheckboxHarness.with({label: 'Create screenshot'}))
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      priorityWeightInput.setValue('200');
      fixture.detectChanges();
      expect(component.priorityWeight.valid).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('Clicking update button emits an update event', async () => {
      let update: ConfigObject | undefined;
      component.update.subscribe((config: ConfigObject) => {
        update = config;
      });

      await priorityWeightInput.setValue('1000');
      fixture.detectChanges();

      await updateButton.click();
      expect(update.crawlConfig.priorityWeight).toBe(1000);
    });

    /** Testing field validators.
     * Checking form status before and after updating field with invalid values.
     * Ensuring that the form can't be saved if a field is invalid, and that an error message is shown.
     *
     * minimumDnsTtlS: ['', Validators.pattern(NUMBER_OR_EMPTY_STRING)],
     * priorityWeight: ['', Validators.pattern(DECIMAL_NUMBER_OR_EMPTY_STRING)],
     */

    it('minimumDnsTtlS validates, displays error message and disables update button if invalid', async () => {

      // Setting input to an invalid value, should not be able to update form and should get an error message.
      await minimumDnsTtlSInput.setValue('twenty');
      fixture.detectChanges();
      minimumDnsTtlSInput.blur();
      expect(component.canUpdate).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(await minimumDnsTtlSFormField.isControlValid()).toBeFalsy();
      expect(await minimumDnsTtlSFormField.getTextErrors()).toEqual(['Must be a number or empty']);

      // Setting input to a valid value, form should be valid and able to be updated.
      await minimumDnsTtlSInput.setValue('20');
      fixture.detectChanges();
      minimumDnsTtlSInput.blur();
      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(await minimumDnsTtlSFormField.isControlValid()).toBeTruthy();
      expect(await minimumDnsTtlSFormField.getTextErrors()).toEqual([]);
    });

    it('priorityWeight validates, displays error message and disables update button if invalid', async () => {

      // Setting input to an invalid value, should not be able to update form and should get an error message.
      await priorityWeightInput.setValue('one.two');
      fixture.detectChanges();
      priorityWeightInput.blur();
      expect(component.canUpdate).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(await priorityWeightFormField.isControlValid()).toBeFalsy();
      expect(await priorityWeightFormField.getTextErrors()).toEqual(['Must be a number or empty']);

      // Setting input to a valid value, form should be valid and able to be updated.
      await priorityWeightInput.setValue('1.2');
      fixture.detectChanges();
      priorityWeightInput.blur();
      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(await priorityWeightFormField.isControlValid()).toBeTruthy();
      expect(await priorityWeightFormField.getTextErrors()).toEqual([]);
    });

    it('toggling screenshot checkbox updates form state', async () => {
      expect(component.canUpdate).toBeFalsy();
      expect(await screenshotCheckbox.isChecked()).toBe(true);
      await screenshotCheckbox.uncheck();
      expect(await screenshotCheckbox.isChecked()).toBe(false);
    });

    /** Testing revert button */

    it('When form is dirty the revert button becomes active,clicking it reverts form back to initial values',
      async () => {
        expect(await revertButton.isDisabled()).toBeTruthy();
        await priorityWeightInput.setValue('20');
        fixture.detectChanges();
        expect(await priorityWeightInput.getValue()).toBe('20');
        await revertButton.click();
        fixture.detectChanges();
        expect(await priorityWeightInput.getValue()).toBe('100');
        expect(component.canUpdate).toBeFalsy();
      });

    /**  Testing delete button */
    it('Clicking delete button emits a delete event', async () => {
      let del: ConfigObject | undefined;
      component.delete.subscribe((config: ConfigObject) => {
        del = config;
      });

      expect(await deleteButton.isDisabled()).toBeFalsy();
      expect(component.canDelete).toBeTruthy();
      await deleteButton.click();

      expect(del.crawlConfig).toBe(component.configObject.crawlConfig);
    });
  });
});

