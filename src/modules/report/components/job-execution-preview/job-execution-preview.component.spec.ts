import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobExecutionPreviewComponent } from './job-execution-preview.component';

describe('JobExecutionPreviewComponent', () => {
  let component: JobExecutionPreviewComponent;
  let fixture: ComponentFixture<JobExecutionPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobExecutionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExecutionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
