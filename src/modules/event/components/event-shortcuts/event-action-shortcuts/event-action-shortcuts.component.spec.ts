import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventActionShortcutsComponent } from './event-action-shortcuts.component';

describe('EventActionShortcutsComponent', () => {
  let component: EventActionShortcutsComponent;
  let fixture: ComponentFixture<EventActionShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventActionShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventActionShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
