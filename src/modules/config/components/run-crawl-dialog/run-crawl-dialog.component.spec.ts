import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RunCrawlDialogComponent} from './run-crawl-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../shared/models';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgModel} from '@angular/forms';

describe('RunCrawlDialogComponent', () => {
  let component: RunCrawlDialogComponent;
  let fixture: ComponentFixture<RunCrawlDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule],
      declarations: [ RunCrawlDialogComponent, NgModel ],
      providers: [
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunCrawlDialogComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run from Seed', () => {
    component.configObject = new ConfigObject({kind: Kind.SEED});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should run from CrawlJob', () => {
    component.configObject = new ConfigObject({kind: Kind.CRAWLJOB});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
