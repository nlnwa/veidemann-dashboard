import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlHostGroupConfigDetailsComponent } from './crawlhostgroupconfig-details.component';

describe('CrawlHostGroupConfigDetailsComponent', () => {
  let component: CrawlHostGroupConfigDetailsComponent;
  let fixture: ComponentFixture<CrawlHostGroupConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlHostGroupConfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlHostGroupConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
