import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';

import {BehaviorSubject, combineLatest, config, EMPTY as empty, from, of, Subject} from 'rxjs';
import {catchError, filter, map, mergeMap, startWith, switchMap, tap} from 'rxjs/operators';

import {ConfigObject, CrawlEntity as Entity, Kind, Label, Seed} from '../../commons/models/';
import {SearchReply, SearchService} from './search.service';
import {SeedDetailComponent, SeedService} from '../seeds';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
// import {CrawlJobService} from '../crawljobs';
// import {EntityDetailsComponent, EntityService} from '../entities/';
import {RoleService} from '../../auth';
import {findLabel, getInitialLabels, intersectLabel, updatedLabels} from '../../commons/group-update/labels/common-labels';
import {DetailDirective} from '../shared/detail.directive';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';

import {BackendService} from '../shared/backend.service';
import {FieldMask, ListRequest} from '../../../api/config/v1/config_pb';
import {ActivatedRoute} from '@angular/router';
import {ConfigRef} from '../../commons/models/configref.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10, 50, 100];

  selectedEntity: BehaviorSubject<ConfigObject> = new BehaviorSubject<ConfigObject>(null);
  selectedEntity$ = this.selectedEntity.asObservable();
  selectedEntities: ConfigObject[] = [];

  selectedSeed: ConfigObject = null;
  selectedSeeds: ConfigObject[] = [];

