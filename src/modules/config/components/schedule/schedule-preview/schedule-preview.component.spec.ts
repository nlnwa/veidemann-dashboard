import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SchedulePreviewComponent} from './schedule-preview.component';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {MatLabel} from '@angular/material/form-field';
import {CommonsModule} from '../../../../commons';

describe('SchedulePreviewComponent', () => {
  let component: SchedulePreviewComponent;
  let fixture: ComponentFixture<SchedulePreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule],
      declarations: [SchedulePreviewComponent, MatLabel],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject({kind: Kind.CRAWLSCHEDULECONFIG});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
