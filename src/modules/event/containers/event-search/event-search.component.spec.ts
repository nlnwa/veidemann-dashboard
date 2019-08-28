import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventSearchComponent} from './event-search.component';
import {SearchDataService, SeedDataService} from '../../../configurations/services/data';
import {CommonsModule} from '../../../commons/commons.module';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {SearchConfigurationService} from '../../../configurations/services/search-configuration.service';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {LabelService} from '../../../configurations/services/label.service';

describe('EventSearchComponent', () => {
  let component: EventSearchComponent;
  let fixture: ComponentFixture<EventSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventSearchComponent],
      imports: [CommonsModule, CoreTestingModule.forRoot(), RouterTestingModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(),
            queryParamMap: of(),
            snapshot: {
              data: {
                options: {
                  crawlJobs: []
                }
              }
            }
          }
        },
        {
          provide: SearchConfigurationService,
          useValue: {
            configObject$: of(null),
            search: () => of()
          }
        },
        {
          provide: LabelService,
          useValue: {}
        }
      ]
    }).overrideProvider(SearchDataService, {
      useValue: {
        ngOnDestroy: () => {
        },
        connect: () => of([]),
        disconnect: () => {
        }
      }
    }).overrideProvider(SeedDataService, {
      useValue: {
        ngOnDestroy: () => {
        },
        connect: () => of([]),
        disconnect: () => {
        }
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