//  crawlJobs: CrawlJob[];

  componentRef = null;

  changes: Subject<void> = new Subject<void>();

  seedPage: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>(null);
  seedPage$ = this.seedPage.asObservable();

  seedChanges: Subject<void> = new Subject<void>();

  entityPage = new Subject<PageEvent>();
  entityPage$ = this.entityPage.asObservable();

  entities = new Subject<any>();
  entities$ = this.entities.asObservable();

  seeds = new Subject<any>();
  seeds$ = this.seeds.asObservable();

  allSeedsSelected = false;
  allEntitiesSelected = false;

  data = new Subject<ConfigObject[]>();
  data$ = this.data.asObservable();

  seedData = new Subject<ConfigObject[]>();
  seedData$ = this.seedData.asObservable();

  entityCount = new BehaviorSubject<number>(0);
  entityCount$ = this.entityCount.asObservable();

  seedCount = new BehaviorSubject<number>(0);
  seedCount$ = this.seedCount.asObservable();

  page: Subject<PageEvent> = new Subject<PageEvent>();

  kind: Kind;


  // dynamic views
  @ViewChild(DetailDirective) entityDetailHost: DetailDirective;
  @ViewChild(DetailDirective) seedDetailHost: DetailDirective;

  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable();

  constructor(private searchService: SearchService,
              private backendService: BackendService,
              private snackBarService: SnackBarService,
              private roleService: RoleService,
              private activatedRoute: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog) {
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get seedSingleMode(): boolean {
    return this.selectedSeeds.length < 2;
  }

  get entitySingleMode(): boolean {
    return this.selectedEntities.length < 2;
  }

  ngOnInit() {
    console.log('onInit search comp');
    this.kind = this.activatedRoute.snapshot.data.kind;

    // TODO const listRequest = new ListRequest();
    // TODO listRequest.setKind(this.kind.valueOf());
    // const queryMask = new FieldMask();
    // queryMask.setPathsList(['meta.name']);
    // listRequest.setQueryMask(queryMask);
    // const configObject = new ConfigObject({kind: Kind.CRAWLENTITY});
    // configObject.meta.name = 'Test';
    // listRequest.setQueryTemplate(configObject.toProto());

    // TODO denne virker til å hente entiteter
    // this.backendService.count(listRequest).subscribe(count => this.entityCount.next(count));
    // combineLatest(this.entityPage, this.changes.pipe(startWith(null))).pipe(
    //   map(([pageEvent]) => {
    //     listRequest.setOffset(pageEvent.pageIndex * pageEvent.pageSize);
    //     listRequest.setPageSize(pageEvent.pageSize);
    //     console.log('listRequestReturn: ', listRequest.toObject());
    //     return listRequest;
    //   }),
    //   mergeMap((request) => this.backendService.list(request)),
    //   map(configObjects => configObjects.map(ConfigObject.fromProto)),
    // ).subscribe(
    //   (configObjects: ConfigObject[]) => this.data.next(configObjects),
    //   err => console.log(err),
    // TODO  () => console.log('sub'));


    // Load prerequisites for app-seed-detail
    // if (this.canEdit) {
    //   this.crawlJobService.list()
    //     .pipe(map(reply => reply.value))
    //     .subscribe((crawlJobs) => this.crawlJobs = crawlJobs);
    // } else {
    //   this.crawlJobs = [];
    // }

    combineLatest(
      this.searchTerm$,
      this.entityPage$
    ).pipe(
      switchMap(([term, pager]) =>
        this.searchService.search({
          term,
          pageIndex: pager.pageIndex,
          pageSize: pager.pageSize,
        })
      )
    ).subscribe((reply: any) => {
      console.log('onInit reply: ', reply);
      this.data.next(reply.value);
      this.entityCount.next(reply.length);

      //     if (reply.length > 0 && this.searchTerm.value.length > 0) {
      //
      //       if (reply.length === 1) {
      //         this.selectedEntity = reply.value[0];
      //       }
      //     } else if (this.searchTerm.value) {
      //     //  this.selectedEntity = new Entity({name: this.searchTerm.value});
      //       this.clearSeedList();
      //     }
      //   });
      //
      //   this.seedPage$.subscribe((page: PageEvent) => {
      //     console.log('seed page subscription', page);
      //     if (this.selectedEntity) {
      //       this.loadSeedList(this.selectedEntity.id, page);
      //     } else {
      //
      //     }
      //   });
    });

    this.selectedEntity$.pipe(
      filter(entity => !! entity),
      map(entity => {
        const listRequest = new ListRequest();
        listRequest.setKind(Kind.SEED.valueOf());
        const queryMask = new FieldMask();
        queryMask.setPathsList(['seed.entityRef.id']);
        listRequest.setQueryMask(queryMask);
        const configObject = new ConfigObject({kind: Kind.SEED});
        const seed = new Seed();
        seed.entityRef.id = entity.id;
        configObject.seed = seed;
        listRequest.setQueryTemplate(configObject.toProto());
        return listRequest;
      }),
      switchMap(listRequest => this.backendService.count(listRequest)),
    ).subscribe(count => this.seedCount.next(count));

    combineLatest(this.seedPage$, this.selectedEntity$, this.seedChanges.pipe(startWith(null))).pipe(
      filter(([p]) => !!p),
      map(([pageEvent, entity]) => {


        const listRequest = new ListRequest();
        listRequest.setOffset(pageEvent.pageIndex * pageEvent.pageSize);
        listRequest.setPageSize(pageEvent.pageSize);

        listRequest.setKind(Kind.SEED.valueOf());
        const queryMask = new FieldMask();
        queryMask.setPathsList(['seed.entityRef.id']);
        listRequest.setQueryMask(queryMask);
        const configObject = new ConfigObject({kind: Kind.SEED});
        const seed = new Seed();
        seed.entityRef.id = entity.id;
        configObject.seed = seed;
        listRequest.setQueryTemplate(configObject.toProto());

        return listRequest;


      }),
      mergeMap((request) => this.backendService.list(request)),
      map(configObjects => configObjects.map(ConfigObject.fromProto)),
    ).subscribe(
      (configObjects: ConfigObject[]) => this.seedData.next(configObjects),
      err => console.log(err),
      () => console.log('sub'));
  }

  loadSeedList(entityId: string) {
    this.seedData.next([]);


    // combineLatest(this.entityPage$, this.changes.pipe(startWith(null))).pipe(


  }

//  loadEntityComponent(entity: Entity, initialLabels: Label[]) {
  // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EntityDetailsComponent);
  // const viewContainerRef = this.entityDetailHost.viewContainerRef;
  // viewContainerRef.clear();
  // this.componentRef = viewContainerRef.createComponent(componentFactory);
  // const instance = this.componentRef.instance as EntityDetailsComponent;
  // instance.entity = entity;
  // instance.data = false;
  // instance.updateForm(entity);
  // instance.clear.subscribe(() => this.onClearEntity());
  // if (!this.allEntitiesSelected) {
  //   instance.update.subscribe((entityUpdate) => this.onUpdateMultipleEntities(entityUpdate, initialLabels));
  //   instance.delete.subscribe(() => this.onDeleteMultipleEntities(this.selectedEntities));
  // }
  //
  // if (this.allEntitiesSelected) {
  //   instance.update.subscribe((entityUpdate) => this.onUpdateAllEntities(entityUpdate));
  //   instance.delete.subscribe(() => this.onDeleteAllEntities());
  // }
  // }

  // loadSeedComponent(seed: Seed, crawlJobs: CrawlJob[], initialLabels: Label[], equalDisabled: boolean) {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SeedDetailComponent);
  //   const viewContainerRef = this.seedDetailHost.viewContainerRef;
  //   viewContainerRef.clear();
  //   this.componentRef = viewContainerRef.createComponent(componentFactory);
  //   const instance = this.componentRef.instance as SeedDetailComponent;
  //   instance.seed = seed;
  //   instance.equalDisabled = equalDisabled;
  //   instance.crawlJobs = crawlJobs;
  //   instance.data = false;
  //   instance.updateForm();
  //   instance.clear.subscribe(() => this.onClearSeed());
  //   if (!this.allSeedsSelected) {
  //     instance.update.subscribe((seedUpdate) => this.onUpdateMultipleSeeds(seedUpdate, initialLabels));
  //     instance.delete.subscribe(() => this.onDeleteMultipleSeeds(this.selectedSeeds));
  //   }
  //
  //   if (this.allSeedsSelected) {
  //     instance.update.subscribe((seedUpdate) => this.onUpdateAllSeeds(seedUpdate));
  //     instance.delete.subscribe(() => this.onDeleteAllSeeds());
  //   }
  // }

  onEnterKey(event) {
    this.selectedEntity = null;
    this.selectedEntities = [];
    this.selectedSeed = null;
    this.selectedSeeds = [];
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    console.log('onEnter: ', event.target.value);
    console.log('this searchTerm: ', this.searchTerm);
    this.searchTerm.next(event.target.value);
  }

  onClearEntity(): void {
    this.onClearSeed();
    this.selectedEntity = null;
    if (!this.entitySingleMode) {
      this.selectedEntities = [];
      this.componentRef.destroy();
      if (this.allEntitiesSelected) {
        this.allEntitiesSelected = false;
      }
    }
  }

  onCreateEntity() {
    this.selectedEntity.next(new ConfigObject({kind: Kind.CRAWLENTITY}));
    // this.selectedSeed = null;
    // this.clearSeedList();
  }

  onSelectEntity(entity: ConfigObject) {
    this.selectedEntity.next(entity);
  }

  onSelectedEntityChange(entities: Entity[]) {
    // this.selectedEntities = entities;
    // if (!this.entitySingleMode) {
    //   if (!this.allEntitiesSelected) {
    //     this.loadEntityComponent(this.mergeEntities(entities), getInitialLabels(entities, Entity));
    //   } else {
    //     const entity = new Entity();
    //     // Please validators
    //     entity.id = '1234567';
    //     entity.meta.name = 'update';
    //     this.loadEntityComponent(entity, []);
    //   }
    // } else {
    //   this.selectedEntity = entities[0] || null;
    //   if (this.componentRef !== null) {
    //     this.componentRef.destroy();
    //   }
    // }
  }

  onSaveEntity(configObject: ConfigObject) {
    this.backendService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.entityCount.next(this.entityCount.value + 1);
        this.selectedEntity.next(ConfigObject.fromProto(newConfig));
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateEntity(configObject: ConfigObject) {
    this.backendService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.selectedEntity.next(ConfigObject.fromProto(newConfig));
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteEntity(entity: ConfigObject): void {
    this.backendService.delete(entity.toProto()).pipe(
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

  // onUpdateMultipleEntities(entityUpdate: Entity, initialLabels: Label[]) {
  // const numOfEntities = this.selectedEntities.length.toString();
  // from(this.selectedEntities).pipe(
  //   mergeMap((entity: Entity) => {
  //
  //     if (entity.meta.label === undefined) {
  //       entity.meta.label = [];
  //     }
  //     entity.meta.label = updatedLabels(entityUpdate.meta.label.concat(entity.meta.label));
  //     for (const label of initialLabels) {
  //       if (!findLabel(entityUpdate.meta.label, label.key, label.value)) {
  //         entity.meta.label.splice(
  //           entity.meta.label.findIndex(
  //             removedLabel => removedLabel.key === label.key && removedLabel.value === label.value), 1);
  //       }
  //     }
  //     return this.entityService.update(entity);
  //   }),
  //   catchError((err) => {
  //     console.log(err);
  //     return of('true');
  //   }),
  // ).subscribe(() => {
  //   this.selectedEntities = [];
  //   this.selectedEntity = null;
  //   this.componentRef.destroy();
  //   this.changes.next();
  //   this.snackBarService.openSnackBar(numOfEntities + ' entiteter er oppdatert');
  // });
  // }

  // onDeleteMultipleEntities(entities: Entity[]) {
  // const numOfEntities = entities.length.toString();
  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;
  // dialogConfig.data = {
  //   numberOfConfigs: numOfEntities
  // };
  // const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
  // dialogRef.afterClosed()
  //   .subscribe(result => {
  //     if (result) {
  //       from(entities).pipe(
  //         mergeMap((entity) => this.entityService.delete(entity.id)),
  //         catchError((err) => {
  //           console.log(err);
  //           const errorString = err.error.error.split(':')[1];
  //           const deleteError = /delete CrawlEntity, there are/g;
  //           if (errorString.match(deleteError)) {
  //             this.snackBarService.openSnackBar(errorString);
  //             return empty;
  //           }
  //           return empty;
  //         }),
  //       ).subscribe(() => {
  //         this.selectedEntities = [];
  //         this.componentRef.destroy();
  //         this.selectedEntity = null;
  //         this.changes.next();
  //         this.snackBarService.openSnackBar(numOfEntities + ' entiteter er slettet');
  //       });
  //     } else {
  //       this.snackBarService.openSnackBar('Entitetene vil ikke bli slettet');
  //     }
  //   });
  // }

  onSelectAllEntities(allSelected: boolean) {
    // this.allEntitiesSelected = allSelected;
    // if (allSelected) {
    //   this.onSelectedEntityChange([new Entity(), new Entity()]);
    // } else {
    //   this.onSelectedEntityChange([]);
    // }
  }

  onUpdateAllEntities(entityUpdate: Entity) {
    console.log('Skal oppdatere alle tilgjengelige entiteter');
  }

  onDeleteAllEntities() {
    console.log('Skal slette alle tilgjengelige entiteter');
  }


  clearSeedList() {
    this.seeds.next({
      value: [],
      pageLength: 0,
      pageSize: 5,
      pageIndex: 0,
    });
  }


  onSelectSeed(seed: ConfigObject) {
    this.selectedSeed = seed;
    console.log(seed);
  }

  onSelectAllSeeds(allSelected: boolean) {
    // this.allSeedsSelected = allSelected;
    // if (allSelected) {
    //   this.onSelectedSeedChange([new Seed('1234'), new Seed('5678')]);
    // } else {
    //   this.onSelectedSeedChange([]);
    // }
  }

  onSelectedSeedChange(seeds: Seed[]) {
    // this.selectedSeeds = seeds;
    // if (!this.seedSingleMode) {
    //   if (!this.allSeedsSelected) {
    //     this.loadSeedComponent(
    //       this.mergeSeeds(seeds), this.crawlJobs, getInitialLabels(seeds, Seed), isDisabledEqual(seeds));
    //   } else {
    //     const seed = new Seed('123456');
    //     seed.id = '1234567';
    //     seed.meta.name = 'update';
    //     this.loadSeedComponent(seed, this.crawlJobs, [], true);
    //   }
    //
    // } else {
    //   this.selectedSeed = seeds[0] || null;
    //   if (this.componentRef !== null) {
    //     this.componentRef.destroy();
    //   }
    // }
  }

  onPageEntity(page: PageEvent) {
    this.entityPage.next(page);
  }

  onPageSeed(page: PageEvent) {
    console.log(page);
    this.seedPage.next(page);
  }

  onClearSeed(): void {
    this.selectedSeed = null;
    if (!this.seedSingleMode) {
      this.selectedSeeds = [];
     //  this.loadSeedList(this.selectedEntity.id);
      this.componentRef.destroy();
      if (this.allSeedsSelected) {
        this.allSeedsSelected = false;
      }
    }
  }

  onCreateSeed(entityId: string) {
    this.onClearSeed();
    if (entityId) {
      console.log('onCreateSeed med id: ', entityId);
      const configRef = new ConfigRef();
      configRef.kind = Kind.CRAWLENTITY;
      configRef.id = entityId;
      const configObject = new ConfigObject();
      const seed = new Seed();
      seed.entityRef = configRef;
      configObject.seed = seed;
      this.selectedSeed = configObject;
      console.log('selectedSeed: ', this.selectedSeed);
    } else {
      this.snackBarService.openSnackBar('Kan ikke lage ny seed før gjeldende entitet er lagret');
    }
  }

  onSaveSeed(configObject: ConfigObject): void {
    this.backendService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.seedCount.next(this.seedCount.value + 1);
        this.selectedEntity.next(ConfigObject.fromProto(newConfig));
        this.loadSeedList(configObject.seed.entityRef.id);
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Seed lagret');
      });

  }

  onUpdateSeed(configObject: ConfigObject): void {
    this.backendService.save(configObject.toProto())
      .subscribe(newConfig => {
        // this.selectedEntity.next(ConfigObject.fromProto(newConfig));
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Seed oppdatert');
      });
  }

  onDeleteSeed(configObject: ConfigObject): void {
    // this.seedService.delete(seed.id)
    //   .subscribe((deletedSeed) => {
    //     this.selectedSeed = null;
    //     this.loadSeedList(seed.entity_id);
    //     this.snackBarService.openSnackBar('Seed er slettet');
    //     this.onSelectEntity(this.selectedEntity);
    //   });
    this.backendService.delete(configObject.toProto())
      .subscribe(() => {
        this.seedCount.next(this.seedCount.value - 1);
        this.selectedSeed = null;
        // this.loadSeedList(this.selectedEntity.id);
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onUpdateMultipleSeeds(seedUpdate: Seed, initialLabels: Label[]) {
    // const numOfConfigs = this.selectedSeeds.length.toString();
    // from(this.selectedSeeds).pipe(
    //   mergeMap((seed: Seed) => {
    //
    //     if (seed.meta.label === undefined) {
    //       seed.meta.label = [];
    //     }
    //     seed.meta.label = updatedLabels(seedUpdate.meta.label.concat(seed.meta.label));
    //     for (const label of initialLabels) {
    //       if (!findLabel(seedUpdate.meta.label, label.key, label.value)) {
    //         seed.meta.label.splice(
    //           seed.meta.label.findIndex(
    //             removedLabel => removedLabel.key === label.key && removedLabel.value === label.value), 1);
    //       }
    //     }
    //
    //     if (seedUpdate.disabled !== undefined) {
    //       seed.disabled = seedUpdate.disabled;
    //     }
    //
    //     if (seedUpdate.job_id !== ['']) {
    //       seed.job_id = seedUpdate.job_id;
    //     }
    //     return this.seedService.update(seed);
    //   }),
    //   catchError((err) => {
    //     console.log(err);
    //     return of('true');
    //   }),
    // ).subscribe(() => {
    //   this.selectedSeeds = [];
    //   this.componentRef.destroy();
    //   this.selectedSeed = null;
    //   this.changes.next();
    //   this.snackBarService.openSnackBar(numOfConfigs + ' seeds er oppdatert');
    // });
  }


  onDeleteMultipleSeeds(seeds: Seed[]) {
    // const numOfSeeds = seeds.length.toString();
    // const entityId = seeds[0].entity_id;
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = {
    //   numberOfConfigs: numOfSeeds
    // };
    // const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    // dialogRef.afterClosed()
    //   .subscribe(result => {
    //     if (result) {
    //       from(seeds).pipe(
    //         mergeMap((seed) => this.seedService.delete(seed.id)),
    //         catchError((err) => {
    //           console.log(err);
    //           return of('true');
    //         }),
    //       ).subscribe(() => {
    //         this.selectedSeeds = [];
    //         this.componentRef.destroy();
    //         this.loadSeedList(entityId);
    //         this.selectedSeed = null;
    //         this.changes.next();
    //         this.snackBarService.openSnackBar(numOfSeeds + ' seeds er slettet');
    //       });
    //     } else {
    //       this.snackBarService.openSnackBar('Seeds vil ikke bli slettet');
    //     }
    //   });
  }

  onUpdateAllSeeds(seedUpdate: Seed) {
    console.log('Skal oppdatere alle tilgjengelige seeds');
  }

  onDeleteAllSeeds() {
    console.log('skal slette alle tilgjengelige seeds');
  }

  mergeEntities(entities: Entity[]) {
    // const entity = new Entity();
    // const compareEntity = entities[0];
    //
    // // please validators
    // entity.id = '1234567';
    // entity.meta.name = 'multi';
    //
    // const label = entities.reduce((acc: Entity, curr: Entity) => {
    //   entity.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
    //   return entity;
    // });
    // return entity;
  }


  mergeSeeds(seeds: Seed[]) {
    //   const seed = new Seed('1234567');
    //   const compareSeed = seeds[0];
    //
    //   // please validators
    //   seed.id = '1234567';
    //   seed.meta.name = 'multi';
    //
    //   const equalDisabledStatus = isDisabledEqual(seeds);
    //   const commonJobs = commonCrawljobs(seeds);
    //
    //   if (equalDisabledStatus) {
    //     seed.disabled = compareSeed.disabled;
    //   } else {
    //     seed.disabled = undefined;
    //   }
    //
    //   for (const seedObj of seeds) {
    //     for (const job of commonJobs) {
    //       if (seedObj.job_id.includes(job)) {
    //       } else {
    //         commonJobs.splice(commonJobs.indexOf(job), 1);
    //       }
    //     }
    //   }
    //
    //   seed.job_id = commonJobs;
    //
    //   const label = seeds.reduce((acc: Seed, curr: Seed) => {
    //     seed.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
    //     return seed;
    //   });
    //   return seed;
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
  // const allJobs = [];
  // for (const seed of seeds) {
  //   if (seed.job_id !== undefined) {
  //     allJobs.push(seed.job_id);
  //   } else {
  //     return false;
  //   }
  // }
  // const mergedJobs = [].concat.apply([], allJobs);
  // const uniqueJobs = mergedJobs.filter(function (elem, index, self) {
  //   return index === self.indexOf(elem);
  // });
  // return uniqueJobs;
}
