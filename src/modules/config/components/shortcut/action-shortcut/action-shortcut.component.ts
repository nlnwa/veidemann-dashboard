import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigObject, Kind, ConfigRef} from '../../../../../shared/models/config';
import {Params} from '@angular/router';

@Component({
  selector: 'app-action-shortcut',
  templateUrl: './action-shortcut.component.html',
  styleUrls: ['./action-shortcut.component.css']
})
export class ActionShortcutComponent implements OnInit {
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

  ngOnInit(): void {
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

