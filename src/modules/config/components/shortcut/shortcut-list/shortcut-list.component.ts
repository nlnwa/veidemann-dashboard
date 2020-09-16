import {Component, Input, OnInit} from '@angular/core';
import {ConfigObject, Kind} from 'src/shared/models';

@Component({
  selector: 'app-shortcut-list',
  templateUrl: './shortcut-list.component.html',
  styleUrls: ['./shortcut-list.component.scss']
})
export class ShortcutListComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  constructor() {
  }
}
