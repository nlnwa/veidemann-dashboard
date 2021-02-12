import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MetaComponent} from './meta.component';
import {MaterialModule} from '../../../commons/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LabelsComponent} from '../../../commons/components';
import {DatePipe} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LabelService} from '../../services/label.service';
import {of} from 'rxjs';

describe('MetaComponent', () => {
  let component: MetaComponent;
  let fixture: ComponentFixture<MetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MetaComponent, LabelsComponent],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        NoopAnimationsModule
      ],
      providers: [
        DatePipe,
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
    fixture = TestBed.createComponent(MetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
