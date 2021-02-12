import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {PolitenessConfigDetailsComponent} from './politenessconfig-details.component';
import {CommonsModule} from '../../../../commons/commons.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {LabelService} from '../../../services/label.service';
import {of} from 'rxjs';

describe('PolitenessconfigDetailsComponent', () => {
  let component: PolitenessConfigDetailsComponent;
  let fixture: ComponentFixture<PolitenessConfigDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PolitenessConfigDetailsComponent],
      imports: [
        CommonsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot(),
      ],
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
    fixture = TestBed.createComponent(PolitenessConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
