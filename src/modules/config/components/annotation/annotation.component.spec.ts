import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AnnotationComponent} from './annotation.component';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../core/services/auth';
import {CoreTestingModule} from '../../../core/core.testing.module';

describe('AnnotationComponent', () => {
  let component: AnnotationComponent;
  let fixture: ComponentFixture<AnnotationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      providers: [UntypedFormBuilder,
        {
          provide: AuthService,
          useValue: {
            isAdmin: () => true,
            canUpdate: () => true,
          }
        }
      ],
      declarations: [AnnotationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
