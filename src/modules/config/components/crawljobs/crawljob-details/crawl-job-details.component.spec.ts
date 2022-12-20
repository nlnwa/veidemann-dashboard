import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CrawlJobDetailsComponent} from './crawl-job-details.component';
import {CommonsModule} from '../../../../commons';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {ConfigService} from '../../../../commons/services';
import {
  AnnotationComponent,
  DurationPickerComponent,
  FilesizeInputComponent,
  LabelComponent,
  MetaComponent,
  ScriptAnnotationComponent
} from '../..';
import {
  Annotation,
  BrowserScript,
  ConfigObject,
  ConfigRef,
  CrawlConfig,
  CrawlJob,
  CrawlScheduleConfig,
  Kind,
  Label,
  Meta
} from '../../../../../shared/models';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatLegacyButtonHarness as MatButtonHarness} from '@angular/material/legacy-button/testing';
import {CrawlLimitsConfig} from '../../../../../shared/models/config/crawljob.model';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SimpleChange} from '@angular/core';
import {MatLegacySlideToggleHarness as MatSlideToggleHarness} from '@angular/material/legacy-slide-toggle/testing';
import {ExtraConfig} from '../../../../../shared/models/config/crawlconfig.model';
import {MatLegacySelectHarness as MatSelectHarness} from '@angular/material/legacy-select/testing';
import {MockComponent, MockPipe} from 'ng-mocks';
import {ScriptAnnotationsPipe} from '../../../pipe';


