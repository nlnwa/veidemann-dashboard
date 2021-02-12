import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CrawlExecutionComponent} from './crawl-execution.component';

describe('CrawlExecutionComponent', () => {
  let component: CrawlExecutionComponent;
  let fixture: ComponentFixture<CrawlExecutionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
