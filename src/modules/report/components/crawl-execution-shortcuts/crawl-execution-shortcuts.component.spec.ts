import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlExecutionShortcutsComponent } from './crawl-execution-shortcuts.component';

describe('CrawlExecutionShortcutsComponent', () => {
  let component: CrawlExecutionShortcutsComponent;
  let fixture: ComponentFixture<CrawlExecutionShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrawlExecutionShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
