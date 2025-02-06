import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Annotation} from '../../../../../shared/models/config';
import {Observable} from "rxjs";
import {AbilityService} from "@casl/angular";

@Component({
    selector: 'app-script-annotation',
    templateUrl: './script-annotation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ScriptAnnotationComponent {
readonly ability$: Observable<any>;
  @Input()
  annotations: Annotation[];

  constructor(abilityService: AbilityService<any>) {
    this.ability$ = abilityService.ability$;
  }
}
