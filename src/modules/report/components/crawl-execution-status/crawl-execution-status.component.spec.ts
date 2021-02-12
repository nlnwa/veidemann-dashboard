import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CrawlExecutionStatusComponent} from './crawl-execution-status.component';

describe('CrawlExecutionStatusComponent', () => {
  let component: CrawlExecutionStatusComponent;
  let fixture: ComponentFixture<CrawlExecutionStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlExecutionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
