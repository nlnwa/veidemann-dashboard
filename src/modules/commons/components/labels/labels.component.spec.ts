import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabelsComponent} from './labels.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LabelService} from '../../../configurations/services/label.service';
import {of} from 'rxjs';

describe('LabelsComponent', () => {
  let component: LabelsComponent;
  let fixture: ComponentFixture<LabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsComponent],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, DragDropModule, NoopAnimationsModule],
      providers: [
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
    fixture = TestBed.createComponent(LabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
