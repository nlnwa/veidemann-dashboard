import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../../../shared/models/config';
import {Params} from '@angular/router';
import {Observable} from "rxjs";
import {AbilityService} from "@casl/angular";

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

  constructor(private abilityService: AbilityService<any>) {
    this.ability$ = this.abilityService.ability$;
  }

  getJobRefListQueryParams(configObject: ConfigObject): Params {
    return {crawl_job_id: configObject.seed.jobRefList.map(jobRef => jobRef.id)};
  }

  onClone() {
    this.clone.emit();
  }
}
