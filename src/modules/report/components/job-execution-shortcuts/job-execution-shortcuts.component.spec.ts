import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JobExecutionShortcutsComponent} from './job-execution-shortcuts.component';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {AbilityModule} from '@casl/angular';
import {JobExecutionStatus} from '../../../../shared/models';

describe('JobExecutionShortcutsComponent', () => {
  let component: JobExecutionShortcutsComponent;
  let fixture: ComponentFixture<JobExecutionShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobExecutionShortcutsComponent],
      imports: [CoreTestingModule.forRoot(), AbilityModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExecutionShortcutsComponent);
    component = fixture.componentInstance;
    component.jobExecutionStatus = new JobExecutionStatus();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
