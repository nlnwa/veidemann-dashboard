import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EntityDetailsComponent} from './entity-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../commons/material.module';
import {LabelsComponent, MetaComponent} from '../../../../commons/components';
import {AuthService} from '../../../../core/services/auth';
import {DatePipe} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LabelService} from '../../../services/label.service';
import {of} from 'rxjs';

describe('EntityDetailsComponent', () => {
  let component: EntityDetailsComponent;
  let fixture: ComponentFixture<EntityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityDetailsComponent, MetaComponent, LabelsComponent],
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
          provide: AuthService,
          useValue: {
            isAdmin: () => true
          }
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
    fixture = TestBed.createComponent(EntityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
