import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CrawlLogListComponent} from './crawl-log-list.component';

describe('CrawlLogListComponent', () => {
  let component: CrawlLogListComponent;
  let fixture: ComponentFixture<CrawlLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlLogListComponent ]
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
