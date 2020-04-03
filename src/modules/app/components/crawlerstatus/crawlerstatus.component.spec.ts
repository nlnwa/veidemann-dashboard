import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerstatusComponent } from './crawlerstatus.component';

describe('CrawlerstatusComponent', () => {
  let component: CrawlerstatusComponent;
  let fixture: ComponentFixture<CrawlerstatusComponent>;

  beforeEach(async(() => {
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
