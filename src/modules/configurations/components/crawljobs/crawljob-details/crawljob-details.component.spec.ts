import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawljobDetailsComponent} from './crawljob-details.component';
import {CommonsModule} from '../../../../commons/commons.module';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {LabelService} from '../../../services/label.service';
import {of} from 'rxjs';

describe('CrawljobDetailsComponent', () => {
  let component: CrawljobDetailsComponent;
  let fixture: ComponentFixture<CrawljobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawljobDetailsComponent],
      imports: [
        CommonsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
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
    fixture = TestBed.createComponent(CrawljobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
