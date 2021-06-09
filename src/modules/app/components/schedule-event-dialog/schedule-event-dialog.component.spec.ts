import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEventDialogComponent } from './schedule-event-dialog.component';

describe('ScheduleEventDialogComponent', () => {
  let component: ScheduleEventDialogComponent;
  let fixture: ComponentFixture<ScheduleEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleEventDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
