import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlLogQueryComponent } from './crawl-log-query.component';

describe('CrawlLogQueryComponent', () => {
  let component: CrawlLogQueryComponent;
  let fixture: ComponentFixture<CrawlLogQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlLogQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
