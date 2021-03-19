import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlLogShortcutsComponent } from './crawl-log-shortcuts.component';

describe('CrawlLogShortcutsComponent', () => {
  let component: CrawlLogShortcutsComponent;
  let fixture: ComponentFixture<CrawlLogShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrawlLogShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
