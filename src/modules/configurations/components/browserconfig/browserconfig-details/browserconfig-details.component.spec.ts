import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserConfigDetailsComponent} from './browserconfig-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {DatePipe} from '@angular/common';
import {CommonsModule} from '../../../../commons/commons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelService} from '../../../services/label.service';
import {of} from 'rxjs';

describe('BrowserConfigDetailsComponent', () => {
  let component: BrowserConfigDetailsComponent;
  let fixture: ComponentFixture<BrowserConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserConfigDetailsComponent],
      imports: [
        RouterTestingModule,
        CommonsModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
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
    fixture = TestBed.createComponent(BrowserConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
