import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventDetailsComponent} from './event-details.component';
import {CommonsModule} from '../../../commons/commons.module';
import {ChangelogComponent, EventNewSeedComponent, EventWarcErrorComponent} from '..';
import {RouterTestingModule} from '@angular/router/testing';
import {EventSearchComponent} from '../../containers/event-search/event-search.component';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {LabelService} from '../../../configurations/services/label.service';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonsModule,
        RouterTestingModule,
        CoreTestingModule.forRoot(),
        NoopAnimationsModule
      ],
      declarations: [
        EventDetailsComponent,
        EventNewSeedComponent,
        EventWarcErrorComponent,
        EventSearchComponent,
        ChangelogComponent
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
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
