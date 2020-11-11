import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlhostgroupconfigMultiDialogComponent } from './crawlhostgroupconfig-multi-dialog.component';

describe('CrawlhostgroupconfigMultiDialogComponent', () => {
  let component: CrawlhostgroupconfigMultiDialogComponent;
  let fixture: ComponentFixture<CrawlhostgroupconfigMultiDialogComponent>;

  beforeEach(async(() => {
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
