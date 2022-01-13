import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlLogDetailComponent } from './crawl-log-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CrawlLogService} from '../../services';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('CrawlLogDetailComponent', () => {
  let component: CrawlLogDetailComponent;
  let fixture: ComponentFixture<CrawlLogDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), RouterTestingModule],
      declarations: [ CrawlLogDetailComponent ],
      providers: [
        {provide: CrawlLogService, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
