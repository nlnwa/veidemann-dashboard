import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlerstatusComponent } from './crawlerstatus.component';

describe('CrawlerstatusComponent', () => {
  let component: CrawlerstatusComponent;
  let fixture: ComponentFixture<CrawlerstatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