const exampleCrawlConfigs: ConfigObject[] = [
  new ConfigObject({
    id: 'configObject_id',
    apiVersion: 'v1',
    kind: Kind.CRAWLCONFIG,
    meta: new Meta({
      name: 'Example CrawlConfig',
      createdBy: 'test',
      created: '01.01.1970',
      lastModified: '01.01.2021',
      lastModifiedBy: 'test',
      description: 'This is an example CrawlConfig',
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
  })
];

const exampleBrowserScripts: ConfigObject[] = [
  new ConfigObject({
    id: 'configObject_id',
    apiVersion: 'v1',
    kind: Kind.BROWSERSCRIPT,
    meta: new Meta({
      name: 'Example BrowserScript',
      createdBy: 'test',
      created: '01.01.1970',
      lastModified: '01.01.2021',
      lastModifiedBy: 'test',
      description: 'This is an example BrowserScript',
      labelList: [new Label({key: 'test', value: 'label'})],
      annotationList: [new Annotation({key: 'test', value: 'annotation'})]
    }),
    browserScript: new BrowserScript({
      script: 'console.log(\'test\')',
      urlRegexpList: [],
      browserScriptType: null
    })
  })
];

const exampleSchedules: ConfigObject[] = [
  new ConfigObject({
    id: 'configObject_id',
    apiVersion: 'v1',
    kind: Kind.CRAWLSCHEDULECONFIG,
    meta: new Meta({
      name: 'Example Schedule',
      createdBy: 'test',
      created: '01.01.1970',
      lastModified: '01.01.2021',
      lastModifiedBy: 'test',
      description: 'This is an example Schedule',
      labelList: [new Label({key: 'test', value: 'label'})],
      annotationList: [new Annotation({key: 'test', value: 'annotation'})]
    }),
    crawlScheduleConfig: new CrawlScheduleConfig({
      cronExpression: '*****',
      validFrom: '01.01.1970',
      validTo: '01.01.2021'
    })
  })
];

const exampleCrawlJob: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.CRAWLJOB,
  meta: new Meta({
    name: 'Example CrawlJob',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example CrawlJob',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  crawlJob: new CrawlJob({
    scheduleRef: new ConfigRef({kind: Kind.CRAWLSCHEDULECONFIG, id: 'configObject_id'}),
    crawlConfigRef: new ConfigRef({kind: Kind.CRAWLCONFIG, id: 'configObject_id'}),
    scopeScriptRef: new ConfigRef({kind: Kind.BROWSERSCRIPT, id: 'configObject_id'}),
    limits: new CrawlLimitsConfig({
      maxDurationS: 1,
      maxBytes: 1024
    }),
    disabled: false
  })
};

describe('CrawljobDetailsComponent', () => {
  let component: CrawlJobDetailsComponent;
  let fixture: ComponentFixture<CrawlJobDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;
  let runCrawlButton: MatButtonHarness;

  let disableToggle: MatSlideToggleHarness;
  let crawlConfigSelect: MatSelectHarness;
  let scheduleSelect: MatSelectHarness;
  let scopeScriptSelect: MatSelectHarness;

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
        CrawlJobDetailsComponent,
        FilesizeInputComponent,
        DurationPickerComponent,
        MetaComponent,
        LabelComponent,
        AnnotationComponent,
        MockComponent(ScriptAnnotationComponent),
        MockPipe(ScriptAnnotationsPipe)
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            canUpdate: () => true,
            canDelete: () => true
          }
        },
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CrawlJobDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleCrawlJob);
    component.scopeScripts = exampleBrowserScripts;
    component.crawlScheduleConfigs = exampleSchedules;
    component.crawlConfigs = exampleCrawlConfigs;
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();
    disableToggle = await loader.getHarness<MatSlideToggleHarness>(MatSlideToggleHarness);
    scheduleSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness
      .with({selector: '[data-testid="scheduleRef"]'}));
    crawlConfigSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness
      .with({selector: '[data-testid="crawlConfigRef"]'}));
    scopeScriptSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness
      .with({selector: '[data-testid="scopeScriptRef"]'}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new crawlJob', () => {
    beforeEach(async () => {
      component.configObject.id = '';
      component.configObject.crawlJob.crawlConfigRef = new ConfigRef({});
      component.ngOnChanges({
        configObject: new SimpleChange(null, component.configObject, null)
      });
      fixture.detectChanges();
      saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'SAVE'}));
    });

    it('show save button when creating a new config if form is valid', async () => {
      expect(await saveButton.isDisabled()).toBeTruthy();
      expect(component.canSave).toBeFalsy();
      await crawlConfigSelect.open();
      const crawlConfigSelectOptions = await crawlConfigSelect.getOptions();
      await crawlConfigSelectOptions[0].click();
      await crawlConfigSelect.close();
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();
    });
  });
  describe('updating a crawlJob', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
      runCrawlButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'RUN CRAWL'}));
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      expect(await disableToggle.isChecked()).toBeFalsy();
      await disableToggle.check();
      fixture.detectChanges();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('update button should be active if required fields is filled', async () => {
      component.configObject.crawlJob.crawlConfigRef = new ConfigRef({});
      component.configObject.crawlJob.scopeScriptRef = new ConfigRef({});
      component.ngOnChanges({
        configObject: new SimpleChange(null, component.configObject, null)
      });
      fixture.detectChanges();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await crawlConfigSelect.open();
      const crawlConfigSelectOptions = await crawlConfigSelect.getOptions();
      await crawlConfigSelectOptions[0].click();
      fixture.detectChanges();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await scopeScriptSelect.open();
      const scopeScriptSelectOptions = await scopeScriptSelect.getOptions();
      await scopeScriptSelectOptions[1].click();
      fixture.detectChanges();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('schedule dropdown contains all options', async () => {
      await scheduleSelect.open();
      const options = await scheduleSelect.getOptions();
      expect(options.length).toBe(2);
    });

    it('crawlConfig dropdown contains all options', async () => {
      await crawlConfigSelect.open();
      const options = await crawlConfigSelect.getOptions();
      expect(options.length).toBe(1);
    });

    it('scope script dropdown contains all options', async () => {
      await scopeScriptSelect.open();
      const options = await scopeScriptSelect.getOptions();
      expect(options.length).toBe(2);
    });

    it('clicking update button emits an update event', async () => {
      let update: ConfigObject | undefined;
      component.update.subscribe((config: ConfigObject) => {
        update = config;
      });

      await disableToggle.check();
      fixture.detectChanges();

      await updateButton.click();
      expect(update.crawlJob.disabled).toBe(true);
    });


    it('clicking revert buttons reverts form back to initial values', async () => {
      expect(await revertButton.isDisabled()).toBeTruthy();
      await disableToggle.check();
      fixture.detectChanges();
      expect(component.canRevert).toBeTruthy();
      await revertButton.click();
      fixture.detectChanges();
      expect(await disableToggle.isChecked()).toBe(false);
      expect(component.canRevert).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
    });

    it('clicking delete button emits a delete event', async () => {
      let del: ConfigObject | undefined;
      component.delete.subscribe((config: ConfigObject) => {
        del = config;
      });

      expect(await deleteButton.isDisabled()).toBeFalsy();
      expect(component.canDelete).toBeTruthy();
      await deleteButton.click();

      expect(del.crawlJob).toBe(component.configObject.crawlJob);
    });

    it('clicking run crawl button should emit runCrawl event', async () => {
      let runCfg: ConfigObject | undefined;
      component.runCrawl.subscribe((config: ConfigObject) => {
        runCfg = config;
      });
      expect(await runCrawlButton.isDisabled()).toBeFalsy();
      await runCrawlButton.click();
      expect(runCfg).toBe(component.configObject);

    });
  });
});
