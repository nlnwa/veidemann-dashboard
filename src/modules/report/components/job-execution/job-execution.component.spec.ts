import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExecutionComponent } from './job-execution.component';

describe('JobExecutionComponent', () => {
  let component: JobExecutionComponent;
  let fixture: ComponentFixture<JobExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
