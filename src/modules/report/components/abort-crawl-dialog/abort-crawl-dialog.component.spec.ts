import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AbortCrawlDialogComponent} from './abort-crawl-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonsModule} from '../../../commons';

describe('AbortCrawlDialogComponent', () => {
  let component: AbortCrawlDialogComponent;
  let fixture: ComponentFixture<AbortCrawlDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule],
      declarations: [AbortCrawlDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
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
