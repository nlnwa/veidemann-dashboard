import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {Observable, Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';

import {ConfigObject, ConfigRef, Kind} from '../../../commons/models';

import {AuthService} from '../../../core/services/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService, SearchDataService, SeedDataService} from '../../services';


import {Title} from '@angular/platform-browser';
import {ConfigurationsComponent} from '../configurations/configurations.component';
import {ErrorService, SnackBarService} from '../../../core/services';
import {SearchConfigurationService} from '../../services/search-configuration.service';
import {ConfigurationsService} from '../../services/configurations.service';
import {SeedConfigurationService} from '../../services/seed-configuration.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SearchConfigurationService,
    SearchDataService,
    SeedDataService,
    SeedConfigurationService,
    {provide: DataService, useExisting: SeedDataService},
    {provide: ConfigurationsService, useExisting: SeedConfigurationService}
  ]
})

export class SearchComponent extends ConfigurationsComponent implements OnInit, OnDestroy {
  readonly ConfigObject = ConfigObject;

  protected searchTerm: Subject<string> = new Subject<string>();
  searchTerm$ = this.searchTerm.asObservable();

  entityRef$: Observable<ConfigRef>;

  constructor(
    protected snackBarService: SnackBarService,
    protected errorService: ErrorService,
    protected activatedRoute: ActivatedRoute,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected router: Router,
    protected dialog: MatDialog,
    protected searchService: SearchConfigurationService,
    protected titleService: Title,
    protected authService: AuthService) {
    super(searchService, snackBarService, errorService, componentFactoryResolver,
      router, titleService, dialog, activatedRoute);

    this.kind = Kind.CRAWLENTITY;
  }

  get canEdit(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  ngOnInit() {
    this.titleService.setTitle('Veidemann | Search');

    this.options = this.route.snapshot.data.options;

    this.searchService.configObject$
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(configObject => this.configObject.next(configObject));

    this.entityRef$ = this.searchService.configObject$
      .pipe(
        map(configObject => (configObject && configObject.id) ? ConfigObject.toConfigRef(configObject) : null)
      );

    this.searchTerm$
      .pipe(
        switchMap((term: string) => this.searchService.search(term)),
        takeUntil(this.ngUnsubscribe)
      ).subscribe();

  }

  onSearch(term: string) {
    this.reset();
    this.router.navigate([], {relativeTo: this.route});
    this.searchTerm.next(term);
  }
}

