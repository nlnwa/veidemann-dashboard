import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeedMetaComponent} from './seed-meta.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LabelsComponent} from '..';
import {DatePipe} from '@angular/common';
import {BackendService} from '../../../core/services';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SeedMetaComponent', () => {
  let component: SeedMetaComponent;
  let fixture: ComponentFixture<SeedMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeedMetaComponent, LabelsComponent],
      imports: [MaterialModule, ReactiveFormsModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        DatePipe,
        {
          provide: BackendService,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
