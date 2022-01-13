import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawlLogQueryComponent } from './crawl-log-query.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../commons/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CrawlLogQueryComponent', () => {
  let component: CrawlLogQueryComponent;
  let fixture: ComponentFixture<CrawlLogQueryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [ CrawlLogQueryComponent],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
