import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {JobExecutionStatusListComponent} from './job-execution-status-list.component';

describe('JobExecutionStatusListComponent', () => {
  let component: JobExecutionStatusListComponent;
  let fixture: ComponentFixture<JobExecutionStatusListComponent>;

  beforeEach(async(() => {
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
