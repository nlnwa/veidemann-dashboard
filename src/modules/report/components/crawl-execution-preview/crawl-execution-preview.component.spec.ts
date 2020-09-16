import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlExecutionPreviewComponent } from './crawl-execution-preview.component';

describe('CrawlExecutionPreviewComponent', () => {
  let component: CrawlExecutionPreviewComponent;
  let fixture: ComponentFixture<CrawlExecutionPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlExecutionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
