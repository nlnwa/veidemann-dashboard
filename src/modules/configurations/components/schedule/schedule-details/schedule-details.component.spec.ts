import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ScheduleDetailsComponent} from './schedule-details.component';
import {SimpleChange} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ConfigObject, Kind, Label} from '../../../../commons/models';
import {CommonsModule} from '../../../../commons/commons.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';

describe('ScheduleDetailsComponent', () => {
  let component: ScheduleDetailsComponent;
  let fixture: ComponentFixture<ScheduleDetailsComponent>;
  let expectedConfigObject: ConfigObject;
  let expectedLabel: Label;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDetailsComponent],
      imports: [
        CommonsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDetailsComponent);
    component = fixture.componentInstance;

    expectedLabel = new Label({
      key: 'Label',
      value: 'Test'
    });

    expectedConfigObject = new ConfigObject({
      id: '100',
      kind: Kind.CRAWLSCHEDULECONFIG,
      crawlScheduleConfig: {
        cronExpression: '0 6 * * *',
        validFrom: null,
        validTo: null
      },
      meta: {
        name: 'CrawlScheduleConfig test',
        description: 'CrawlScheduleConfig mock',
        created: '1511964561',
        createdBy: 'admin',
        lastModified: '1511964561',
        lastModifiedBy: 'admin',
        labelList: [expectedLabel]
      }
    });

    component.configObject = expectedConfigObject;

    component.ngOnChanges({
      configObject: new SimpleChange(null, expectedConfigObject, null)
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
    expect(component.configObject.id).toEqual('100');
    expect(component.configObject.crawlScheduleConfig.cronExpression).toEqual('0 6 * * *');
    expect(component.configObject.crawlScheduleConfig.validFrom).toBe(null);
    expect(component.configObject.crawlScheduleConfig.validTo).toBe(null);
    expect(component.configObject.meta.name).toEqual('CrawlScheduleConfig test');
    expect(component.configObject.meta.description).toEqual('CrawlScheduleConfig mock');
    expect(component.configObject.meta.labelList).toEqual([expectedLabel]);
    expect(component.configObject).toEqual(expectedConfigObject);
  });

  it('should create a "FormGroup"', () => {
    expect(component.form instanceof FormGroup).toBe(true);
  });

  it('should have a valid form', () => {
    expect(component.form.valid).toBe(true);
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
    component.form.patchValue({
      meta: {
        ...expectedConfigObject.meta,
        name: 'E',
      }
    });

    expect(component.form.valid).toBe(false);

    component.form.patchValue({
      meta: {
        ...expectedConfigObject.meta,
        name: 'Changed name',
      }
    });
    expect(component.form.valid).toBe(true);

    component.update.subscribe((scheduleValue: ConfigObject) => {
      expect(scheduleValue.id).toBe(expectedConfigObject.id);
      expect(scheduleValue.crawlScheduleConfig.cronExpression).toBe(expectedConfigObject.crawlScheduleConfig.cronExpression);
      expect(scheduleValue.meta.name).toBe('Changed name');
      expect(scheduleValue.meta.name).not.toBe('changed name');
      expect(scheduleValue.meta.description).toBe(expectedConfigObject.meta.description);
      expect(scheduleValue.meta.labelList).toEqual(expectedConfigObject.meta.labelList);
      done();
    });

    component.onUpdate();
  });

  it('Should save correct data', (done) => {
    expect(component.form.valid).toBe(true);

    component.save.subscribe((scheduleValue: ConfigObject) => {
      expect(scheduleValue.id).toBe(expectedConfigObject.id);
      expect(scheduleValue.crawlScheduleConfig.cronExpression).toBe(expectedConfigObject.crawlScheduleConfig.cronExpression);
      expect(scheduleValue.meta.name).toBe(expectedConfigObject.meta.name);
      expect(scheduleValue.meta.description).toBe(expectedConfigObject.meta.description);
      expect(scheduleValue.meta.labelList).toEqual(expectedConfigObject.meta.labelList);
      done();
    });

    component.onSave();

  });
});
