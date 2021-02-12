import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CrawlHostGroupConfigDetailsComponent} from './crawlhostgroupconfig-details.component';
import {FormGroup} from '@angular/forms';
import {SimpleChange} from '@angular/core';
import {ConfigObject, Kind, Label} from '../../../../../shared/models';
import {CommonsModule} from '../../../../commons/commons.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {IpRange} from '../../../../../shared/models/config/ip-range.model';
import {LabelService} from '../../../services/label.service';
import {of} from 'rxjs';

describe('CrawlHostGroupConfigDetailsComponent', () => {
  let component: CrawlHostGroupConfigDetailsComponent;
  let fixture: ComponentFixture<CrawlHostGroupConfigDetailsComponent>;
  let expectedConfigObject: ConfigObject;
  let expectedLabel: Label;
  let expectedIpRange;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlHostGroupConfigDetailsComponent],
      imports: [
        CommonsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
      ],
      providers: [
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

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlHostGroupConfigDetailsComponent);
    component = fixture.componentInstance;


    expectedLabel = new Label({
      key: 'Test',
      value: 'test',
    });

    expectedIpRange = new IpRange({
      ipFrom: '10.0.0.1',
      ipTo: '10.0.0.100'
    });


    expectedConfigObject = new ConfigObject({
      meta: {
        name: 'Test crawlhostgroupconfig',
        description: 'CrawlHostGroupConfig mock',
        created: '1511964561',
        createdBy: 'admin',
        lastModified: '1511964561',
        lastModifiedBy: 'admin',
        labelList: [expectedLabel]
      },
      id: '100',
      kind: Kind.CRAWLHOSTGROUPCONFIG,
      crawlHostGroupConfig: {
        ipRangeList: [expectedIpRange],
      }
    });

    component.configObject = expectedConfigObject;

    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
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
    expect(component.configObject.crawlHostGroupConfig.ipRangeList).toEqual([expectedIpRange]);
    expect(component.configObject.meta).toEqual(expectedConfigObject.meta);
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

    component.update.subscribe((configObject: ConfigObject) => {
      expect(configObject.id).toBe(expectedConfigObject.id);
      expect(configObject.crawlHostGroupConfig.ipRangeList).toEqual(expectedConfigObject.crawlHostGroupConfig.ipRangeList);
      expect(configObject.meta.name).toBe('Changed name');
      expect(configObject.meta.description).toBe(expectedConfigObject.meta.description);
      expect(configObject.meta.labelList).toEqual(expectedConfigObject.meta.labelList);
      done();
    });

    component.onUpdate();
  });

  it('Should save correct data', (done) => {
    expect(component.form.valid).toBe(true);

    component.save.subscribe((configObject: ConfigObject) => {
      expect(configObject.id).toBe(expectedConfigObject.id);
      expect(configObject.crawlHostGroupConfig.ipRangeList).toEqual(expectedConfigObject.crawlHostGroupConfig.ipRangeList);
      expect(configObject.meta).toEqual(expectedConfigObject.meta);
      done();
    });

    component.onSave();
  });
});
