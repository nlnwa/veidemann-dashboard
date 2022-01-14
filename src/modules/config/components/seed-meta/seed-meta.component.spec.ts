import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SeedMetaComponent} from './seed-meta.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, ConfigApiService} from '../../../core/services';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelService} from '../../services';
import {of} from 'rxjs';
import {AnnotationComponent, LabelComponent} from '..';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {AbilityModule} from '@casl/angular';
import {CommonsModule} from '../../../commons';

describe('SeedMetaComponent', () => {
  let component: SeedMetaComponent;
  let fixture: ComponentFixture<SeedMetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SeedMetaComponent, LabelComponent, AnnotationComponent],
      imports: [
        CommonsModule,
        CoreTestingModule.forRoot(),
        RouterTestingModule,
        NoopAnimationsModule,
        AbilityModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {canUpdate: () => true}
        },
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
