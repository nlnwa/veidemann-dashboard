import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlExecutionStatusListComponent} from './crawl-execution-status-list.component';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {CommonsModule} from '../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CrawlExecutionStatusListComponent', () => {
  let component: CrawlExecutionStatusListComponent;
  let fixture: ComponentFixture<CrawlExecutionStatusListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KeyboardShortcutsModule, CommonsModule, NoopAnimationsModule],
      declarations: [CrawlExecutionStatusListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
