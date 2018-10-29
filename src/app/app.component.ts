import {Component} from '@angular/core';

import {AuthService, RoleService} from './auth';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSidenav = true;

  constructor(private authService: AuthService, private roleService: RoleService) {
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
  }

  onToggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

}
