import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWarcErrorComponent } from './event-warc-error.component';

describe('EventWarcErrorComponent', () => {
  let component: EventWarcErrorComponent;
  let fixture: ComponentFixture<EventWarcErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventWarcErrorComponent ]
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
