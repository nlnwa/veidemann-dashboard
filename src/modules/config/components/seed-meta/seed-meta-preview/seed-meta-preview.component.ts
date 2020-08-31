import {Component, Input} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-seed-meta-preview',
  templateUrl: './seed-meta-preview.component.html',
  styleUrls: ['./seed-meta-preview.component.css']
})
export class SeedMetaPreviewComponent {

  @Input()
  configObject: ConfigObject;

  constructor() { }

}
