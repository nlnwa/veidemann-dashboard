import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleMultiDialogComponent } from './schedule-multi-dialog.component';

describe('ScheduleMultiDialogComponent', () => {
  let component: ScheduleMultiDialogComponent;
  let fixture: ComponentFixture<ScheduleMultiDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleMultiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
