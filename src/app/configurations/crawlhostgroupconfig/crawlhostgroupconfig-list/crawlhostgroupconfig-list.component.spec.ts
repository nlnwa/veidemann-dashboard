import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CrawlhostgroupconfigListComponent} from './crawlhostgroupconfig-list.component';

describe('CrawlhostgroupconfigListComponent', () => {
  let component: CrawlhostgroupconfigListComponent;
  let fixture: ComponentFixture<CrawlhostgroupconfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlhostgroupconfigListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlhostgroupconfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
