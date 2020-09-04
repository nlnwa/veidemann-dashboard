import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigObject, Kind} from '../../../../shared/models/config';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../../core/services';
import {JobExecutionState} from '../../../../shared/models/report';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
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

  onEdit(): void {
    this.router.navigate([this.configObject.id], {
      relativeTo: this.route,
    }).catch(error => this.errorService.dispatch(error));
  }

  onRunCrawl() {
    this.runCrawl.emit(this.configObject);
  }

}
