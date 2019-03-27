import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ScheduleDetailsComponent} from './schedule-details.component';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CrawlScheduleConfig, Label} from '../../../../commons/models/configobject.model';

describe('ScheduleDetailsComponent', () => {
  let component: ScheduleDetailsComponent;
  let fixture: ComponentFixture<ScheduleDetailsComponent>;
  let expectedSchedule: CrawlScheduleConfig;
  let expectedLabel: Label;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleDetailsComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDetailsComponent);
    component = fixture.componentInstance;

    expectedSchedule = new CrawlScheduleConfig();
    expectedLabel = new Label();

    expectedLabel = {
      key: 'Label',
      value: 'Test'
    };

    expectedSchedule = {
      id: '100',
      cron_expression: '0 6 * * *',
      valid_from: null,
      valid_to: null,
      meta: {
        name: 'CrawlScheduleConfig test',
        description: 'CrawlScheduleConfig mock',
        created: '1511964561',
        created_by: 'admin',
        last_modified: '1511964561',
        last_modified_by: 'admin',
        label: [expectedLabel]
      }
    };

    component.schedule = expectedSchedule;

    component.ngOnChanges({
      schedule: new SimpleChange(null, component.schedule, null)
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
    expect(component.schedule.id).toEqual('100');
    expect(component.schedule.cron_expression).toEqual('0 6 * * *');
    expect(component.schedule.valid_from).toBe(null);
    expect(component.schedule.valid_to).toBe(null);
    expect(component.schedule.meta.name).toEqual('CrawlScheduleConfig test');
    expect(component.schedule.meta.description).toEqual('CrawlScheduleConfig mock');
    expect(component.schedule.meta.label).toEqual([expectedLabel]);
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

  it('Should not allow invalid cronjob input', () => {

  });


  it('Should update correct data', (done) => {
    component.form.patchValue({
      meta: {
        name: 'E',
      }
    });

    expect(component.form.valid).toBe(false);

    component.form.patchValue({
      meta: {
        name: 'Changed name',
      }
    });
    expect(component.form.valid).toBe(true);

    component.update.subscribe((scheduleValue: CrawlScheduleConfig) => {
      expect(scheduleValue.id).toBe(expectedSchedule.id);
      expect(scheduleValue.cron_expression).toBe(expectedSchedule.cron_expression);
      expect(scheduleValue.meta.name).toBe('Changed name');
      expect(scheduleValue.meta.name).not.toBe('changed name');
      expect(scheduleValue.meta.description).toBe(expectedSchedule.meta.description);
      expect(scheduleValue.meta.label).toEqual(expectedSchedule.meta.label);
      done();
    });

    component.onUpdate();
  });

  it('Should save correct data', (done) => {
    expect(component.form.valid).toBe(true);

    component.save.subscribe((scheduleValue: CrawlScheduleConfig) => {
      expect(scheduleValue.id).toBe(expectedSchedule.id);
      expect(scheduleValue.cron_expression).toBe(expectedSchedule.cron_expression);
      expect(scheduleValue.meta.name).toBe(expectedSchedule.meta.name);
      expect(scheduleValue.meta.description).toBe(expectedSchedule.meta.description);
      expect(scheduleValue.meta.label).toEqual(expectedSchedule.meta.label);
      done();
    });

    component.onSave();

  });
});
