import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {JobExecutionStatusListComponent} from './job-execution-status-list.component';

describe('JobExecutionStatusListComponent', () => {
  let component: JobExecutionStatusListComponent;
  let fixture: ComponentFixture<JobExecutionStatusListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobExecutionStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExecutionStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
