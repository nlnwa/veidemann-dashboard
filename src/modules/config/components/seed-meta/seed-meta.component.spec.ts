import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeedMetaComponent} from './seed-meta.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../commons/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {DatePipe} from '@angular/common';
import {ConfigApiService} from '../../../core/services';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LabelService} from '../../services/label.service';
import {of} from 'rxjs';
import {LabelComponent} from '..';

describe('SeedMetaComponent', () => {
  let component: SeedMetaComponent;
  let fixture: ComponentFixture<SeedMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeedMetaComponent, LabelComponent],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        DragDropModule,
        NoopAnimationsModule
      ],
      providers: [
        DatePipe,
        {
          provide: ConfigApiService,
          useValue: {}
        },
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
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
