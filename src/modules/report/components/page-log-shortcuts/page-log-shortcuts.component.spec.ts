import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogShortcutsComponent } from './page-log-shortcuts.component';

describe('PageLogShortcutsComponent', () => {
  let component: PageLogShortcutsComponent;
  let fixture: ComponentFixture<PageLogShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLogShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
