import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMultiDialogComponent } from './schedule-multi-dialog.component';

describe('ScheduleMultiDialogComponent', () => {
  let component: ScheduleMultiDialogComponent;
  let fixture: ComponentFixture<ScheduleMultiDialogComponent>;

  beforeEach(async(() => {
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
