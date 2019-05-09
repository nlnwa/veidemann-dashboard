import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsMultiComponent } from './event-details-multi.component';

describe('EventMultiUpdateComponent', () => {
  let component: EventDetailsMultiComponent;
  let fixture: ComponentFixture<EventDetailsMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsMultiComponent ]
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
