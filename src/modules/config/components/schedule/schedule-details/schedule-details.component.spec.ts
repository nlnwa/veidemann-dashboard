import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ScheduleDetailsComponent} from './schedule-details.component';
import {Annotation, ConfigObject, CrawlScheduleConfig, Kind, Label, Meta} from '../../../../../shared/models';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AnnotationComponent, LabelComponent, MetaComponent} from '../..';
import {AuthService} from '../../../../core/services';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SimpleChange} from '@angular/core';
import {
  MatCalendarHarness,
  MatDatepickerInputHarness,
  MatDatepickerToggleHarness
} from '@angular/material/datepicker/testing';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import dayjs from 'dayjs'

const exampleCrawlSchedule: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.CRAWLSCHEDULECONFIG,
  meta: new Meta({
    name: 'Example CrawlSchedule',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example CrawlSchedule',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  crawlScheduleConfig: new CrawlScheduleConfig({
    cronExpression: '0 6 * * *',
    validFrom: '',
    validTo: ''
  })
};

describe('ScheduleDetailsComponent', () => {
  let component: ScheduleDetailsComponent;
  let fixture: ComponentFixture<ScheduleDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;

  let validFromFormField: MatFormFieldHarness;
  let validFrom: MatDatepickerInputHarness;
  let validFromToggle: MatDatepickerToggleHarness;
  let validToFormField: MatFormFieldHarness;
  let validTo: MatDatepickerInputHarness;
  let validToToggle: MatDatepickerToggleHarness;

  let cronMinuteFormField: MatFormFieldHarness;
  let cronMinuteInput: any;
  let cronHourFormField: MatFormFieldHarness;
  let cronHourInput: any;
  let cronDomFormField: MatFormFieldHarness;
  let cronDomInput: any;
  let cronMonthFormField: MatFormFieldHarness;
  let cronMonthInput: any;
  let cronDowFormField: MatFormFieldHarness;
  let cronDowInput: any;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonsModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot(),
      ],
      declarations: [
        ScheduleDetailsComponent,
        MetaComponent,
        LabelComponent,
        AnnotationComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            canUpdate: () => true,
            canDelete: () => true,
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
    fixture = TestBed.createComponent(ScheduleDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleCrawlSchedule);
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();
    validFromFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="validFrom"]'}));
    validFrom = await loader.getHarness<MatDatepickerInputHarness>(MatDatepickerInputHarness
      .with({selector: '[data-testid="validFromInput"]'}));
    validFromToggle = await loader.getHarness<MatDatepickerToggleHarness>(MatDatepickerToggleHarness
      .with({selector: '[data-testid="validFromToggle"]'}));
    validToFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="validTo"]'}));
    validTo = await loader.getHarness<MatDatepickerInputHarness>(MatDatepickerInputHarness
      .with({selector: '[data-testid="validToInput"]'}));
    validToToggle = await loader.getHarness<MatDatepickerToggleHarness>(MatDatepickerToggleHarness
      .with({selector: '[data-testid="validToToggle"]'}));
    cronMinuteFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="cronMinute"]'}));
    cronMinuteInput = (await cronMinuteFormField.getControl()) as any;
    cronHourFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="cronHour"]'}));
    cronHourInput = (await cronHourFormField.getControl()) as any;
    cronDomFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="cronDayOfMonth"]'}));
    cronDomInput = (await cronDomFormField.getControl()) as any;
    cronMonthFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="cronMonth"]'}));
    cronMonthInput = (await cronMonthFormField.getControl()) as any;
    cronDowFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="cronDayOfWeek"]'}));
    cronDowInput = (await cronDowFormField.getControl()) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new CrawlSchedule', async () => {

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

  describe('Updating a CrawlSchedule', async () => {

    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
    });
    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
    });

    it('clicking update button emits an update event', async () => {
      let update: ConfigObject | undefined;
      component.update.subscribe((config: ConfigObject) => {
        update = config;
      });

      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();

      await cronMinuteInput.setValue('10');
      fixture.detectChanges();

      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();

      await updateButton.click();
      expect(update.crawlScheduleConfig.cronExpression).toBe('10 6 * * *');
    });


    it('clicking revert buttons reverts form back to initial values', async () => {
      expect(await revertButton.isDisabled()).toBeTruthy();
      await validFromToggle.openCalendar();
      const cal: MatCalendarHarness = await validFromToggle.getCalendar();
      await cal.selectCell({today: true});
      await validFromToggle.closeCalendar();
      const fromDate = await validFrom.getValue();
      expect(fromDate).not.toBe('');
      fixture.detectChanges();
      expect(component.canRevert).toBeTruthy();
      await revertButton.click();
      fixture.detectChanges();
      expect(await validFrom.getValue()).toBe('');
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

      expect(del.crawlScheduleConfig).toBe(component.configObject.crawlScheduleConfig);
    });

    /** Testing pattern rules for cron expression form fields */

    it('cron minute form field should only except valid input', async () => {
      expect(await cronMinuteFormField.isControlValid()).toBeTruthy();
      await cronMinuteInput.setValue('60');
      expect(await cronMinuteFormField.isControlValid()).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await cronMinuteInput.setValue('abc');
      expect(await cronMinuteFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronMinuteInput.setValue('-48');
      expect(await cronMinuteFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronMinuteInput.setValue('01');
      expect(await cronMinuteFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronMinuteInput.setValue('1');
      expect(await cronMinuteFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMinuteInput.setValue('*');
      expect(await cronMinuteFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMinuteInput.setValue('0,30');
      expect(await cronMinuteFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMinuteInput.setValue('0-30');
      expect(await cronMinuteFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('cron hour form field should only except valid input', async () => {
      expect(await cronHourFormField.isControlValid()).toBeTruthy();
      await cronHourInput.setValue('25');
      expect(await cronHourFormField.isControlValid()).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await cronHourInput.setValue('abc');
      expect(await cronHourFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronHourInput.setValue('-12');
      expect(await cronHourFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronHourInput.setValue('01');
      expect(await cronHourFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronHourInput.setValue('1');
      expect(await cronHourFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronHourInput.setValue('*');
      expect(await cronHourFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronHourInput.setValue('0,3');
      expect(await cronHourFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronHourInput.setValue('0-12');
      expect(await cronHourFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('cron day of month form field should only except valid input', async () => {
      expect(await cronDomFormField.isControlValid()).toBeTruthy();
      await cronDomInput.setValue('32');
      expect(await cronDomFormField.isControlValid()).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await cronDomInput.setValue('abc');
      expect(await cronDomFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronDomInput.setValue('-16');
      expect(await cronDomFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronDomInput.setValue('01');
      expect(await cronDomFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronDomInput.setValue('1');
      expect(await cronDomFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDomInput.setValue('*');
      expect(await cronDomFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDomInput.setValue('1,31');
      expect(await cronDomFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDomInput.setValue('1-31');
      expect(await cronDomFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('cron month form field should only except valid input', async () => {
      expect(await cronMonthFormField.isControlValid()).toBeTruthy();
      await cronMonthInput.setValue('13');
      expect(await cronMonthFormField.isControlValid()).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await cronMonthInput.setValue('abc');
      expect(await cronMonthFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronMonthInput.setValue('-6');
      expect(await cronMonthFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronMonthInput.setValue('01');
      expect(await cronMonthFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronMonthInput.setValue('1');
      expect(await cronMonthFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMonthInput.setValue('*');
      expect(await cronMonthFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMonthInput.setValue('1,6');
      expect(await cronMonthFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMonthInput.setValue('1-12');
      expect(await cronMonthFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMonthInput.setValue('jan-dec');
      expect(await cronMonthFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronMonthInput.setValue('jan,feb,sep');
      expect(await cronMonthFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('cron day of week form field should only except valid input', async () => {
      expect(await cronDowFormField.isControlValid()).toBeTruthy();
      await cronDowInput.setValue('7');
      expect(await cronDowFormField.isControlValid()).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await cronDowInput.setValue('abc');
      expect(await cronDowFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronDowInput.setValue('-3');
      expect(await cronDowFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronDowInput.setValue('01');
      expect(await cronDowFormField.isControlValid()).toBeFalsy();
      expect(component.canUpdate).toBeFalsy();
      await cronDowInput.setValue('1');
      expect(await cronDowFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDowInput.setValue('*');
      expect(await cronDowFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDowInput.setValue('0,6');
      expect(await cronDowFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDowInput.setValue('1-5');
      expect(await cronDowFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDowInput.setValue('mon-fri');
      expect(await cronDowFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
      await cronDowInput.setValue('mon,tue,sat');
      expect(await cronDowFormField.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
    });
  });

  it('setting valid from date in calendar sets timestamp to beginning of day', async () => {
    console.log('running test')
    let update: ConfigObject | undefined;
    component.update.subscribe((config: ConfigObject) => {
      update = config;
    });

    await validFromToggle.openCalendar();
    const fromCal = await validFromToggle.getCalendar();
    const dates = fromCal.getCells();
    await fromCal.selectCell(dates[0]);
    await validFromToggle.closeCalendar();
    fixture.detectChanges();

    // Calculate the expected date and timestamp reliably
    const expectedDate = dayjs().startOf('month');
    console.log('expectedDate', expectedDate);
    const expected = expectedDate.format('D.M.YYYY');
    console.log('expected after formatting', expected);
    expect(await validFrom.getValue()).toEqual(expected);
    expect(component.canUpdate).toBeTruthy();

    fixture.detectChanges();
    component.onUpdate();

    const expectedTimestamp = expectedDate.format('YYYY-MM-DD') + 'T00:00:00.000Z';
    expect(update.crawlScheduleConfig.validFrom).toBe(expectedTimestamp);
  });

  it('setting valid from date in input sets timestamp to start of day', async () => {
    let update: ConfigObject | undefined;
    component.update.subscribe((config: ConfigObject) => {
      update = config;
    });

    await validFrom.setValue('32.1.2022');
    fixture.detectChanges();
    await validFrom.blur();
    expect(await validFromFormField.isControlValid()).toBeFalsy();
    expect(component.canUpdate).toBeFalsy();

    await validFrom.setValue('1.13.2022');
    await validFrom.blur();
    expect(await validFromFormField.isControlValid()).toBeFalsy();
    expect(component.canUpdate).toBeFalsy();

    await validFrom.setValue('1.1.2022');
    await validFrom.blur();
    expect(await validFromFormField.isControlValid()).toBeTruthy();
    expect(component.canUpdate).toBeTruthy();

    component.onUpdate();

    expect(update.crawlScheduleConfig.validFrom).toBe('2022-01-01T00:00:00.000Z');
  });

  it('setting valid to date in calendar sets timestamp to end of day', async () => {
    let update: ConfigObject | undefined;
    component.update.subscribe((config: ConfigObject) => {
      update = config;
    });

    await validToToggle.openCalendar();
    const toCal = await validToToggle.getCalendar();
    const daysInMonth = await toCal.getCells();
    await daysInMonth[daysInMonth.length -1].select();
    await validToToggle.closeCalendar();
    fixture.detectChanges();
    const expectedToDate = dayjs().endOf('month').format('D.M.YYYY');
    expect(await validTo.getValue()).toEqual(expectedToDate);
    expect(component.canUpdate).toBeTruthy();
    component.onUpdate();
    const expectedTimestamp = dayjs().endOf('month').format('YYYY-MM-DD') + 'T23:59:59.999Z';
    expect(update.crawlScheduleConfig.validTo).toBe(expectedTimestamp);
  });

  it('setting valid to date in input sets timestamp to end of day', async () => {
    let update: ConfigObject | undefined;
    component.update.subscribe((config: ConfigObject) => {
      update = config;
    });

    await validTo.setValue('1.32.2022');
    fixture.detectChanges();
    await validTo.blur();
    expect(await validToFormField.isControlValid()).toBeFalsy();
    expect(component.canUpdate).toBeFalsy();
    await validTo.setValue('32.1.2022');
    await validTo.blur();

    expect(await validToFormField.isControlValid()).toBeFalsy();
    expect(component.canUpdate).toBeFalsy();
    await validTo.setValue('1.1.2022');
    await validTo.blur();

    expect(await validToFormField.isControlValid()).toBeTruthy();
    expect(component.canUpdate).toBeTruthy();

    component.onUpdate();
    expect(update.crawlScheduleConfig.validTo).toBe('2022-01-01T23:59:59.999Z');
  });
});
