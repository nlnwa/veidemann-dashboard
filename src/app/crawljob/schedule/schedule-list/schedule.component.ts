import { Component, OnInit } from '@angular/core';
import {Schedule} from "../../../models/schedule";
import {CrawljobService} from "../../crawljob.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedules: Schedule[];
  selectedSchedule: Schedule;
  constructor(private crawljobService: CrawljobService) { }

  ngOnInit() {this.crawljobService.getAllSchedules().subscribe(schedules => {this.schedules = schedules.value})  }

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
      meta:{
        name: '',
        description: '',
      },
      cron_expression: '',
      valid_from: {
        seconds: 0,
      },
      valid_to: {
        seconds:0,
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
