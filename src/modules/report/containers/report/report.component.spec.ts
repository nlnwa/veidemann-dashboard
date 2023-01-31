import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ReportComponent} from './report.component';
import {CommonsModule} from '../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ReportNavigationListComponent} from '../report-navigation-list/report-navigation-list.component';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {AbilityModule} from '@casl/angular';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReportComponent, ReportNavigationListComponent],
      imports: [AbilityModule, CommonsModule, CoreTestingModule.forRoot(), NoopAnimationsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
