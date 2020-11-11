import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterShortcutComponent } from './filter-shortcut.component';

describe('FilterShortcutComponent', () => {
  let component: FilterShortcutComponent;
  let fixture: ComponentFixture<FilterShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
