import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JobExecutionShortcutsComponent} from './job-execution-shortcuts.component';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {JobExecutionStatus} from '../../../../shared/models';
import {CommonsModule} from '../../../commons';

describe('JobExecutionShortcutsComponent', () => {
  let component: JobExecutionShortcutsComponent;
  let fixture: ComponentFixture<JobExecutionShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobExecutionShortcutsComponent],
      imports: [CoreTestingModule.forRoot(), CommonsModule]
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
