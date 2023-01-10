import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlLogListComponent} from './crawl-log-list.component';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {CommonsModule} from '../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CrawlLogListComponent', () => {
  let component: CrawlLogListComponent;
  let fixture: ComponentFixture<CrawlLogListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        KeyboardShortcutsModule,
        CommonsModule,
        NoopAnimationsModule
      ],
      declarations: [CrawlLogListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
