import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CrawlHostGroupConfigDetailsComponent} from './crawlhostgroupconfig-details.component';
import {SimpleChange} from '@angular/core';
import {Annotation, ConfigObject, CrawlHostGroupConfig, Kind, Label, Meta} from '../../../../../shared/models';
import {CommonsModule} from '../../../../commons';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AnnotationComponent, DurationPickerComponent, LabelComponent, MetaComponent} from '../..';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {By} from '@angular/platform-browser';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';

const exampleCrawlHostGroupConfig: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.CRAWLHOSTGROUPCONFIG,
  meta: new Meta({
    name: 'Example CrawlHostGroupConfig',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example CrawlHostGroupConfig',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  crawlHostGroupConfig: new CrawlHostGroupConfig({
    ipRangeList: [],
    minTimeBetweenPageLoadMs: 1000,
    maxTimeBetweenPageLoadMs: 2000,
    delayFactor: 1.0,
    maxRetries: 3,
    retryDelaySeconds: 3
  })
};

describe('CrawlHostGroupConfigDetailsComponent', () => {
  let component: CrawlHostGroupConfigDetailsComponent;
  let fixture: ComponentFixture<CrawlHostGroupConfigDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;
  let addIpRangeButton: MatButtonHarness;
  let removeIpRangeButton: MatButtonHarness;

  let ipRangeListElement: any;
  let delayFactorFormField: MatFormFieldHarness;
  let delayFactorInput: any;
  let ipRangeFromFormField: MatFormFieldHarness;
  let ipRangeFromInput: any;
  let ipRangeToFormField: MatFormFieldHarness;
  let ipRangeToInput: any;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AbilityModule,
        CommonsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
      ],
      declarations: [
        CrawlHostGroupConfigDetailsComponent,
        MetaComponent,
        LabelComponent,
        AnnotationComponent,
        DurationPickerComponent,
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
    fixture = TestBed.createComponent(CrawlHostGroupConfigDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleCrawlHostGroupConfig);
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();

    delayFactorFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="delayFactor"]'}));
    delayFactorInput = await delayFactorFormField.getControl();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new crawlHostGroupConfig', () => {

    beforeEach(async () => {
      component.configObject.id = '';
      component.ngOnChanges({
        configObject: new SimpleChange(null, component.configObject, null)
      });
      fixture.detectChanges();
      saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'SAVE'}));
    });

    it('show save button when creating a new config if form is valid', async () => {
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();
    });
  });

  describe('Updating a crawlHostGroupConfig', () => {

    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
      addIpRangeButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness
        .with({selector: '[data-testid="addIpRangeButton"]'}));
      ipRangeListElement = fixture.debugElement.query(By.css('[data-testid="ipRangeList"]'));
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await delayFactorInput.setValue('2.0');
      fixture.detectChanges();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });


    it('clicking update button emits an update event', async () => {
      expect(component.canUpdate).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();

      let update: ConfigObject | undefined;
      component.update.subscribe((config: ConfigObject) => {
        update = config;
      });

      await delayFactorInput.setValue('2');
      fixture.detectChanges();

      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();

      await updateButton.click();
      expect(update.crawlHostGroupConfig.delayFactor).toBe(2);
    });

    /** Testing IP-range formgroup */

    it('clicking add IP-range button enables input fields for adding a range', async () => {
      expect(ipRangeListElement).toBeNull();
      await addIpRangeButton.click();
      fixture.detectChanges();
      expect(ipRangeListElement).toBeDefined();
      ipRangeFromFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
        .with({selector: '[data-testid="ipRangeFrom"]'}));
      ipRangeFromInput = await ipRangeFromFormField.getControl();
      ipRangeToFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
        .with({selector: '[data-testid="ipRangeTo"]'}));
      ipRangeToInput = await ipRangeToFormField.getControl();
      expect(await ipRangeFromInput.getValue()).toEqual('');
      expect(await ipRangeToInput.getValue()).toEqual('');
    });

    it('clicking remove button removes range from list', async () => {
      expect(ipRangeListElement).toBeNull();
      await addIpRangeButton.click();
      fixture.detectChanges();
      expect(ipRangeListElement).toBeDefined();
      removeIpRangeButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness
        .with({selector: '[data-testid="removeIpRangeButton"]'}));
      await removeIpRangeButton.click();
      fixture.detectChanges();
      expect(ipRangeListElement).toBeNull();
    });

    it('update button should be disabled if ip range is inavlid', async () => {
      await addIpRangeButton.click();
      fixture.detectChanges();
      ipRangeFromFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
        .with({selector: '[data-testid="ipRangeFrom"]'}));
      ipRangeFromInput = await ipRangeFromFormField.getControl();
      ipRangeToFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
        .with({selector: '[data-testid="ipRangeTo"]'}));
      ipRangeToInput = await ipRangeToFormField.getControl();
      await ipRangeFromInput.setValue('192.168.1.1');
      await ipRangeToInput.setValue('193.168.1.100');
      expect(component.canUpdate).toBeFalsy();
      const invalidRangeError = fixture.debugElement.query(By.css('[data-testid="ipRangeInvalidError"]'));
      expect(invalidRangeError).toBeDefined();
      expect(invalidRangeError.properties.innerText).toEqual(' The IP range is not valid');
      await ipRangeToInput.setValue('192.169.1.100');
      fixture.detectChanges();
      // TODO check that error message is gone
      expect(component.canUpdate).toBeTruthy();
    });

    /** Testing revert button */

    it('When form is dirty the revert button becomes active,clicking it reverts form back to initial values',
      async () => {
        expect(await revertButton.isDisabled()).toBeTruthy();
        expect(component.canRevert).toBeFalsy();

        await delayFactorInput.setValue(3.0);
        fixture.detectChanges();
        expect(await revertButton.isDisabled()).toBeFalsy();
        expect(component.canRevert).toBeTruthy();

        await revertButton.click();
        fixture.detectChanges();
        expect(await delayFactorInput.getValue()).toBe('1');
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

      expect(del.crawlHostGroupConfig).toBe(component.configObject.crawlHostGroupConfig);
    });
  });
});
