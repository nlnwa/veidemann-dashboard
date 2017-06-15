import {Component, OnInit, Input} from '@angular/core';
import {Schedule} from "../../../models/schedule";
import {CrawljobService} from "../../crawljob.service";

@Component({
  selector: 'schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {
  @Input()
  schedule: Schedule;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService) {
  }

  ngOnInit() {
    //  console.log(this.crawljob);
  }

  createSchedule() {
    this.crawljobService.createSchedule(this.schedule).then((newSchedule: Schedule) => {
      this.createHandler(newSchedule);
    });

  }


  updateSchedule(schedule: Schedule): void {
    this.crawljobService.updateSchedule(this.schedule).then((updatedSchedule: Schedule) => {
      this.updateHandler(updatedSchedule);
      //   this.ngOnChanges();
    });
  }

  deleteSchedule(scheduleId: String): void {
    //console.log(scheduleId);
    this.crawljobService.deleteSchedule(scheduleId).then((deletedScheduleId: String) => {
      this.deleteHandler(deletedScheduleId);
    });
  }
}
