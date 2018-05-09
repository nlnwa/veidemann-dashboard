import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawlHostGroupConfigDetailsComponent} from './crawlhostgroupconfig-details.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NO_ERRORS_SCHEMA, SimpleChange} from '@angular/core';
import {CrawlHostGroupConfig, Label} from '../../../commons/models/config.model';

describe('CrawlHostGroupConfigDetailsComponent', () => {
  let component: CrawlHostGroupConfigDetailsComponent;
  let fixture: ComponentFixture<CrawlHostGroupConfigDetailsComponent>;
  let expectedCrawlHostGroupConfig: CrawlHostGroupConfig;
  let expectedLabel: Label;
  let expectedIpRange;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlHostGroupConfigDetailsComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlHostGroupConfigDetailsComponent);
    component = fixture.componentInstance;


    expectedLabel = {
      key: 'Test',
      value: 'test',
    };

    expectedIpRange = {
      ip_from: '10.0.0.1',
      ip_to: '10.0.0.100'
    };


    expectedCrawlHostGroupConfig = {
      id: '100',
      ip_range: [expectedIpRange],
      meta: {
        name: 'Test crawlhostgroupconfig',
        description: 'CrawlHostGroupConfig mock',
        created: '1511964561',
        created_by: 'admin',
        last_modified: '1511964561',
        last_modified_by: 'admin',
        label: [expectedLabel]
      }
    };

    component.crawlHostGroupConfig = expectedCrawlHostGroupConfig;

    component.ngOnChanges({
      crawlHostGroupConfig: new SimpleChange(null, component.crawlHostGroupConfig, null)
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
    expect(component.crawlHostGroupConfig.id).toEqual('100');
    expect(component.crawlHostGroupConfig.ip_range).toEqual([{ip_from: '10.0.0.1', ip_to: '10.0.0.100'}]);
    expect(component.crawlHostGroupConfig.meta.name).toEqual('Test crawlhostgroupconfig');
    expect(component.crawlHostGroupConfig.meta.description).toEqual('CrawlHostGroupConfig mock');
    expect(component.crawlHostGroupConfig.meta.label).toEqual([expectedLabel]);
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

    component.update.subscribe((crawlHostGroupConfigValue: CrawlHostGroupConfig) => {
      expect(crawlHostGroupConfigValue.id).toBe(expectedCrawlHostGroupConfig.id);
      expect(crawlHostGroupConfigValue.ip_range).toEqual(expectedCrawlHostGroupConfig.ip_range);
      expect(crawlHostGroupConfigValue.meta.name).toBe('Changed name');
      expect(crawlHostGroupConfigValue.meta.description).toBe(expectedCrawlHostGroupConfig.meta.description);
      expect(crawlHostGroupConfigValue.meta.label).toEqual(expectedCrawlHostGroupConfig.meta.label);
      done();
    });

    component.onUpdate();
  });

  it('Should save correct data', (done) => {
    expect(component.form.valid).toBe(true);

    component.save.subscribe((crawlHostGroupConfigValue: CrawlHostGroupConfig) => {
      expect(crawlHostGroupConfigValue.id).toBe(expectedCrawlHostGroupConfig.id);
      expect(crawlHostGroupConfigValue.ip_range).toEqual(expectedCrawlHostGroupConfig.ip_range);
      expect(crawlHostGroupConfigValue.meta.name).toBe(expectedCrawlHostGroupConfig.meta.name);
      expect(crawlHostGroupConfigValue.meta.description).toBe(expectedCrawlHostGroupConfig.meta.description);
      expect(crawlHostGroupConfigValue.meta.label).toEqual(expectedCrawlHostGroupConfig.meta.label);
      done();
    });

    component.onSave();
  });
});
