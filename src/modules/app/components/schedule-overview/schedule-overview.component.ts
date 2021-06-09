import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {Observable, throwError} from 'rxjs';
import {ConfigObject, Kind} from '../../../../shared/models';
import {ConfigApiService, ErrorService} from '../../../core';
import {createListRequest} from '../../../config/func/query';
import {catchError, toArray} from 'rxjs/operators';
import * as cronParser from 'cron-parser';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleEventDialogComponent} from '../schedule-event-dialog/schedule-event-dialog.component';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-schedule-overview',
  templateUrl: './schedule-overview.component.html',
  styleUrls: ['./schedule-overview.component.css'],
  providers: [ConfigApiService]
})

export class ScheduleOverviewComponent implements OnInit {

  crawlJobs$: Observable<ConfigObject[]>;
  crawlJobs: ConfigObject[];
  crawlSchedules$: Observable<ConfigObject[]>;
  crawlSchedules: ConfigObject[];

  viewDate: Date = new Date();
  colorsPerCrawlJob = [];

  @ViewChild('scheduleCalendar') calendar: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.onEventClick.bind(this),
    dateClick: this.onDateClick.bind(this),
    headerToolbar: {
      start: 'today,prev,next',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    customButtons: {
      prev: {
        text: '<',
        click: this.onPrevious.bind(this)
      },
      next: {
        text: '>',
        click: this.onNext.bind(this)
      },
      today: {
        text: 'today',
        click: this.onToday.bind(this)
      }

    },
    height: 600,
    locale: 'NO-nb',
    events: [],
    validRange: (nowDate) => {
      return {
        start: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
      };
    }
  };


  constructor(private errorService: ErrorService,
              private configApiService: ConfigApiService,
              private dialog: MatDialog) {
  }

  get activeJobs() {
    return this.crawlJobs.filter(configObject => configObject.crawlJob.disabled === false);
  }

  ngOnInit(): void {
    this.crawlJobs$ = this.configApiService.list(createListRequest(Kind.CRAWLJOB.valueOf())).pipe(
      toArray(),
      catchError(error => {
        this.errorService.dispatch(error);
        return throwError(error);
      }),
    );
    this.crawlJobs$.subscribe(jobs => {
      this.crawlJobs = jobs;
      for (const job of this.crawlJobs) {
        this.colorsPerCrawlJob.push({
          id: job.id,
          color: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
        });

      }
    });
    this.crawlSchedules$ = this.configApiService.list(createListRequest(Kind.CRAWLSCHEDULECONFIG.valueOf())).pipe(
      toArray(),
      catchError(error => {
        this.errorService.dispatch(error);
        return throwError((error));
      })
    );
    this.crawlSchedules$.subscribe(schedules => {
        this.crawlSchedules = schedules;
        this.updateCalendar();
      }
    );
  }

  updateCalendar() {
    const dates = this.getScheduledJobs();
    const events = [];
    for (const date of dates) {
      for (const job of date.executionDates) {
        const event = {
          title: date.crawljob,
          start: job.start,
          end: job.end,
          crawlJobId: date.id,
          backgroundColor: this.colorsPerCrawlJob.find(c => c.id === date.id).color
        };
        events.push(event);
      }
    }
    this.calendarOptions.events = events;
    this.calendar.ngDoCheck();
  }

  getScheduledJobs(): any {
    const scheduledJobs = [];
    const activeJobs = this.activeJobs;

    for (const job of activeJobs) {
      const scheduleRefId = job.crawlJob.scheduleRef.id;
      const duration = job.crawlJob.limits.maxDurationS;
      if (scheduleRefId !== '') {
        const crawlSchedule = this.crawlSchedules.find(schedule => schedule.id === scheduleRefId);
        if (crawlSchedule) {
          const cronExpression = crawlSchedule.crawlScheduleConfig.cronExpression;
          if (cronExpression !== '') {
            const schedule = this.getScheduleFomCron(cronExpression, duration);
            scheduledJobs.push({
              crawljob: job.meta.name,
              id: job.id,
              executionDates: schedule
            });
          }
        }
      }
    }
    return scheduledJobs;
  }

  getScheduleFomCron(cron: string, duration: number) {
    const options = {
      startDate: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1),
      endDate: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1),
      utc: true,
      iterator: true,
      tz: moment.tz.guess(),
    };

    const prevOptions = {
      startDate: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1),
      endDate: this.viewDate,
      iterator: true,
      utc: true,
      tz: moment.tz.guess(),
    };

    const schedule = [];
    try {
      const interval = cronParser.parseExpression(cron, options);

      while (true) {
        try {
          const obj = interval.next();
          schedule.push({
            // @ts-ignore
            start: obj.value.toISOString(),
            // @ts-ignore
            end: this.addDuration(obj.value, duration),
          });
        } catch (e) {
          break;
        }
      }
    } catch (error) {
      console.log('error', error.message);
    }
    try {
      const interval2 = cronParser.parseExpression(cron, prevOptions);

      while (true) {
        try {
          const obj = interval2.prev();
          schedule.push({
            // @ts-ignore
            start: obj.value.toISOString(),
            // @ts-ignore
            end: this.addDuration(obj.value, duration),
          });
        } catch (e) {
          break;
        }
      }
    } catch (err) {
      console.log('Error: ', err.message);
    }
    return schedule;
  }



  onEventClick(event: any) {
    const data = {
      id: event.event.extendedProps.crawlJobId,
      start: event.event.startStr,
      end: event.event.endStr,
      name: event.event.title
    };

    this.dialog.open(ScheduleEventDialogComponent, {data});
  }

  addDuration(timestamp: any, duration) {
    const date = new Date(timestamp);
    date.setSeconds(date.getSeconds() + duration);
    return date.toISOString();

  }

  onToday() {
    this.viewDate = new Date();
    this.calendar.getApi().today();
    this.updateCalendar();
  }

  onNext() {
    this.calendar.getApi().next();
    if (this.calendar.getApi().getDate().getMonth() !== this.viewDate.getMonth()) {
      this.viewDate.setMonth(this.viewDate.getMonth() + 1);
      this.updateCalendar();
    }
  }

  onPrevious() {
    this.calendar.getApi().prev();
    if (this.calendar.getApi().getDate().getMonth() !== this.viewDate.getMonth()) {
      this.viewDate.setMonth(this.viewDate.getMonth() - 1);
      this.updateCalendar();
    }
  }

  onDateClick(cal: any) {
    this.calendar.getApi().changeView('timeGridDay');
    this.calendar.getApi().gotoDate(cal.date);
  }
}
