import {ChangeDetectionStrategy, Component} from '@angular/core';

import {AppConfigService, AuthService, RoleService} from '../../../core';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  showSidenav = true;

  constructor(private authService: AuthService,
              private roleService: RoleService,
              private router: Router,
              private appConfig: AppConfigService) {
  }

  get version(): string {
    return environment.version;
  }

  get canConfigure(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator() || this.roleService.isReadonly();
  }

  get canAdministrate(): boolean {
    return this.roleService.isAdmin();
  }

  get canViewCrawljobs(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get name(): string {
    return this.authService.name;
  }

  onLogin() {
    this.authService.login();
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate([]);
  }

  onToggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

}
