import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {PolitenessConfigDetailsComponent} from './politenessconfig-details.component';
import {CommonsModule} from '../../../../commons';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {
  Annotation,
  ConfigObject,
  Kind,
  Label,
  Meta,
  PolitenessConfig,
  robotsPolicies,
  RobotsPolicy
} from '../../../../../shared/models';
import {AnnotationComponent, DurationPickerComponent, LabelComponent, MetaComponent} from '../..';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatCheckboxHarness} from '@angular/material/checkbox/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SimpleChange} from '@angular/core';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {By} from '@angular/platform-browser';


const examplePolitenessConfig: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.POLITENESSCONFIG,
  meta: new Meta({
    name: 'Example PolitenessConfig',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example politenessConfig',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  politenessConfig: new PolitenessConfig({
    robotsPolicy: RobotsPolicy.OBEY_ROBOTS,
    customRobots: null,
    minimumRobotsValidityDurationS: 3600,
    useHostname: true
  })
};

describe('PolitenessConfigDetailsComponent', () => {
  let component: PolitenessConfigDetailsComponent;
  let fixture: ComponentFixture<PolitenessConfigDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;

  let policySelect: MatSelectHarness;
  let useHostnameCheckbox: MatCheckboxHarness;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AbilityModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot(),
        CommonsModule,
      ],
      declarations: [
        PolitenessConfigDetailsComponent,
        MetaComponent,
        DurationPickerComponent,
        LabelComponent,
        AnnotationComponent],

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
    fixture = TestBed.createComponent(PolitenessConfigDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.robotsPolicies = robotsPolicies;
    component.configObject = new ConfigObject(examplePolitenessConfig);
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();

    policySelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
    useHostnameCheckbox = await loader.getHarness<MatCheckboxHarness>(MatCheckboxHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new politenessConfig', () => {

    beforeEach(async () => {
      component.configObject.id = '';
      component.ngOnChanges({
        configObject: new SimpleChange(null, component.configObject, null)
      });
      fixture.detectChanges();
      saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'SAVE'}));
    });

    // TODO:  test parts of form that exists in child components
    // only field that could be invalid is Minimum robots validity

    it('show save button when creating a new config if form is valid', async () => {
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();
    });

    it('clicking the save button emits a save event', async () => {
      await useHostnameCheckbox.uncheck();
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();

      let cfg: ConfigObject | undefined;
      component.save.subscribe((config: ConfigObject) => {
        cfg = config;
      });
      await saveButton.click();
      expect(cfg.politenessConfig.useHostname).toEqual(false);
    });
  });

  describe('Updating a politenessConfig', () => {

    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await useHostnameCheckbox.uncheck();
      fixture.detectChanges();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });


    it('Clicking update button emits an update event', async () => {
      expect(component.canUpdate).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();

      let update: ConfigObject | undefined;
      component.update.subscribe((config: ConfigObject) => {
        update = config;
      });

      await policySelect.open();
      const ignoreRobotsOption = await policySelect.getOptions({text: 'IGNORE_ROBOTS'});
      await ignoreRobotsOption[0].click();

      fixture.detectChanges();

      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();

      await updateButton.click();
      expect(update.politenessConfig.robotsPolicy).toBe(RobotsPolicy.IGNORE_ROBOTS);
    });

    it('robots policy dropdown should be filled with all policy options ', async () => {
      await policySelect.open();
      const options = await policySelect.getOptions();
      await policySelect.close();
      expect(options.length).toEqual(7);
    });

    it('choosing robots policy CUSTOM_ROBOTS should enable a input field', async () => {
      expect(fixture.debugElement.query(By.css('[data-testid="customRobots"]'))).toBeNull();
      await policySelect.open();
      const customRobotsOption = await policySelect.getOptions({text: 'CUSTOM_ROBOTS'});
      await customRobotsOption[0].click();
      const customRobotsFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
        .with({selector: '[data-testid="customRobots"]'}));
      const customRobotsInput = (await customRobotsFormField.getControl()) as any;
      expect(fixture.debugElement.query(By.css('[data-testid="customRobots"]'))).toBeTruthy();
      expect(await customRobotsInput.getValue()).toEqual('');
      await customRobotsInput.setValue('Test custom robot policy');
      await policySelect.open();
      const obeyRobotsOption = await policySelect.getOptions({text: 'OBEY_ROBOTS'});
      await obeyRobotsOption[0].click();
      expect(fixture.debugElement.query(By.css('[data-testid="customRobots"]'))).toBeNull();
    });

    /** Testing revert button */

    it('When form is dirty the revert button becomes active,clicking it reverts form back to initial values',
      async () => {
        expect(await revertButton.isDisabled()).toBeTruthy();
        expect(component.canRevert).toBeFalsy();

        await useHostnameCheckbox.uncheck();
        fixture.detectChanges();
        expect(await revertButton.isDisabled()).toBeFalsy();
        expect(component.canRevert).toBeTruthy();

        await revertButton.click();
        fixture.detectChanges();
        expect(await useHostnameCheckbox.isChecked()).toBeTruthy();
        expect(component.canUpdate).toBeFalsy();
        expect(await revertButton.isDisabled()).toBeTruthy();
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

      expect(del.politenessConfig).toBe(component.configObject.politenessConfig);
    });
  });
});
