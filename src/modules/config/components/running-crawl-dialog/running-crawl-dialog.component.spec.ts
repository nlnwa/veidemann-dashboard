import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningCrawlDialogComponent } from './running-crawl-dialog.component';

describe('RunningCrawlDialogComponent', () => {
  let component: RunningCrawlDialogComponent;
  let fixture: ComponentFixture<RunningCrawlDialogComponent>;

  beforeEach(async(() => {
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
