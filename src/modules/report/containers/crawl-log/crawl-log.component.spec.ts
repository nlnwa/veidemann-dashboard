import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CrawlLogComponent} from './crawl-log.component';

describe('CrawlLogComponent', () => {
  let component: CrawlLogComponent;
  let fixture: ComponentFixture<CrawlLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
