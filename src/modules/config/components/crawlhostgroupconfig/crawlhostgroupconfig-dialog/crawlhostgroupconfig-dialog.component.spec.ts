import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlhostgroupconfigDialogComponent } from './crawlhostgroupconfig-dialog.component';

describe('CrawlhostgroupconfigDialogComponent', () => {
  let component: CrawlhostgroupconfigDialogComponent;
  let fixture: ComponentFixture<CrawlhostgroupconfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlhostgroupconfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlhostgroupconfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
