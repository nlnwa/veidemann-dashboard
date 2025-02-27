import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {ScriptAnnotationComponent} from './script-annotation.component';

describe('ScriptAnnotationComponent', () => {
  let component: ScriptAnnotationComponent;
  let fixture: ComponentFixture<ScriptAnnotationComponent>;

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
      declarations: [ScriptAnnotationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
