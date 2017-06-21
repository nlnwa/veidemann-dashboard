import {Component, Input} from "@angular/core";
import {Schedule} from "../../../models/schedule";
import {CrawljobService} from "../../crawljob.service";
import {MdlSnackbarService} from "angular2-mdl";

@Component({
  selector: 'schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent {
  @Input()
  schedule: Schedule;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private crawljobService: CrawljobService,
              private mdlSnackbarService: MdlSnackbarService) {
  }

  createSchedule() {
    this.crawljobService.createSchedule(this.schedule).then((newSchedule: Schedule) => {
      this.createHandler(newSchedule);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  updateSchedule(schedule: Schedule): void {
    this.crawljobService.updateSchedule(this.schedule).then((updatedSchedule: Schedule) => {
      this.updateHandler(updatedSchedule);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Lagret',
      });
  }

  deleteSchedule(scheduleId: String): void {
    this.crawljobService.deleteSchedule(scheduleId).then((deletedScheduleId: String) => {
      this.deleteHandler(deletedScheduleId);
    });
    this.mdlSnackbarService.showSnackbar(
      {
        message: 'Slettet',
      });
  }
}
