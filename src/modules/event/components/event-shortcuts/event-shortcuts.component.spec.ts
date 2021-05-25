import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShortcutsComponent } from './event-shortcuts.component';

describe('EventShortcutsComponent', () => {
  let component: EventShortcutsComponent;
  let fixture: ComponentFixture<EventShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
