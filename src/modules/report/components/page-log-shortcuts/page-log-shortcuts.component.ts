import {Component, Input} from '@angular/core';
import {PageLog} from '../../../../shared/models';
import {Observable} from 'rxjs';
import {AbilityService} from '@casl/angular';

@Component({
    selector: 'app-page-log-shortcuts',
    templateUrl: './page-log-shortcuts.component.html',
    styleUrls: ['./page-log-shortcuts.component.css'],
    standalone: false
})
export class PageLogShortcutsComponent {
  readonly ability$: Observable<any>

  @Input() pageLog: PageLog;

  constructor(private abilityService: AbilityService<any>) {
    this.ability$ = this.abilityService.ability$;
  }
}
