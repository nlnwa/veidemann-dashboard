import {Component} from '@angular/core';

import {AuthService} from './auth';
import {RoleService} from './auth/role.service';
import {AppConfig} from './app.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private roleService: RoleService, private appConfig: AppConfig) {
    this.authService.configure(this.appConfig.environment.auth)
      .then(() => this.roleService.fetchRoles())
      .catch(() => this.roleService.fetchRoles());
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

  onLogout() {
    this.authService.logout();
    this.roleService.resetRoles();
  }
}
