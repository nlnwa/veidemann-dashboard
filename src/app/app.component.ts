import {Component, OnInit} from '@angular/core';
import {DateTime} from './commons/';
import {AuthService} from './auth/auth.service';
import {RoleService} from './roles/roles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myDate: String;

  constructor(private authService: AuthService, private roleService: RoleService) {
    this.authService.configureAuth();
  }

  get canConfigure(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator() || this.roleService.isReadonly();
  }

  get canAdministrate(): boolean {
    return this.roleService.isAdmin();
  }

  get name(): string {
    return this.authService.name;
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  getTimestamp() {
    setInterval(() => {
      this.myDate = DateTime.nowUTC();
    }, 1000);
  }

  ngOnInit() {
    this.getTimestamp();
  }

}
