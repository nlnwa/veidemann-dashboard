import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlExecutionComponent} from './crawl-execution.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {CrawlExecutionService} from '../../services';
import {of} from 'rxjs';
import {CommonsModule} from '../../../commons';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ListDataSource} from '../../../../shared/models';
import {BASE_LIST} from '../../../../shared/directives';
import {CrawlExecutionStatusListComponent} from '../../components';

// TODO: Only creates, no data in view, needs further mocking
describe('CrawlExecutionComponent', () => {
  let component: CrawlExecutionComponent;
  let fixture: ComponentFixture<CrawlExecutionComponent>;

  const fakeActivatedRoute = {
    queryParamMap: of({
      get: () => {
      },
      getAll: () => {
      }
    }),
    snapshot: {
      data: {
        options: {}
      }
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        RouterModule,
        CoreTestingModule.forRoot(),
      ],
      declarations: [
        CrawlExecutionComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            fakeActivatedRoute
          }
        },
        {
          provide: CrawlExecutionService,
          useValue: {}
        },
        {
          provide: BASE_LIST,
          useClass: CrawlExecutionStatusListComponent,
        },
        ListDataSource
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
