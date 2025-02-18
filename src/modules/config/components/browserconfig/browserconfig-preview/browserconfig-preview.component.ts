import {Component, Input} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
    selector: 'app-browserconfig-preview',
    templateUrl: './browserconfig-preview.component.html',
    styleUrls: ['./browserconfig-preview.component.css'],
    standalone: false
})
export class BrowserconfigPreviewComponent {
  @Input()
  configObject: ConfigObject;

  constructor() {
  }


}
