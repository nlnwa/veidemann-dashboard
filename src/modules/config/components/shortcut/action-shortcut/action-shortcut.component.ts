import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../../../shared/models/config';
import {Observable} from "rxjs";
import {AbilityService} from "@casl/angular";

@Component({
    selector: 'app-action-shortcut',
    templateUrl: './action-shortcut.component.html',
    standalone: false
})
export class ActionShortcutComponent {
  readonly Kind = Kind;
  readonly ability$: Observable<any>

  @Input()
  configObject: ConfigObject;

  @Output()
  createSeed = new EventEmitter();

  @Output()
  runCrawl = new EventEmitter();

  @Output()
  clone = new EventEmitter();


  constructor(private ableService: AbilityService<any>) {
    this.ability$ = this.ableService.ability$;
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

