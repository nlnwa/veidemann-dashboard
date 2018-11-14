import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, PageEvent} from '@angular/material';

import {BehaviorSubject, combineLatest, EMPTY as empty, from, of, Subject} from 'rxjs';
import {catchError, map, mergeMap, startWith, switchMap, tap} from 'rxjs/operators';

import {CrawlJob, Entity, Label, Seed} from '../../commons/models/config.model';
import {SearchReply, SearchService} from './search.service';
import {SeedDetailComponent, SeedService} from '../seeds';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlJobService} from '../crawljobs';
import {EntityService} from '../entities/';
import {SearchDatabase} from './search-database';
import {SearchDataSource, SearchListComponent} from './search-entity-list/search-entity-list.component';
import {RoleService} from '../../auth';
import {findLabel, getInitialLabels, intersectLabel, updatedLabels} from '../../commons/group-update/labels/common-labels';
import {DetailDirective} from '../shared/detail.directive';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    SearchDataSource,
    SearchDatabase,
  ],
})
export class SearchComponent implements OnInit, AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10, 50, 100];

  selectedEntity: Entity = null;
  selectedSeed: Seed = null;
  selectedSeeds = [];
  crawlJobs: CrawlJob[];

  componentRef = null;

  changes: Subject<void> = new Subject<void>();
  seedPage: Subject<PageEvent> = new Subject<PageEvent>();

  seeds = new Subject<any>();
  seeds$ = this.seeds.asObservable();

  allSeedsSelected = false;

  @ViewChild(SearchListComponent) private entityList;
  @ViewChild(MatPaginator) private paginator;

  // dynamic views
  @ViewChild(DetailDirective) seedDetailHost: DetailDirective;

  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private searchService: SearchService,
              private seedService: SeedService,
              private crawlJobService: CrawlJobService,
              private entityService: EntityService,
              private searchDatabase: SearchDatabase,
              private snackBarService: SnackBarService,
              private roleService: RoleService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog) {
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get seedSingleMode(): boolean {
    return this.selectedSeeds.length < 2;
  }

  ngOnInit() {
    // Load prerequisites for app-seed-detail
    if (this.canEdit) {
      this.crawlJobService.list()
        .pipe(map(reply => reply.value))
        .subscribe((crawlJobs) => this.crawlJobs = crawlJobs);
    } else {
      this.crawlJobs = [];
    }
  }

  ngAfterViewInit() {
//    const id = this.route.snapshot.params['id'];

    combineLatest(
      this.searchTerm,
      this.paginator.page
    )
      .pipe(
        tap(() => {
          // this.selectedEntity = null;
          // this.selectedSeed = null;
          // this.searchDatabase.clear();
          // this.seedDatabase.clear();
        }),
        switchMap(([term, pager]) =>
          this.searchService.search({
            term,
            length: pager.length,
            pageIndex: pager.pageIndex,
            pageSize: pager.pageSize,
          })
        )
      )
      .subscribe((reply: SearchReply) => {
        this.paginator.length = reply.length;
        this.searchDatabase.data = reply.value;
        if (reply.length > 0 && this.searchTerm.value.length > 0) {
          this.entityList.onRowClick(reply.value[0]);
          /*
          if (id) {
            const found = reply.value.find((item: Item) => item.id === id);
            if (found) {
              this.entityList.onRowClick(found);
            }
          } else {

          }
          */
        } else if (this.searchTerm.value) {
          this.selectedEntity = new Entity({name: this.searchTerm.value});
        }
      });
    // see https://github.com/angular/material2/issues/8417
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  loadSeedComponent(seed: Seed, crawlJobs: CrawlJob[], initialLabels: Label[], equalDisabled: boolean) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SeedDetailComponent);
    const viewContainerRef = this.seedDetailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as SeedDetailComponent;
    instance.seed = seed;
    instance.equalDisabled = equalDisabled;
    instance.crawlJobs = crawlJobs;
    instance.data = false;
    instance.updateForm();
    instance.clear.subscribe(() => this.onClearSeed());
    if (!this.allSeedsSelected) {
      instance.update.subscribe((seedUpdate) => this.onUpdateMultipleSeeds(seedUpdate, initialLabels));
      instance.delete.subscribe(() => this.onDeleteMultipleSeeds(this.selectedSeeds));
    }

    if (this.allSeedsSelected) {
      instance.update.subscribe((seedUpdate) => this.onUpdateAllSeeds(seedUpdate));
      instance.delete.subscribe(() => this.onDeleteAllSeeds());
    }
  }

  onEnterKey(event) {
    this.searchTerm.next(event.target.value);
  }

  onCreateEntity() {
    this.selectedEntity = new Entity();
    this.selectedSeed = null;
    this.clearSeedList();
    this.entityList.clearSelection();
  }

  clearSeedList() {
    this.seeds.next({
      value: [],
      pageLength: 0,
      pageSize: 5,
      pageIndex: 0,
    });
  }

  loadSeedList(entity_id: string) {
    this.seedService.search({entity_id: entity_id})
      .subscribe((reply) => {
        this.seeds.next({
          value: reply.value,
          pageLength: parseInt(reply.count, 10),
          pageSize: reply.page_size || 0,
          pageIndex: reply.page || 0,
        });
      });
  }

  onSelectEntity(entity: Entity) {
    this.selectedEntity = new Entity(entity);
    this.selectedSeed = null;
    combineLatest(this.seedPage, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.seedService.search({
          page_size: pageEvent.pageSize,
          page: pageEvent.pageIndex
        });
      }),
    ).subscribe((reply) => {
          this.seeds.next({
            value: reply.value,
            pageLength: parseInt(reply.count, 10),
            pageSize: reply.page_size || 0,
            pageIndex: reply.page || 0,
          });
    });
  }

  onSaveEntity(entity: Entity) {
    this.entityService.create(entity)
      .subscribe((newEntity: Entity) => {
        this.selectedEntity = newEntity;
        this.snackBarService.openSnackBar('Entitet er lagret');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onUpdateEntity(entity: Entity) {
    this.entityService.update(entity)
      .subscribe((updatedEntity: Entity) => {
        this.selectedEntity = updatedEntity;
        this.snackBarService.openSnackBar('Entitet oppdatert');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onDeleteEntity(entity: Entity): void {
    this.entityService.delete(entity.id).pipe(
      catchError((err) => {
        const errorString = err.error.error.split(':')[1];
        const deleteError = /delete CrawlEntity, there are/g;
        if (errorString.match(deleteError)) {
          this.snackBarService.openSnackBar(errorString);
          return empty;
        }
        return empty;
      })
    )
      .subscribe((deletedEntity) => {
        this.onClearEntity();
        this.snackBarService.openSnackBar('Entitet slettet');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onClearEntity(): void {
    this.onClearSeed();
    this.selectedEntity = null;
    this.entityList.clearSelection();
  }

  onSelectSeed(seed: Seed) {
    this.selectedSeed = seed;
  }

  onSelectAllSeeds(allSelected: boolean) {
    this.allSeedsSelected = allSelected;
    if (allSelected) {
      this.onSelectedSeedChange([new Seed('1234'), new Seed('5678')]);
    } else {
      this.onSelectedSeedChange([]);
      this.componentRef.destroy();
    }
  }

  onSelectedSeedChange(seeds: Seed[]) {
    this.selectedSeeds = seeds;
    if (!this.seedSingleMode) {
      if (!this.allSeedsSelected) {
        this.loadSeedComponent(
          this.mergeSeeds(seeds), this.crawlJobs, getInitialLabels(seeds, Seed), isDisabledEqual(seeds));
      } else {
        const seed = new Seed('123456');
        seed.id = '1234567';
        seed.meta.name = 'update';
        this.loadSeedComponent(seed, this.crawlJobs, [], true);
      }

    } else {
      this.selectedSeed = seeds[0];
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      if (this.selectedSeed === undefined) {
        this.selectedSeed = null;
      }
    }
  }

  onPageSeed(page: PageEvent) {
    this.seedPage.next(page);
  }

  onClearSeed(): void {
    this.selectedSeed = null;
    if (!this.seedSingleMode) {
      this.selectedSeeds = [];
      this.loadSeedList(this.selectedEntity.id);
      this.componentRef.destroy();
     if(this.allSeedsSelected) {
       this.allSeedsSelected = false;
     }
    }
  }

  onCreateSeed(entityId: string) {
    if (entityId) {
      this.selectedSeed = new Seed(entityId);
    } else {
      this.snackBarService.openSnackBar('Kan ikke lage ny seed før gjeldende entitet er lagret');
    }
  }

  onSaveSeed(seed: Seed): void {
    this.seedService.create(seed)
      .subscribe((createdSeed) => {
        this.selectedSeed = createdSeed;
        this.loadSeedList(seed.entity_id);
        this.snackBarService.openSnackBar('Seed lagret');
      });

  }

  onUpdateSeed(seed: Seed): void {
    this.seedService.update(seed)
      .subscribe((updatedSeed) => {
        this.selectedSeed = updatedSeed;
        this.loadSeedList(seed.entity_id);
        this.snackBarService.openSnackBar('Seed er oppdatert');
      });
  }

  onDeleteSeed(seed: Seed): void {
    this.seedService.delete(seed.id)
      .subscribe((deletedSeed) => {
        this.selectedSeed = null;
        this.loadSeedList(seed.entity_id);
        this.snackBarService.openSnackBar('Seed er slettet');
        this.onSelectEntity(this.selectedEntity);
      });
  }

  onUpdateMultipleSeeds(seedUpdate: Seed, initialLabels: Label[]) {
    const numOfConfigs = this.selectedSeeds.length.toString();
    from(this.selectedSeeds).pipe(
      mergeMap((seed: Seed) => {

        if (seed.meta.label === undefined) {
          seed.meta.label = [];
        }
        seed.meta.label = updatedLabels(seedUpdate.meta.label.concat(seed.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(seedUpdate.meta.label, label.key, label.value)) {
            seed.meta.label.splice(
              seed.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value), 1);
          }
        }

        if (seedUpdate.disabled !== undefined) {
          seed.disabled = seedUpdate.disabled;
        }

        if (seedUpdate.job_id !== ['']) {
          seed.job_id = seedUpdate.job_id;
        }
        return this.seedService.update(seed);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedSeeds = [];
      this.componentRef.destroy();
      this.selectedSeed = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs + ' seeds er oppdatert');
    });
  }




  onDeleteMultipleSeeds(seeds: Seed[]) {
    const numOfSeeds = seeds.length.toString();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numOfSeeds
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(seeds).pipe(
            mergeMap((seed) => this.seedService.delete(seed.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedSeeds = [];
            this.componentRef.destroy();
            this.selectedSeed = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfSeeds + ' seeds er slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Seeds vil ikke bli slettet');
        }
      });
  }

  onUpdateAllSeeds(seedUpdate: Seed) {
    console.log('Skal oppdatere alle tilgjengelige seeds');
  }

  onDeleteAllSeeds() {
    console.log('skal slette alle tilgjengelige seeds');
  }


  mergeSeeds(seeds: Seed[]) {
    const seed = new Seed('1234567');
    const compareSeed = seeds[0];

    // please validators
    seed.id = '1234567';
    seed.meta.name = 'multi';

    const equalDisabledStatus = isDisabledEqual(seeds);
    const commonJobs = commonCrawljobs(seeds);

    if (equalDisabledStatus) {
      seed.disabled = compareSeed.disabled;
    } else {
      seed.disabled = undefined;
    }

    for (const seedObj of seeds) {
      for (const job of commonJobs) {
        if (seedObj.job_id.includes(job)) {
        } else {
          commonJobs.splice(commonJobs.indexOf(job), 1);
        }
      }
    }

    seed.job_id = commonJobs;

    const label = seeds.reduce((acc: Seed, curr: Seed) => {
      seed.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return seed;
    });
    return seed;
  }
}

// Helper function to determine if all selected seeds has the same value for disabled
function isDisabledEqual(seeds: Seed[]) {
  const compareSeed = seeds[0];
  const equalDisabledStatus = seeds.every(function (seed: Seed) {
    return seed.disabled === compareSeed.disabled;
  });
  return equalDisabledStatus;
}

// Helper function for finding common crawljob for selected seeds
function commonCrawljobs(seeds: Seed[]) {
  const allJobs = [];
  for (const seed of seeds) {
    if (seed.job_id !== undefined) {
      allJobs.push(seed.job_id);
    } else {
      return false;
    }
  }
  const mergedJobs = [].concat.apply([], allJobs);
  const uniqueJobs = mergedJobs.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  });
  return uniqueJobs;
}
