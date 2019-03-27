import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {Subject} from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';

import {ConfigObject, Kind} from '../../../commons/models';

import {RoleService} from '../../../core/services/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchDataService} from '../../services/search-data.service';


import {Title} from '@angular/platform-browser';
import {SeedDataService} from '../../services/seed-data.service';
import {DataService} from '../../services/data.service';
import {ConfigurationsComponent} from '../configurations/configurations.component';
import {ErrorService, SnackBarService} from '../../../core/services';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
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

  private searchTerm: Subject<string> = new Subject<string>();
  searchTerm$ = this.searchTerm.asObservable();

  pageLength$ = new Subject<number>();

  private ngUnsubscribe = new Subject();

  constructor(
    private seedDataService: SeedDataService,
    protected snackBarService: SnackBarService,
    protected errorService: ErrorService,
    protected activatedRoute: ActivatedRoute,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected router: Router,
    protected dialog: MatDialog,
    protected dataService: SearchDataService,
    public titleService: Title,
    private roleService: RoleService) {
    super(dataService, snackBarService, errorService, componentFactoryResolver, router, titleService, dialog, activatedRoute);

    this.kind = Kind.CRAWLENTITY;
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  ngOnInit() {
    super.ngOnInit();

    this.searchTerm$.pipe(
      switchMap((term: string) => this.dataService.search(term)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
    }, (error) => this.errorService.dispatch(error));

    this.titleService.setTitle('Veidemann | Search');
  }

  onSelectConfig(configObject: ConfigObject) {
    this.seedDataService.reset();
    super.onSelectConfig(configObject);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSearch(term: string) {
    this.router.navigate([], {relativeTo: this.route});
    this.reset();
    this.searchTerm.next(term);
  }
}

