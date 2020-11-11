import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePreviewComponent } from './schedule-preview.component';

describe('SchedulePreviewComponent', () => {
  let component: SchedulePreviewComponent;
  let fixture: ComponentFixture<SchedulePreviewComponent>;

  beforeEach(async(() => {
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
