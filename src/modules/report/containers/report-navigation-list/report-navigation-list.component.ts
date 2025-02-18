import {Component} from '@angular/core';
import {AuthService} from '../../../core/services/auth';
import {NavigationListComponent} from '../../../commons/components';
import {Observable} from 'rxjs';
import {AbilityService} from '@casl/angular';

@Component({
    selector: 'app-report-navigation-list',
    templateUrl: './report-navigation-list.component.html',
    styleUrls: ['../../../commons/components/navigation-list/navigation-list.component.scss'],
    standalone: false
})
export class ReportNavigationListComponent extends NavigationListComponent {
  readonly ability$: Observable<any>;

  constructor(protected authService: AuthService,
              private abilityService: AbilityService<any>) {
    super(authService);
    this.ability$ = this.abilityService.ability$;
  }
}
