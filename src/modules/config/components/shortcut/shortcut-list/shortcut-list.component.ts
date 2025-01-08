import {Component, Input} from '@angular/core';
import {ConfigObject, Kind} from 'src/shared/models';

@Component({
    selector: 'app-shortcut-list',
    templateUrl: './shortcut-list.component.html',
    standalone: false
})
export class ShortcutListComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  constructor() {
  }
}
