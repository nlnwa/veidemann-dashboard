import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlhostgroupconfigMultiDialogComponent } from './crawlhostgroupconfig-multi-dialog.component';

describe('CrawlhostgroupconfigMultiDialogComponent', () => {
  let component: CrawlhostgroupconfigMultiDialogComponent;
  let fixture: ComponentFixture<CrawlhostgroupconfigMultiDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlhostgroupconfigMultiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlhostgroupconfigMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
