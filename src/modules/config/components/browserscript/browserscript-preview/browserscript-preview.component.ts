import {Component, Input, OnInit} from '@angular/core';
import {BrowserScriptType, ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-browserscript-preview',
  templateUrl: './browserscript-preview.component.html',
  styleUrls: ['./browserscript-preview.component.css']
})
export class BrowserscriptPreviewComponent implements OnInit {
  readonly BrowserScriptType = BrowserScriptType;
  @Input()
  configObject: ConfigObject;

  language: string;

  constructor() {
  }

  ngOnInit() {
    this.language = this.configObject.meta.name.split('.').slice(-1)[0];
  }
}
