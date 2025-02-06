import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../../../shared/models/config';
import {Params} from '@angular/router';
import {Observable} from "rxjs";

@Component({
    selector: 'app-filter-shortcut',
    templateUrl: './filter-shortcut.component.html',
    standalone: false
})
export class FilterShortcutComponent {
  readonly Kind = Kind;
  readonly ability$: Observable<any>;

  @Input()
  configObject: ConfigObject;

  @Output()
  clone = new EventEmitter();

  constructor() {
  }

  getJobRefListQueryParams(configObject: ConfigObject): Params {
    return {crawl_job_id: configObject.seed.jobRefList.map(jobRef => jobRef.id)};
  }

  onClone() {
    this.clone.emit();
  }
}
