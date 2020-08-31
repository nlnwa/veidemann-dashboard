import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from '@angular/router';

import {merge, Observable, Subject, throwError, timer} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {AppInitializerService, ControllerApiService, ErrorService, SnackBarService} from '../../../core/services/';
import {AuthService, GuardService} from '../../../core/services/auth';
import {RunStatus} from '../../../../shared/models/controller';
import {MatDialog} from '@angular/material/dialog';
import {CrawlerStatusDialogComponent} from '../crawlerstatus-dialog/crawlerstatus-dialog.component';
import {AboutDialogComponent} from '../about-dialog/about-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  isModuleLoading$: Observable<boolean>;
  private moduleLoadSemaphore = 0;

  updateRunStatus: Subject<void> = new Subject();
  runStatus$: Observable<RunStatus>;

  constructor(private appInitializer: AppInitializerService,
              private authService: AuthService,
              private controllerApiService: ControllerApiService,
              private router: Router,
              private route: ActivatedRoute,
              private guardService: GuardService,
              private snackBarService: SnackBarService,
              private dialog: MatDialog,
              private errorService: ErrorService) {
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
    if (this.isLoggedIn && this.authService.requestedUri) {
      try {
        const url: URL = new URL(this.authService.requestedUri, 'http://localhost');
        const queryParams = {};
        // @ts-ignore
        for (const [key, value] of url.searchParams) {
          queryParams[key] = value;
        }
        const fragment = url.hash.substring(1) || null;
        const commands = url.pathname.split('/');
        this.router.navigate(commands, {queryParams, fragment, replaceUrl: true})
          .catch(e => this.errorService.dispatch(e));
      } catch (e) {
        this.errorService.dispatch(e);
      }
    }
    this.runStatus$ = merge(this.updateRunStatus, timer(0, 30000)).pipe(
      mergeMap(() => this.controllerApiService.getRunStatus()),
      catchError(error => {
        this.errorService.dispatch(error);
        return throwError(error);
      })
    );
  }

  get error(): Error {
    return this.appInitializer.error;
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

  get canConsult(): boolean {
    return this.authService.isConsultant();
  }

  onLogin() {
    this.authService.login(this.route.snapshot.url.join('/'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/'], {relativeTo: this.route.root})
      .then(() => this.snackBarService.openSnackBar($localize`:@snackBarMessage.loggedOut:You are now logged out`));
  }

  onAbout() {
    this.dialog.open(AboutDialogComponent)
  }

  onChangeRunStatus(shouldPause: boolean) {
    this.dialog.open(CrawlerStatusDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {shouldPause}
    }).afterClosed().subscribe(changeStatus => {
      if (changeStatus) {
        if (shouldPause) {
          this.controllerApiService.pauseCrawler();
        } else {
          this.controllerApiService.unpauseCrawler();
        }
        this.updateRunStatus.next();
      }
    });
  }
}
