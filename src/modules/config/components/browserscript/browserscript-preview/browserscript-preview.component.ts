import {Component, Input} from '@angular/core';
import {BrowserScriptType, ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-browserscript-preview',
  templateUrl: './browserscript-preview.component.html',
  styleUrls: ['./browserscript-preview.component.css']
})
export class BrowserscriptPreviewComponent {
  readonly BrowserScriptType = BrowserScriptType;
  @Input()
  configObject: ConfigObject

  constructor() {
  }
}
