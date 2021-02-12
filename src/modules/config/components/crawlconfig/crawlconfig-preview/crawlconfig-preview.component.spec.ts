import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlconfigPreviewComponent } from './crawlconfig-preview.component';

describe('CrawlconfigPreviewComponent', () => {
  let component: CrawlconfigPreviewComponent;
  let fixture: ComponentFixture<CrawlconfigPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlconfigPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlconfigPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
