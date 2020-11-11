import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../../../shared/models/config';
import {Params} from '@angular/router';

@Component({
  selector: 'app-filter-shortcut',
  templateUrl: './filter-shortcut.component.html',
  styleUrls: ['./filter-shortcut.component.scss']
})
export class FilterShortcutComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  @Output()
  clone = new EventEmitter();

  constructor() { }

  getJobRefListQueryParams(configObject: ConfigObject): Params {
    return {crawl_job_id: configObject.seed.jobRefList.map(jobRef => jobRef.id)};
  }

  onClone() {
    this.clone.emit();
  }
}
