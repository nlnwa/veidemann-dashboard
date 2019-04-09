import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMultiUpdateComponent } from './event-multi-update.component';

describe('EventMultiUpdateComponent', () => {
  let component: EventMultiUpdateComponent;
  let fixture: ComponentFixture<EventMultiUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMultiUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMultiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
