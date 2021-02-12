import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchedulePreviewComponent } from './schedule-preview.component';

describe('SchedulePreviewComponent', () => {
  let component: SchedulePreviewComponent;
  let fixture: ComponentFixture<SchedulePreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
