import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventDetailsMultiComponent} from './event-details-multi.component';
import {CommonsModule} from '../../../commons/commons.module';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('EventDetailsMultiComponent', () => {
  let component: EventDetailsMultiComponent;
  let fixture: ComponentFixture<EventDetailsMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailsMultiComponent],
      imports: [CommonsModule, CoreTestingModule.forRoot(), NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
