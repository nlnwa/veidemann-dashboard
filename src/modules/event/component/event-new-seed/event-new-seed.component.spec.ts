import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventNewSeedComponent} from './event-new-seed.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonsModule} from '../../../commons/commons.module';
import {EventSearchComponent} from '../../containers/event-search/event-search.component';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {SearchConfigurationService} from '../../../configurations/services/search-configuration.service';
import {ActivatedRoute} from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SearchDataService} from '../../../configurations/services/data';
import {of} from 'rxjs';

describe('EventNewSeedComponent', () => {
  let component: EventNewSeedComponent;
  let fixture: ComponentFixture<EventNewSeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventNewSeedComponent, EventSearchComponent],
      imports: [CoreTestingModule.forRoot(), CommonsModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
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
          useValue: {}
        }
      ]
    }).overrideProvider(SearchDataService, {
      useValue: {
        connect: () => of([]),
        disconnect: () => {}
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNewSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
