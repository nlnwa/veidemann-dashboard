import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlconfigDialogComponent } from './crawlconfig-dialog.component';

describe('CrawlconfigDialogComponent', () => {
  let component: CrawlconfigDialogComponent;
  let fixture: ComponentFixture<CrawlconfigDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlconfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlconfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
