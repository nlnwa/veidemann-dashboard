import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerstatusDialogComponent } from './crawlerstatus-dialog.component';

describe('CrawlerstatusDialogComponent', () => {
  let component: CrawlerstatusDialogComponent;
  let fixture: ComponentFixture<CrawlerstatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerstatusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerstatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
