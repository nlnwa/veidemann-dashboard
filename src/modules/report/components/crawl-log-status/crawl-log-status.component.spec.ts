import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CrawlLogStatusComponent} from './crawl-log-status.component';
import {CommonsModule} from '../../../commons';
import {CrawlLog} from '../../../../shared/models';

describe('CrawlLogStatusComponent', () => {
  let component: CrawlLogStatusComponent;
  let fixture: ComponentFixture<CrawlLogStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule],
      declarations: [ CrawlLogStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogStatusComponent);
    component = fixture.componentInstance;
    component.crawlLog = new CrawlLog();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
