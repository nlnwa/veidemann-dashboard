import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MetaComponent} from './meta.component';
import {DatePipe} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelService} from '../../services';
import {of} from 'rxjs';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {CommonsModule} from '../../../commons';
import {LabelComponent} from '../label/label.component';
import {AnnotationComponent} from '../annotation/annotation.component';
import {AuthService} from '../../../core/services';

describe('MetaComponent', () => {
  let component: MetaComponent;
  let fixture: ComponentFixture<MetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MetaComponent, LabelComponent, AnnotationComponent],
      imports: [
        CoreTestingModule.forRoot(),
        CommonsModule,
        NoopAnimationsModule
      ],
      providers: [
        DatePipe,
        {
          provide: AuthService,
          useValue: {
            canUpdate: () => true,
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
    fixture = TestBed.createComponent(MetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form field name is valid if it contains 2 or more characters', () => {
    const name = component.form.controls.name;
    name.setValue('a');
    fixture.detectChanges();
    expect(name.status === 'INVALID').toBeTruthy();
    name.setValue('ab');
    fixture.detectChanges();
    expect(name.status === 'VALID').toBeTruthy();
  });

  it('form is not valid if required fields are missing', () => {
    const name = component.form.controls.name;
    name.markAsTouched();
    fixture.detectChanges();
    expect(component.form.status === 'INVALID').toBeTruthy();
  });

  it('form is valid if required fields are set', () => {
    const name = component.form.controls.name;
    name.setValue('Test');
    fixture.detectChanges();
    expect(component.form.status === 'VALID').toBeTruthy();
  });
});
