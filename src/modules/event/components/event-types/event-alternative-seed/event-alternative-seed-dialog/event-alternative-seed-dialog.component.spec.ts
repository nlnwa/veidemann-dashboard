import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAlternativeSeedDialogComponent } from './event-alternative-seed-dialog.component';

describe('EventAlternativeSeedDialogComponent', () => {
  let component: EventAlternativeSeedDialogComponent;
  let fixture: ComponentFixture<EventAlternativeSeedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAlternativeSeedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAlternativeSeedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
