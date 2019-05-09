import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNewSeedComponent } from './event-new-seed.component';

describe('EventNewSeedComponent', () => {
  let component: EventNewSeedComponent;
  let fixture: ComponentFixture<EventNewSeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventNewSeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNewSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
