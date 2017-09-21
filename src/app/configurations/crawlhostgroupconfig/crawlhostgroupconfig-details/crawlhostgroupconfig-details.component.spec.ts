import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlhostgroupconfigDetailsComponent } from './crawlhostgroupconfig-details.component';

describe('CrawlhostgroupconfigDetailsComponent', () => {
  let component: CrawlhostgroupconfigDetailsComponent;
  let fixture: ComponentFixture<CrawlhostgroupconfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlhostgroupconfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlhostgroupconfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
