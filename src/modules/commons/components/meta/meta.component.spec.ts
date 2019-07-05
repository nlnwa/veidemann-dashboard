import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MetaComponent} from './meta.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LabelsComponent} from '..';
import {DatePipe} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';

describe('MetaComponent', () => {
  let component: MetaComponent;
  let fixture: ComponentFixture<MetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetaComponent, LabelsComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        DragDropModule,
        NoopAnimationsModule
      ],
      providers: [DatePipe]
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
