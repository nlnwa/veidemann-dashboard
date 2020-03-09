import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from '@angular/router';

import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {AppInitializerService, SnackBarService} from '../../../core/services/';
import {AuthService, GuardService} from '../../../core/services/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  isModuleLoading$: Observable<boolean>;
  private moduleLoadSemaphore = 0;

  constructor(private appInitializer: AppInitializerService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private guardService: GuardService,
              private snackBarService: SnackBarService) {
    this.isModuleLoading$ = this.router.events.pipe(
      filter(event => event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd),
      map((event: RouterEvent) => {
        if (event instanceof RouteConfigLoadStart) {
          this.moduleLoadSemaphore++;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.moduleLoadSemaphore--;
        }
        return this.moduleLoadSemaphore > 0;
      }),
    );
  }

  ngOnInit(): void {
    if (this.isLoggedIn && this.authService.requestPath) {
      // navigate to any requested path after login
      this.router.navigate([this.authService.requestPath]);
    } else if (!this.isLoggedIn) {
      // force redirect to login
      // we must wait a cycle (setTimeout) until guardService.canLoad has been called to learn requested path
      setTimeout(() => {
        this.authService.login(this.guardService.requestedPath);
      });
    }
  }

  get error(): Error {
    return this.appInitializer.error;
  }

  get version(): string {
    return environment.version;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get name(): string {
    return this.authService.name;
  }

  get canAdministrate(): boolean {
    return this.authService.isAdmin();
  }

  get canConfigure(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  onLogin() {
    this.authService.login(this.route.snapshot.url.join('/'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/'], {relativeTo: this.route.root})
      .then(() => this.snackBarService.openSnackBar($localize`:@snackBarMessage.loggedOut:You are now logged out`));
  }
}
