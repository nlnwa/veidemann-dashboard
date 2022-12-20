import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RunCrawlDialogComponent} from './run-crawl-dialog.component';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {ConfigObject, CrawlJob, Kind, Meta} from '../../../../shared/models';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {expect} from '@angular/flex-layout/_private-utils/testing';
import {CommonsModule} from '../../../commons';
import {MaterialModule} from '../../../commons/material.module';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {MatLegacyButtonHarness as MatButtonHarness} from '@angular/material/legacy-button/testing';
import {MatLegacySelectHarness as MatSelectHarness} from '@angular/material/legacy-select/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

const exampleCrawljobs = [
  {
    id: 'configObject_id',
    apiVersion: 'v1',
    kind: Kind.CRAWLJOB,
    meta: new Meta({
      name: 'Example CrawlJob',
    }),
    crawlJob: new CrawlJob({}),
    disabled: false
  },
  {
    id: 'configObject_id2',
    apiVersion: 'v1',
    kind: Kind.CRAWLJOB,
    meta: new Meta({
      name: 'Example CrawlJob2',
    }),
    crawlJob: new CrawlJob({}),
    disabled: false
  },
];

const exampleCrawljobToCrawl = {
  runCrawlReply: {
    jobExecutionId: 'testid'
  },
  configObject: new ConfigObject({
    id: 'test_crawljob_id',
    apiVersion: 'v1',
    kind: Kind.CRAWLJOB,
    meta: new Meta({
      name: 'Example Crawljob'
    }),
    crawlJob: new CrawlJob({}),
  }),
  crawlJobs: exampleCrawljobs,
};

const exampleSeedToCrawl = {
  kind: Kind.SEED,
  runCrawlReply: {
    jobExecutionId: 'testid'
  },
  configObject: new ConfigObject({
    id: 'test_seed_id',
    apiVersion: 'v1',
    kind: Kind.SEED,
    meta: new Meta({
      name: 'https://www.nb.no'
    })
  }),
  crawlJobs: exampleCrawljobs
};

const exampleSeedsToCrawl = {
  ...exampleSeedToCrawl,
  numberOfSeeds: 3
};

// TODO: Test that RunCrawlRequest that is returned in onRunCrawl contains correct data,

describe('RunCrawlDialogComponent', () => {
  let component: RunCrawlDialogComponent;
  let fixture: ComponentFixture<RunCrawlDialogComponent>;
  let loader: HarnessLoader;

  let runButton: MatButtonHarness;
  let cancelButton: MatButtonHarness;

  let crawljobSelect: MatSelectHarness;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MaterialModule,
        RouterTestingModule,
        CoreTestingModule.forRoot(),
        CommonsModule,
        NoopAnimationsModule
      ],
      declarations: [
        RunCrawlDialogComponent
      ],
      providers: [
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  describe('Run crawl dialog for start crawling a crawljob', async () => {
    beforeEach(async () => {
      TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: exampleCrawljobToCrawl});
      fixture = TestBed.createComponent(RunCrawlDialogComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      component = fixture.componentInstance;
      fixture.detectChanges();

      runButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'RUN'}));
      cancelButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'CANCEL'}));
    });

    it('should display correct name of crawljob to start crawling', () => {
      expect(fixture.debugElement.query(
        By.css('[data-testid="run_crawljob_dialog_text"]')).nativeElement.innerText)
        .toEqual('Are you sure you want to start the crawljob: Example Crawljob?');
    });

    it('should call onRunCrawl when run button is clicked', async () => {
      const onRunCrawlMock = spyOn(component, 'onRunCrawl');
      expect(await runButton.isDisabled()).toBeFalsy();
      await runButton.click();
      expect(onRunCrawlMock).toHaveBeenCalled();
    });
  });

  describe('Run crawl dialog for start crawling a single seed', async () => {
    beforeEach(async () => {
      TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: exampleSeedToCrawl});
      fixture = TestBed.createComponent(RunCrawlDialogComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      component = fixture.componentInstance;
      fixture.detectChanges();

      cancelButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'CANCEL'}));
      crawljobSelect = await loader.getHarness(MatSelectHarness);

    });

    it('should display correct name of seed to start crawling', () => {
      expect(fixture.debugElement.query(
        By.css('[data-testid="run_seed_dialog_text"]')).nativeElement.innerText)
        .toEqual('Are you sure you want to start crawling: https://www.nb.no?');
    });

    it('Run button should be active if crawljob is selected', async () => {
      expect(fixture.debugElement.query(By.css('[data-testid="runCrawlButton"]'))).toBeNull();
      await crawljobSelect.open();
      const options = await crawljobSelect.getOptions();
      await options[0].click();
      expect(component.jobRefId).toEqual('configObject_id');
      runButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'RUN'}));
      expect(await runButton.isDisabled()).toBeFalsy();
    });

    it('should call onRunCrawl when run button is clicked', async () => {
      const onRunCrawlMock = spyOn(component, 'onRunCrawl');
      await crawljobSelect.open();
      const options = await crawljobSelect.getOptions();
      await options[0].click();
      runButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'RUN'}));
      expect(await runButton.isDisabled()).toBeFalsy();
      await runButton.click();
      expect(onRunCrawlMock).toHaveBeenCalled();
    });
  });

  describe('Run crawl dialog for start crawling multiple seeds', async () => {
    beforeEach(async () => {
      TestBed.overrideProvider(MAT_DIALOG_DATA, {useValue: exampleSeedsToCrawl});
      fixture = TestBed.createComponent(RunCrawlDialogComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      component = fixture.componentInstance;
      fixture.detectChanges();

      cancelButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'CANCEL'}));
      crawljobSelect = await loader.getHarness(MatSelectHarness);
    });


    it('should display correct number of seeds to start crawling', () => {
      expect(fixture.debugElement.query(
        By.css('[data-testid="run_multiple_seeds_dialog_text"]')).nativeElement.innerText)
        .toEqual('Are you sure you want to start crawling 3 seeds?');
    });

    it('List of crawljobs to use for crawling the seeds contains all options: ', async () => {
      await crawljobSelect.open();
      const options = await crawljobSelect.getOptions();
      expect(options.length).toEqual(2);
    });

    it('Run button should be active if crawljob is selected', async () => {
      expect(fixture.debugElement.query(By.css('[data-testid="runCrawlButton"]'))).toBeNull();
      await crawljobSelect.open();
      const options = await crawljobSelect.getOptions();
      await options[0].click();
      expect(component.jobRefId).toEqual('configObject_id');
      runButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'RUN'}));
      expect(await runButton.isDisabled()).toBeFalsy();
    });
  });
});
