import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlLogDetailComponent } from './crawl-log-detail.component';

describe('CrawlLogDetailComponent', () => {
  let component: CrawlLogDetailComponent;
  let fixture: ComponentFixture<CrawlLogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlLogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
