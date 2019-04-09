import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {AuthService, GuardService, SnackBarService} from '../../../core';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {AppInitializerService} from '../../../core/services/app.initializer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  showSidenav = true;

  constructor(private authService: AuthService,
              private guardService: GuardService,
              private router: Router,
              private route: ActivatedRoute,
              private appInitializer: AppInitializerService,
              private snackBarService: SnackBarService) {
  }

  get initialized(): boolean {
    return this.appInitializer.initialized;
  }

  get error(): string {
    return this.appInitializer.error.message;
  }

  get name(): string {
    return this.authService.name;
  }

  get version(): string {
    return environment.version;
  }

  get canConfigure(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator() || this.authService.isReadonly();
  }

  get canAdministrate(): boolean {
    return this.authService.isAdmin();
  }

  get canViewCrawljobs(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  ngOnInit(): void {
    // are we logged in or not
    if (this.name && this.authService.requestedPath) {
      // navigate to requested path after login
      this.router.navigate([this.authService.requestedPath]);
    } else if (!this.name) {
      // force redirect to login
      // must wait a cycle until guardService.canLoad has been called to learn requested path
      setTimeout(() => {
        this.authService.login(this.guardService.requestedPath);
      });
    }
  }

  get eventCount(): string {
    return '99';
  }

  onLogin() {
    this.authService.login(this.route.snapshot.url.join('/'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/'], {relativeTo: this.route.root})
      .then(() => this.snackBarService.openSnackBar('Logget ut.'));
  }

  onToggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }
}
