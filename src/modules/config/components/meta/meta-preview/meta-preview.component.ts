import {Component, Input} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-meta-preview',
  templateUrl: './meta-preview.component.html',
  styleUrls: ['./meta-preview.component.css']
})
export class MetaPreviewComponent {

  @Input()
  configObject: ConfigObject
}


