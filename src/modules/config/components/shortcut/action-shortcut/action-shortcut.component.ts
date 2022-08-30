import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../../../shared/models/config';
import {Action} from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-action-shortcut',
  templateUrl: './action-shortcut.component.html',
})
export class ActionShortcutComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  @Output()
  createSeed = new EventEmitter();

  @Output()
  runCrawl = new EventEmitter();

  @Output()
  clone = new EventEmitter();


  constructor() {
  }

  onClone() {
    this.clone.emit();
  }

  onCreateSeed() {
    this.createSeed.emit();
  }

  onRunCrawl() {
    this.runCrawl.emit();
  }
}

