import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {combineLatest, merge, Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';

import {
  BrowserScriptType,
  ConfigObject,
  ConfigRef,
  Kind,
  RobotsPolicy,
  Role,
  RotationPolicy,
  Seed,
  SubCollectionType
} from '../../../../shared/models';
import {AuthService, ControllerApiService, ErrorService, SnackBarService} from '../../../core';
import {DeleteDialogComponent, Parcel} from '../../components';
import {KindService, OptionsService} from '../../services';
import {RunCrawlDialogComponent} from '../../components/run-crawl-dialog/run-crawl-dialog.component';
import {RunningCrawlDialogComponent} from '../../components/running-crawl-dialog/running-crawl-dialog.component';
import {ConfigService} from '../../../commons/services';
import {ConfigQuery} from '../../../../shared/func';

export interface ConfigOptions {
  rotationPolicies?: RotationPolicy[];
  subCollectionTypes?: SubCollectionType[];
  crawlConfigs?: ConfigObject[];
  crawlScheduleConfigs?: ConfigObject[];
  browserConfigs?: ConfigObject[];
  collections?: ConfigObject[];
  politenessConfigs?: ConfigObject[];
  browserScripts?: ConfigObject[];
  browserScriptTypes?: BrowserScriptType[];
  robotsPolicies?: RobotsPolicy[];
  crawlJobs?: ConfigObject[];
  roles?: Role[];
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent implements OnDestroy {
  readonly Kind = Kind;

  private ngUnsubscribe = new Subject();

  private configObject: Subject<ConfigObject>;
  configObject$: Observable<ConfigObject>;

  query$: Observable<ConfigQuery>;

  private reload: Subject<void>;

  entity$: Observable<ConfigObject>;

  fetchConfigObject = true;

  showCreateButton$: Observable<boolean>;

  kind: Kind;
  kind$: Observable<Kind>;

  options$: Observable<ConfigOptions>;

  constructor(private authService: AuthService,
              private dataService: ConfigService,
              private snackBarService: SnackBarService,
              private errorService: ErrorService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private kindService: KindService,
              private optionsService: OptionsService,
              private controllerApiService: ControllerApiService) {
    this.configObject = new Subject();

    this.options$ = this.optionsService.options$.pipe(
      tap(_ => {
        // make sure any detail view relying on some option not present is removed before a new set of options is loaded
        this.configObject.next(null);
      }),
    );

    this.kind$ = this.kindService.kind$.pipe(
      tap(kind => this.kind = kind)
    );

    const id$: Observable<string> = route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      distinctUntilChanged()
    );


    // configObject stream based on kind and id
    const configRef$: Observable<ConfigRef> = combineLatest([
      this.kind$,
      id$.pipe(
        // toggle id stream on/off based on passId token
        // (e.g. when saving a configObject we don't want to
        // refetch configObject when we set query parameter id -
        // we already got it in the response from the call to save)
        filter(() => {
          if (this.fetchConfigObject) {
            return true;
          } else {
            this.fetchConfigObject = !this.fetchConfigObject;
            return false;
          }
        })),
    ]).pipe(
      map(([kind, id]) => new ConfigRef({kind, id})),
    );
    const configObject$: Observable<ConfigObject> = configRef$.pipe(
      switchMap(configRef =>
        configRef && configRef.id ? this.dataService.get(configRef) : of(null))
    );
    this.configObject$ = merge(this.configObject.asObservable(), configObject$);
  }

  get loading$(): Observable<boolean> {
    return this.dataService.loading$;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onCreateConfig(): void {
    const configObject = new ConfigObject({kind: this.kind});

    if (this.kind === Kind.SEED && this.route.snapshot.queryParamMap.get('entity_id')) {
      const kind = Kind.CRAWLENTITY;
      const id = this.route.snapshot.queryParamMap.get('entity_id');
      const entityRef = new ConfigRef({kind, id});
      configObject.seed = new Seed({entityRef});
    }
  }

  onClone(configObject: ConfigObject) {
    // we don't want the id of any selected configObject to be present in the url
    // when we create a clone
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {id: null}
    })
      .catch(error => this.errorService.dispatch(error))
      .then(() => setTimeout(() => this.configObject.next(ConfigObject.clone(configObject))));
  }

  onSaveConfig(configObject: ConfigObject) {
    this.dataService.save(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.reload.next();
        this.fetchConfigObject = false;
        this.router.navigate([], {
          queryParamsHandling: 'merge',
          queryParams: {id: newConfig.id},
          relativeTo: this.route,
        })
          .catch(error => this.errorService.dispatch(error));
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.saved:Saved`);
      });
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.dataService.update(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.reload.next();
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.updated:Updated`);
      });
  }


  onDeleteConfig(configObject: ConfigObject) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {configObject},
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => !!result),
        switchMap(() => this.dataService.delete(configObject)),
        filter(deleted => !!deleted)
      )
      .subscribe(() => {
        this.router.navigate([], {
          relativeTo: this.route.parent,
        }).catch(error => this.errorService.dispatch(error));
        this.reload.next();
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.deleted:Deleted`);
      });
  }

  onSaveMultipleSeeds(configObjects: ConfigObject[]) {
    this.dataService.saveMultiple(configObjects)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(saved => {
        this.snackBarService.openSnackBar(saved + $localize`:@snackBarMessage.multipleSaved: configurations saved`);
        this.configObject.next(null);
        this.reload.next();
      });
  }

  onMoveSeed(parcel: Parcel) {
    (Array.isArray(parcel.seed)
      ? this.dataService.moveMultiple(parcel.seed, parcel.entityRef)
      : this.dataService.move(parcel.seed, parcel.entityRef))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(moved => {
        this.snackBarService.openSnackBar(moved + $localize`:@snackBarMessage.multipleMoved: configurations moved`);
        this.reload.next();
      });
  }

  onRunCrawl(configObject: ConfigObject) {
    const dialogRef = this.dialog.open(RunCrawlDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {configObject, jobRefId: null}
    });
    dialogRef.afterClosed()
      .subscribe(runCrawlRequest => {
        if (runCrawlRequest) {
          this.controllerApiService.runCrawl(runCrawlRequest)
            .pipe(filter(_ => !!_))
            .subscribe(runCrawlReply => {
              const dialogReference = this.dialog.open(RunningCrawlDialogComponent, {
                disableClose: false,
                autoFocus: true,
                data: {runCrawlRequest, runCrawlReply, configObject}
              });
            });
        }
      });
  }
}




