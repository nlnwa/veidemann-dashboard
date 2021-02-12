import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlLogPreviewComponent } from './crawl-log-preview.component';

describe('CrawlLogPreviewComponent', () => {
  let component: CrawlLogPreviewComponent;
  let fixture: ComponentFixture<CrawlLogPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlLogPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
