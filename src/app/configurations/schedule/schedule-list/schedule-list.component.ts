import {Component, OnInit} from "@angular/core";
import {Schedule} from "../schedule";
import {ScheduleService} from "../schedule.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleComponent implements OnInit {

  schedules: Schedule[];
  selectedSchedule: Schedule;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit() {
    this.scheduleService.getAllSchedules().subscribe(schedules => {
      this.schedules = schedules.value
    })
  }

  private getIndexOfEntity = (scheduleId: String) => {
    return this.schedules.findIndex((schedule) => {
      return schedule.id === scheduleId;
    });
  };

  selectSchedule(schedule: Schedule) {
    this.selectedSchedule = schedule
  }

  createNewSchedule() {
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
    this.selectSchedule(schedule);
  }

  deleteSchedule = (scheduleId: String) => {
    const idx = this.getIndexOfEntity(scheduleId);
    if (idx !== -1) {
      this.schedules.splice(idx, 1);
      this.selectSchedule(null);
    }
    return this.schedules;
  };

  addSchedule = (schedule: Schedule) => {
    this.schedules.push(schedule);
    this.selectSchedule(schedule);
    return this.schedules;
  };

  updateSchedule = (schedule: Schedule) => {
    const idx = this.getIndexOfEntity(schedule.id);
    if (idx !== -1) {
      this.schedules[idx] = schedule;
      this.selectSchedule(schedule);
    }
    return this.schedules;
  }


}
