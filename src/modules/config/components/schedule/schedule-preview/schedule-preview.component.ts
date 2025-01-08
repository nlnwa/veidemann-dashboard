import {Component, Input} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
    selector: 'app-schedule-preview',
    templateUrl: './schedule-preview.component.html',
    styleUrls: ['./schedule-preview.component.css'],
    standalone: false
})
export class SchedulePreviewComponent {
  @Input()
  configObject: ConfigObject;

  constructor() {
  }
}
