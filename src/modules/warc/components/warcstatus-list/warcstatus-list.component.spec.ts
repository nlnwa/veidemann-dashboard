import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WarcStatusListComponent} from './warcstatus-list.component';
import {MaterialModule} from '../../../commons/material.module';
import {WarcStatusService} from '../../services/warcstatus.service';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('WarcStatusListComponent', () => {
  let component: WarcStatusListComponent;
  let fixture: ComponentFixture<WarcStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarcStatusListComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [{
        provide: WarcStatusService,
        useValue: {
          getValidationErrors: () => of([])
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarcStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
