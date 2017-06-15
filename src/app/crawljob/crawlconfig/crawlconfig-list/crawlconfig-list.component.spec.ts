import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlconfigListComponent } from './crawlconfig-list.component';

describe('CrawlconfigListComponent', () => {
  let component: CrawlconfigListComponent;
  let fixture: ComponentFixture<CrawlconfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlconfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlconfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
