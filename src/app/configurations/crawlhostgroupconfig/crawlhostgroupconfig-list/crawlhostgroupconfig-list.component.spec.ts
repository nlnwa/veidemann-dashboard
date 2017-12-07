import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CrawlHostGroupConfigListComponent} from './crawlhostgroupconfig-list.component';

xdescribe('CrawlhostgroupconfigListComponent', () => {
  let component: CrawlHostGroupConfigListComponent;
  let fixture: ComponentFixture<CrawlHostGroupConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlHostGroupConfigListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlHostGroupConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
