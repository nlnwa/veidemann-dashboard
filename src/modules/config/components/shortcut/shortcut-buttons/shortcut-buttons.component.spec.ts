import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutButtonsComponent } from './shortcut-buttons.component';

describe('ShortcutButtonsComponent', () => {
  let component: ShortcutButtonsComponent;
  let fixture: ComponentFixture<ShortcutButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
