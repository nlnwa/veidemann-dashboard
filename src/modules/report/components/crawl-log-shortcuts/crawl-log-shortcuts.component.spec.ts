import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlLogShortcutsComponent } from './crawl-log-shortcuts.component';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../../core/core.testing.module';

describe('CrawlLogShortcutsComponent', () => {
  let component: CrawlLogShortcutsComponent;
  let fixture: ComponentFixture<CrawlLogShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrawlLogShortcutsComponent ],
      imports: [CoreTestingModule.forRoot(), AbilityModule]
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
