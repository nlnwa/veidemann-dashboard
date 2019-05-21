import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {of, Subject} from 'rxjs';
import {map, switchMap, takeUntil, tap} from 'rxjs/operators';

import {Kind} from '../../../commons/models';

import {AuthService} from '../../../core/services/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchDataService} from '../../services';


import {Title} from '@angular/platform-browser';
import {SeedDataService} from '../../services';
import {DataService} from '../../services';
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

  protected searchTerm: Subject<string> = new Subject<string>();
  searchTerm$ = this.searchTerm.asObservable();

  constructor(
    protected seedDataService: SeedDataService,
    protected snackBarService: SnackBarService,
    protected errorService: ErrorService,
    protected activatedRoute: ActivatedRoute,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected router: Router,
    protected dialog: MatDialog,
    protected dataService: SearchDataService,
    public titleService: Title,
    protected authService: AuthService) {
    super(dataService, snackBarService, errorService, componentFactoryResolver, router, titleService, dialog, activatedRoute);

    this.kind = Kind.CRAWLENTITY;
  }

  get canEdit(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.get('id')),
      switchMap(id => id ? this.dataService.get({id, kind: this.kind}) : of(null)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(configObject => this.configObject.next(configObject));

    this.searchTerm$.pipe(
      switchMap((term: string) => this.dataService.search(term)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
    }, (error) => this.errorService.dispatch(error));

    this.titleService.setTitle('Veidemann | Search');
  }

  onSearch(term: string) {
    this.reset();
    this.router.navigate([], {relativeTo: this.route});
    this.searchTerm.next(term);
  }
}

