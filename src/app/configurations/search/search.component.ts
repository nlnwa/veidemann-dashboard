import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {Subject, Subscription} from 'rxjs';
import {filter, switchMap, tap} from 'rxjs/operators';

import {ConfigObject, Kind} from '../../commons/models/';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {RoleService} from '../../auth';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchDataService} from '../shared/search-data.service';
import {ConfigurationsComponent} from '../configurations.component';
import {ErrorService} from '../../error';
import {Title} from '@angular/platform-browser';
import {SeedDataService} from '../shared/seed-data.service';
import {DataService} from '../shared/data.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchDataService, SeedDataService, {provide: DataService, useExisting: SeedDataService}]
})

export class SearchComponent extends ConfigurationsComponent implements OnInit, OnDestroy {

  configObject$ = this.configObject.asObservable().pipe(
    tap(entity => {
      if (entity) {
        this.seedDataService.ref = {id: entity.id, kind: entity.kind};
      }
    })
  );

  private searchTermSubscription: Subscription = Subscription.EMPTY;
  private searchTerm: Subject<string> = new Subject<string>();
  searchTerm$ = this.searchTerm.asObservable();

  pageLength$ = new Subject<number>();

  constructor(
    private seedDataService: SeedDataService,
    protected snackBarService: SnackBarService,
    protected errorService: ErrorService,
    protected activatedRoute: ActivatedRoute,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected router: Router,
    protected dialog: MatDialog,
    private searchDataService: SearchDataService,
    public titleService: Title,
    private roleService: RoleService) {
    super(searchDataService, snackBarService, errorService, componentFactoryResolver, router, titleService, dialog, activatedRoute);

    this._kind.next(Kind.CRAWLENTITY);
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  ngOnInit() {
    super.ngOnInit();

    this.searchTermSubscription = this.searchTerm$.pipe(
      switchMap((term: string) => this.searchDataService.search(term))).subscribe(() => {
      },
      (error) => this.errorService.dispatch(error));
  }

  onCountConfig() {
    this.searchDataService.count().subscribe(count => this.pageLength$.next(count));
  }

  onSelectConfig(configObject: ConfigObject)  {
    super.onSelectConfig(configObject);
    this.seedDataService.clear();
  }

  ngOnDestroy() {
    this.searchDataService.destroy();
    this.searchTermSubscription.unsubscribe();
  }

  onEnterKey(event) {
    this.configObject.next(null);
    this.selectedConfigs = [];
    this.destroyComponent();
    this.searchTerm.next(event.target.value);
  }
}

