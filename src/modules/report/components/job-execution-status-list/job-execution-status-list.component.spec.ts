import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {JobExecutionStatusListComponent} from './job-execution-status-list.component';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {CommonsModule} from '../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('JobExecutionStatusListComponent', () => {
  let component: JobExecutionStatusListComponent;
  let fixture: ComponentFixture<JobExecutionStatusListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KeyboardShortcutsModule, CommonsModule, NoopAnimationsModule],
      declarations: [JobExecutionStatusListComponent]
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
