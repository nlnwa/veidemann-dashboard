import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CrawlLogShortcutsComponent} from './crawl-log-shortcuts.component';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {CommonsModule} from '../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CrawlLogShortcutsComponent', () => {
  let component: CrawlLogShortcutsComponent;
  let fixture: ComponentFixture<CrawlLogShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrawlLogShortcutsComponent],
      imports: [
        CoreTestingModule.forRoot(),
        AbilityModule,
        CommonsModule,
        NoopAnimationsModule
      ]
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
