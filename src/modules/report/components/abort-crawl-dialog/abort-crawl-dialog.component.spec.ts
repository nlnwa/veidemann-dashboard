import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AbortCrawlDialogComponent } from './abort-crawl-dialog.component';

describe('AbortCrawlDialogComponent', () => {
  let component: AbortCrawlDialogComponent;
  let fixture: ComponentFixture<AbortCrawlDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AbortCrawlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbortCrawlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
