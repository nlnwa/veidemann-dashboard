import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SchedulePreviewComponent} from './schedule-preview.component';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {MatLabel} from '@angular/material/form-field';

describe('SchedulePreviewComponent', () => {
  let component: SchedulePreviewComponent;
  let fixture: ComponentFixture<SchedulePreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ SchedulePreviewComponent , MatLabel],
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
