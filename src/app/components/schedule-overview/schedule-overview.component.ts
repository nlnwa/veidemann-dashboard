import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {CalendarOptions, EventClickArg, FullCalendarComponent} from '@fullcalendar/angular';
import {forkJoin, Subject} from 'rxjs';
import {ConfigObject, Kind} from '../../../shared/models';
import {ConfigApiService, ErrorService} from '../../../modules/core/services';
import {createListRequest} from '../../../modules/config/func/query';
import {takeUntil, toArray} from 'rxjs/operators';
import * as cronParser from 'cron-parser';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleEventDialogComponent} from '../schedule-event-dialog/schedule-event-dialog.component';
import * as moment from 'moment-timezone';
import {colorScales} from './colors';
import {DateClickArg} from '@fullcalendar/interaction';

interface ScheduledJob {
  crawlJobName: string;
  id: string;
  executionDates: {
    start: string,
    end: string,
  }[];
}

@Component({
  selector: 'app-schedule-overview',
  templateUrl: './schedule-overview.component.html',
  styleUrls: ['./schedule-overview.component.css'],
  providers: [ConfigApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ScheduleOverviewComponent implements OnInit, OnDestroy {
  private crawlJobs: ConfigObject[];
  private crawlSchedules: ConfigObject[];
  private viewDate: Date = new Date();
  private ngUnsubscribe: Subject<void>;

  readyToLoad = false;
  calendarOptions: CalendarOptions;

  @ViewChild('scheduleCalendar') calendar: FullCalendarComponent;

  constructor(private errorService: ErrorService,
              private configApiService: ConfigApiService,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef) {

    this.ngUnsubscribe = new Subject<void>();

    this.calendarOptions = {
      eventClick: this.onEventClick.bind(this),
      initialView: 'dayGridMonth',
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
      dateClick: this.onDateClick.bind(this),
      height: 'auto',
      locale: 'NO-nb',
      validRange: (nowDate) => {
        return {
          start: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
        };
      }
    };
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {


    forkJoin([
      this.configApiService.list(createListRequest(Kind.CRAWLJOB.valueOf())).pipe(toArray()),
      this.configApiService.list(createListRequest(Kind.CRAWLSCHEDULECONFIG.valueOf())).pipe(toArray()),
    ]).pipe(
      takeUntil(this.ngUnsubscribe),
    )
      .subscribe(([jobs, schedules]) => {
          this.crawlJobs = jobs.filter(configObject => configObject.crawlJob.disabled === false)
            .sort((a, b) => a.meta.name.localeCompare(b.meta.name));
          this.crawlSchedules = schedules;
          setTimeout(() => {
            this.updateCalendar();
          }, 150);
        },
        error => {
          this.errorService.dispatch(error);
        }
      );
  }

  private updateCalendar() {
    const scheduledJobs = this.getScheduledJobs();
    const events = [];
    const bc = colorScales.mode('rgb').colors(scheduledJobs.length);
    for (const [index, job] of scheduledJobs.entries()) {
      for (const interval of job.executionDates) {
        events.push({
          title: job.crawlJobName,
          start: interval.start,
          end: interval.end,
          crawlJobId: job.id,
          backgroundColor: bc[index],
        });
      }
    }
    this.calendarOptions.events = events;
    this.cdr.markForCheck();
  }

  private getScheduledJobs(): ScheduledJob[] {
    const scheduledJobs = [];

    for (const job of this.crawlJobs) {
      const scheduleRefId = job.crawlJob.scheduleRef.id;
      if (scheduleRefId === '') {
        continue;
      }
      const crawlSchedule = this.crawlSchedules.find(_ => _.id === scheduleRefId);
      if (crawlSchedule === undefined) {
        continue;
      }
      const cronExpression = crawlSchedule.crawlScheduleConfig.cronExpression;
      if (cronExpression === '') {
        continue;
      }
      const schedule = this.getScheduleFromCron(cronExpression, job.crawlJob.limits.maxDurationS);
      scheduledJobs.push({
        crawlJobName: job.meta.name,
        id: job.id,
        executionDates: schedule
      });
    }
    return scheduledJobs;
  }

  private getScheduleFromCron(cron: string, duration: number): { start: string, end: string }[] {
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
      this.errorService.dispatch(error);
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
      this.errorService.dispatch(err);
    }
    return schedule;
  }


  private onEventClick(event: EventClickArg) {
    const data = {
      id: event.event.extendedProps.crawlJobId,
      start: event.event.startStr,
      end: event.event.endStr,
      name: event.event.title
    };

    this.dialog.open(ScheduleEventDialogComponent, {data});
  }

  private addDuration(timestamp: any, duration) {
    const date = new Date(timestamp);
    date.setSeconds(date.getSeconds() + duration);
    return date.toISOString();

  }

  private onToday() {
    this.viewDate = new Date();
    this.calendar.getApi().today();
    this.updateCalendar();
  }

  private onNext() {
    this.calendar.getApi().next();
    if (this.calendar.getApi().getDate().getMonth() !== this.viewDate.getMonth()) {
      this.viewDate.setMonth(this.viewDate.getMonth() + 1);
      this.updateCalendar();
    }
  }

  private onPrevious() {
    this.calendar.getApi().prev();
    if (this.calendar.getApi().getDate().getMonth() !== this.viewDate.getMonth()) {
      this.viewDate.setMonth(this.viewDate.getMonth() - 1);
      this.updateCalendar();
    }
  }

  private onDateClick(cal: DateClickArg) {
    this.calendar.getApi().changeView('timeGridDay');
    this.calendar.getApi().gotoDate(cal.date);
  }
}
