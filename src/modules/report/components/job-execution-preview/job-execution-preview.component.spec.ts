import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExecutionPreviewComponent } from './job-execution-preview.component';

describe('JobExecutionPreviewComponent', () => {
  let component: JobExecutionPreviewComponent;
  let fixture: ComponentFixture<JobExecutionPreviewComponent>;

  beforeEach(async(() => {
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
