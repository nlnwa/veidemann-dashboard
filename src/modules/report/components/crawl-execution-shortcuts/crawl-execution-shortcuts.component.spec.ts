import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CrawlExecutionShortcutsComponent} from './crawl-execution-shortcuts.component';
import {AbilityModule} from '@casl/angular';
import {CommonsModule} from '../../../commons';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {ConfigObject, CrawlExecutionStatus} from '../../../../shared/models';

describe('CrawlExecutionShortcutsComponent', () => {
  let component: CrawlExecutionShortcutsComponent;
  let fixture: ComponentFixture<CrawlExecutionShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrawlExecutionShortcutsComponent],
      imports: [AbilityModule, CommonsModule, RouterTestingModule, NoopAnimationsModule, CoreTestingModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionShortcutsComponent);
    component = fixture.componentInstance;
    component.crawlExecutionStatus = new CrawlExecutionStatus();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
