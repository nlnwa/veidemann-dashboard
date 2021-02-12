import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlhostgroupconfigPreviewComponent } from './crawlhostgroupconfig-preview.component';

describe('CrawlhostgroupconfigPreviewComponent', () => {
  let component: CrawlhostgroupconfigPreviewComponent;
  let fixture: ComponentFixture<CrawlhostgroupconfigPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlhostgroupconfigPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlhostgroupconfigPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
