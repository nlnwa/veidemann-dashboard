import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventWarcErrorComponent} from './event-warc-error.component';
import {MaterialModule} from '../../../commons/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('EventWarcErrorComponent', () => {
  let component: EventWarcErrorComponent;
  let fixture: ComponentFixture<EventWarcErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventWarcErrorComponent],
      imports: [MaterialModule, ReactiveFormsModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventWarcErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
