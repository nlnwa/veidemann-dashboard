import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduleOverviewComponent} from './schedule-overview.component';


import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import {FullCalendarModule} from '@fullcalendar/angular';

// // register FullCalendar plugins
// FullCalendarModule.registerPlugins([
//   interactionPlugin,
//   dayGridPlugin,
//   timeGridPlugin,
// ]);

describe('ScheduleOverviewComponent', () => {
  let component: ScheduleOverviewComponent;
  let fixture: ComponentFixture<ScheduleOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleOverviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
