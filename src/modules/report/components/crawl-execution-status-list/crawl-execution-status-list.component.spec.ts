import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlExecutionStatusListComponent } from './crawl-execution-status-list.component';

describe('CrawlExecutionStatusListComponent', () => {
  let component: CrawlExecutionStatusListComponent;
  let fixture: ComponentFixture<CrawlExecutionStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlExecutionStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
