import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {forkJoin, Subject} from 'rxjs';
import {ConfigObject, Kind} from '../../../shared/models';
import {ConfigApiService, ErrorService} from '../../../modules/core/services';
import {createListRequest} from '../../../modules/config/func/query';
import {takeUntil, toArray} from 'rxjs/operators';
import * as cronParser from 'cron-parser';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {ScheduleEventDialogComponent} from '../schedule-event-dialog/schedule-event-dialog.component';
import * as momentTimezone from 'moment-timezone';
import * as moment from 'moment';
import {colorScales} from './colors';
import {DateClickArg} from '@fullcalendar/interaction';
import {CalendarOptions, EventClickArg} from '@fullcalendar/core';

interface ScheduledJob {
  crawlJobName: string;
  id: string;
  executionDates: {
    start: string,
    end: string,
  }[];
}

interface ScheduleValidRange {
  validFrom: string;
  validTo: string;
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
      const validRange: ScheduleValidRange = {
        validFrom: crawlSchedule.crawlScheduleConfig.validFrom,
        validTo: crawlSchedule.crawlScheduleConfig.validTo
      };

      const schedule = this.getScheduleFromCron(cronExpression, validRange, job.crawlJob.limits.maxDurationS);

      scheduledJobs.push({
        crawlJobName: job.meta.name,
        id: job.id,
        executionDates: schedule
      });
    }
    return scheduledJobs;
  }

  private getScheduleFromCron(cron: string, validRange: ScheduleValidRange, duration: number): { start: string, end: string }[] {
    const checkRange = validRange.validFrom || validRange.validTo ? true : false;
    const options = {
      startDate: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1),
      endDate: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1),
      utc: true,
      iterator: true,
      tz: momentTimezone.tz.guess(),
    };

    const prevOptions = {
      startDate: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1),
      endDate: this.viewDate,
      iterator: true,
      utc: true,
      tz: momentTimezone.tz.guess(),
    };

    const schedule = [];
    try {
      const interval = cronParser.parseExpression(cron, options);
      while (true) {
        try {
          const obj = interval.next();
          if (checkRange) {
            // @ts-ignore
            if (this.isDateInRange(obj.value.toISOString(), validRange)) {
              schedule.push({
                // @ts-ignore
                start: obj.value.toISOString(),
                // @ts-ignore
                end: this.addDuration(obj.value, duration),
              });
            }
          } else {
            schedule.push({
              // @ts-ignore
              start: obj.value.toISOString(),
              // @ts-ignore
              end: this.addDuration(obj.value, duration),
            });
          }
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
          if (checkRange) {
            // @ts-ignore
            if (this.isDateInRange(obj.value.toISOString(), validRange)) {
              schedule.push({
                // @ts-ignore
                start: obj.value.toISOString(),
                // @ts-ignore
                end: this.addDuration(obj.value, duration),
              });
            }
          } else {
            schedule.push({
              // @ts-ignore
              start: obj.value.toISOString(),
              // @ts-ignore
              end: this.addDuration(obj.value, duration),
            });
          }
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

  private isDateInRange(startDate: string, validRange: ScheduleValidRange) {
    const eventStart = moment(startDate);
    const validFrom = validRange.validFrom ? moment(validRange.validFrom) : moment().startOf('year');
    const validTo = validRange.validTo ? moment(validRange.validTo) : moment().endOf('year');
    return moment(eventStart).isBetween(validFrom, validTo);
  }
}
