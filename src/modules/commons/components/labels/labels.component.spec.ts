import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabelsComponent} from './labels.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LabelsComponent', () => {
  let component: LabelsComponent;
  let fixture: ComponentFixture<LabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsComponent],
      imports: [MaterialModule, ReactiveFormsModule, NoopAnimationsModule]
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
