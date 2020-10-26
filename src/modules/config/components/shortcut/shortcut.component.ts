import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../../shared/models/config';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../../core/services';
import {JobExecutionState} from '../../../../shared/models/report';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent {
  readonly Kind = Kind;
  readonly JobExecutionState = JobExecutionState;
  @Input()
  configObject: ConfigObject;

  @Output()
  createSeed = new EventEmitter<ConfigObject>();

  @Output()
  runCrawl = new EventEmitter<ConfigObject>();

  @Output()
  clone = new EventEmitter<ConfigObject>();

  constructor(protected route: ActivatedRoute, protected router: Router, protected errorService: ErrorService) {
  }

  onClone() {
    this.clone.emit(this.configObject);
  }

  onCreateSeed() {
    this.createSeed.emit(this.configObject);
  }

  onRunCrawl() {
    this.runCrawl.emit(this.configObject);
  }

}
