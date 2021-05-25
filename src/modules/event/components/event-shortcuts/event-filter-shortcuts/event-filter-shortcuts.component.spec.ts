import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFilterShortcutsComponent } from './event-filter-shortcuts.component';

describe('EventFilterShortcutsComponent', () => {
  let component: EventFilterShortcutsComponent;
  let fixture: ComponentFixture<EventFilterShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFilterShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFilterShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
