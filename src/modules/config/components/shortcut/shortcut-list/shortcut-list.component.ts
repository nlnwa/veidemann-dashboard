import {Component, Input} from '@angular/core';
import {ConfigObject, Kind} from 'src/shared/models';
import {AbilityService} from "@casl/angular";

@Component({
    selector: 'app-shortcut-list',
    templateUrl: './shortcut-list.component.html',
    standalone: false
})
export class ShortcutListComponent {
  readonly Kind = Kind;
  readonly ability$: any;

  @Input()
  configObject: ConfigObject;

  constructor(abilityService: AbilityService<any>) {
    this.ability$ = abilityService.ability$;
  }
}
