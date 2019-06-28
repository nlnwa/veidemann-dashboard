import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WarcStatusDetailsComponent} from './warcstatus-details.component';
import {MaterialModule} from '../../../commons/material.module';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

describe('WarcStatusDetailsComponent', () => {
  let component: WarcStatusDetailsComponent;
  let fixture: ComponentFixture<WarcStatusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarcStatusDetailsComponent],
      imports: [MaterialModule, FormsModule],
      providers: [DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarcStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
