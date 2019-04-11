import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {AuthService, GuardService, SnackBarService} from '../../../core';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {AppInitializerService} from '../../../core/services/app.initializer.service';
import {EventService} from '../../../event/services/event.service';
import {Subject, timer} from 'rxjs';
import {map, mergeMap, tap, toArray} from 'rxjs/operators';
import {AppService} from '../../services';
import {EventObject} from '../../../commons/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppService, EventService]
})
export class AppComponent implements OnInit {

  showSidenav = true;

  eventCount: Subject<number> = new Subject();
  eventCount$ = this.eventCount.asObservable();
  eventSummary: Subject<string> = new Subject();
  eventSummary$ = this.eventSummary.asObservable();


  constructor(private authService: AuthService,
              private guardService: GuardService,
              private router: Router,
              private route: ActivatedRoute,
              private appInitializer: AppInitializerService,
              private snackBarService: SnackBarService,
              private appService: AppService) {
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

    timer(0, 60000).pipe(
      mergeMap(() => this.appService.getEventSummary().pipe(
        map(event => EventObject.fromProto(event)),
        toArray(),
        tap(events => this.eventCount.next(events.length)),
        tap(events => {
          const types = [];
          for (const event of events) {
            const type = event.type;
            const index = types.findIndex(t => t.type === type);
            if (index !== -1) {
              types[index].count++;
            } else {
              types.push({type: event.type, count: 1});
            }
          }
          this.eventSummary.next(types.map(type => type.type + ' : ' + type.count).join('\n'));
        })))).subscribe();
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
