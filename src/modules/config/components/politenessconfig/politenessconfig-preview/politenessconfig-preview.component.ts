import {Component, Input} from '@angular/core';
import {ConfigObject, RobotsPolicy} from '../../../../../shared/models/config';

@Component({
  selector: 'app-politenessconfig-preview',
  templateUrl: './politenessconfig-preview.component.html',
  styleUrls: ['./politenessconfig-preview.component.css']
})
export class PolitenessconfigPreviewComponent {
  readonly RobotsPolicy = RobotsPolicy;

  @Input()
  configObject: ConfigObject;

  constructor() {
  }


}
