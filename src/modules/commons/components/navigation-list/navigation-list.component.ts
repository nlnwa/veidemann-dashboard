import {Directive} from '@angular/core';
import {AuthService} from '../../../core/services/auth';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class NavigationListComponent {

  protected constructor(protected authService: AuthService) {
  }

  get canAdministrate(): boolean {
    return this.authService.isAdmin();
  }

  get canConfigure(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  get canConsult(): boolean {
    return this.authService.isConsultant();
  }
}
