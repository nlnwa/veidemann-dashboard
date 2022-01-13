import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {JobExecutionComponent} from './job-execution.component';
import {RouterTestingModule} from '@angular/router/testing';
import {JobExecutionService} from '../../services';

import {CoreTestingModule} from '../../../core/core.testing.module';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('JobExecutionComponent', () => {
  let component: JobExecutionComponent;
  let fixture: ComponentFixture<JobExecutionComponent>;

  const fakeActivatedRoute = {
    queryParamMap: of({
      get: () => {},
      getAll: () => {}
    }),
    snapshot: {
      data: {
        options: {}
      }
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), RouterTestingModule],
      declarations: [JobExecutionComponent],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: MatDialog, useValue: {}},
        {provide: JobExecutionService, useValue: {}}
      ]
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
