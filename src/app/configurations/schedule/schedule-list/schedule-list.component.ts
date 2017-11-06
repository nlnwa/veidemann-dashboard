import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {Schedule} from '../../../commons/models/config.model';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  schedules: Schedule[];
  selectedSchedule: Schedule;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.scheduleService.list()
      .map(reply => reply.value)
      .subscribe(schedules => this.schedules = schedules);
  }

  onSelectSchedule(schedule: Schedule) {
    this.selectedSchedule = schedule
  }

  onCreateNewSchedule() {
    const schedule: Schedule = {
      id: '',
      cron_expression: '     ',
      valid_from: null,
      valid_to: null,
      meta: {
        name: '',
        description: '',
        label: [],
      },

    };
    // By default, a newly-created  will have the selected state.
    this.onSelectSchedule(schedule);
  }

  onScheduleCreated(schedule: Schedule) {
    this.schedules.push(schedule);
    this.onSelectSchedule(schedule);
    return this.schedules;
  };

  onScheduleUpdated(schedule: Schedule) {
    const idx = this.getIndexOfSchedule(schedule.id);
    if (idx !== -1) {
      this.schedules[idx] = schedule;
    }
    return this.schedules;
  }

  onScheduleDeleted(schedule: Schedule) {
    const idx = this.getIndexOfSchedule(schedule.id);
    if (idx !== -1) {
      this.schedules.splice(idx, 1);
      this.onSelectSchedule(null);
    }
    return this.schedules;
  };

  private getIndexOfSchedule(scheduleId: String) {
    return this.schedules.findIndex((schedule) => {
      return schedule.id === scheduleId;
    });
  };
}
