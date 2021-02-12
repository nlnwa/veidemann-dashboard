import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionShortcutComponent } from './action-shortcut.component';

describe('ActionShortcutComponent', () => {
  let component: ActionShortcutComponent;
  let fixture: ComponentFixture<ActionShortcutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
