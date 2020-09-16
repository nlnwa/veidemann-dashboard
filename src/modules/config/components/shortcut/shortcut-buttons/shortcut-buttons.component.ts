import {Component, Input} from '@angular/core';
import {ConfigObject, Kind} from '../../../../../shared/models/config';

@Component({
  selector: 'app-shortcut-buttons',
  templateUrl: './shortcut-buttons.component.html',
  styleUrls: ['./shortcut-buttons.component.css']
})
export class ShortcutButtonsComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  constructor() {
  }

}
