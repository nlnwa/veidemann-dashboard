import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExecutionShortcutsComponent } from './job-execution-shortcuts.component';

describe('JobExecutionShortcutsComponent', () => {
  let component: JobExecutionShortcutsComponent;
  let fixture: ComponentFixture<JobExecutionShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobExecutionShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExecutionShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
