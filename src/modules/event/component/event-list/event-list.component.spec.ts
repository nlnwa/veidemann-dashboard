import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventListComponent} from './event-list.component';
import {CommonsModule} from '../../../commons/commons.module';
import {SearchDataService} from '../../../configurations/services/data';
import {of} from 'rxjs';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent],
      imports: [CommonsModule],
      providers: [
        {
          provide: SearchDataService,
          useValue: {
            connect: () => of([]),
            disconnect: () => {
            }
          }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
