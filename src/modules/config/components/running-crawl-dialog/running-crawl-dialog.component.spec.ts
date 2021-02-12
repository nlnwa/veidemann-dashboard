import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RunningCrawlDialogComponent } from './running-crawl-dialog.component';

describe('RunningCrawlDialogComponent', () => {
  let component: RunningCrawlDialogComponent;
  let fixture: ComponentFixture<RunningCrawlDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningCrawlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningCrawlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
