import {Component, Input} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-crawljob-preview',
  templateUrl: './crawljob-preview.component.html',
  styleUrls: ['./crawljob-preview.component.css']
})
export class CrawljobPreviewComponent {

  @Input()
  configObject: ConfigObject;

  constructor() {
  }

}
