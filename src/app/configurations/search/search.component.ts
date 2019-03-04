import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';

import {BehaviorSubject, combineLatest, EMPTY as empty, from, of, Subject} from 'rxjs';
import {catchError, filter, map, mergeMap, share, startWith, switchMap, tap} from 'rxjs/operators';

import {ConfigObject, ConfigRef, Kind, Seed} from '../../commons/models/';
import {SearchService} from './search.service';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {RoleService} from '../../auth';

import {BackendService} from '../shared/backend.service';
import {ActivatedRoute} from '@angular/router';
import {SearchDataService} from '../shared/search-data.service';
import {SeedDetailComponent} from '../seeds';
import {EntityDetailsComponent} from '../entities';
import {FieldMask, ListRequest} from '../../../api';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {DataService} from '../shared/data.service';
import {DetailDirective} from '../shared/detail.directive';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchDataService, DataService]
})

export class SearchComponent implements OnInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10, 50, 100];

  selectedEntity: BehaviorSubject<ConfigObject> = new BehaviorSubject<ConfigObject>(null);
  selectedEntity$ = this.selectedEntity.asObservable().pipe(
    share(),
    tap(() => {
      this.selectedSeed = null;
      this.seedDataService.clear();
    })
  );
  selectedEntities: ConfigObject[] = [];

  selectedSeed: ConfigObject = null;
  selectedSeeds: ConfigObject[] = [];

  changes: Subject<void> = new Subject<void>();

  seedPage: Subject<PageEvent> = new Subject<PageEvent>();
  seedPage$ = this.seedPage.asObservable();

  seedChanges: Subject<void> = new Subject<void>();
  seedChanges$ = this.seedChanges.asObservable();

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

  seedData = new Subject<ConfigObject>();
  seedData$ = this.seedData.asObservable();

  entityCount = new BehaviorSubject<number>(0);
  entityCount$ = this.entityCount.asObservable();

  seedCount = new BehaviorSubject<number>(0);
  seedCount$ = this.seedCount.asObservable();

  page: Subject<PageEvent> = new Subject<PageEvent>();

  kind: Kind;

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable().pipe(
    tap(() => this.searchDataService.clear()),
  );

  constructor(private searchService: SearchService,
              private searchDataService: SearchDataService,
              private seedDataService: DataService,
              private backendService: BackendService,
              private snackBarService: SnackBarService,
              private roleService: RoleService,
              private activatedRoute: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog) {
  }

  get componentRef() {
    return this.detailHost.viewContainerRef.get(0);
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
    combineLatest(this.searchTerm$, this.entityPage$).pipe(
      switchMap(([term, {pageIndex, pageSize}]) =>
        this.searchService.search(term, {pageIndex, pageSize})
      )
    ).subscribe((configObject: ConfigObject) => {
      this.searchDataService.add(configObject);
    });


    this.selectedEntity$.pipe(
      filter(entity => !!entity),
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
        listRequest.setQueryTemplate(ConfigObject.toProto(configObject));
        return listRequest;
      }),
      switchMap(listRequest => this.backendService.count(listRequest)),
    ).subscribe(count => this.seedCount.next(count));

    combineLatest(this.seedPage$, this.selectedEntity$.pipe(filter(_ => !!_)), this.seedChanges$.pipe(startWith(null))).pipe(
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
        listRequest.setQueryTemplate(ConfigObject.toProto(configObject));
        return listRequest;

      }),
      mergeMap((request) => this.backendService.list(request)),
      map(configObject => ConfigObject.fromProto(configObject)),
    ).subscribe(
      (configObject: ConfigObject) => console.log(configObject), // pass)this.seedDataService.add(configObject),
      err => console.log(err));
  }

  loadSeedList() {
    this.seedData.next(null);
  }

  // loadComponent(mergedConfigObject: ConfigObject) {
  //   const kind = mergedConfigObject.kind;
  //   let component;
  //   switch (kind) {
  //     case Kind.CRAWLENTITY:
  //       component = EntityDetailsComponent;
  //       break;
  //     case Kind.SEED:
  //       component = SeedDetailComponent;
  //       break;
  //   }
  //
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
  //   const viewContainerRef = this.detailHost.viewContainerRef;
  //   viewContainerRef.clear();
  //   this.componentRef = viewContainerRef.createComponent(componentFactory);
  //   const instance = Object.assign(this.componentRef.instance);
  //   const formControl = instance.form.controls;
  //   instance.configObject = mergedConfigObject;
  //   instance.data = false;
  //   switch (kind) {
  //     case Kind.CRAWLENTITY:
  //       instance.updateAll = this.allEntitiesSelected;
  //       instance.clear.subscribe(() => this.onClearEntity());
  //       break;
  //     case Kind.SEED:
  //       instance.updateAll = this.allSeedsSelected;
  //       instance.clear.subscribe(() => this.onClearSeed());
  //   }
  //   instance.updateForm();
  //
  //   if (kind === Kind.CRAWLENTITY) {
  //     if (!this.allEntitiesSelected) {
  //       instance.update.subscribe(
  //         (entityUpdate) => {
  //           const addLabel = instance.shouldAddLabel;
  //           this.onUpdateMultipleEntities(mergedConfigObject, entityUpdate, formControl, addLabel);
  //         });
  //       instance.delete.subscribe(() => this.onDeleteMultipleEntities(this.selectedEntities));
  //     }
  //
  //     if (this.allEntitiesSelected) {
  //       // instance.update.subscribe((entityUpdate) => this.onUpdateAllEntities(entityUpdate));
  //       // instance.delete.subscribe(() => this.onDeleteAllEntities());
  //     }
  //   }
  //   if (kind === Kind.SEED) {
  //     if (!this.allSeedsSelected) {
  //
  //       instance.update.subscribe((seedUpdate) => {
  //         const addLabel = instance.shouldAddLabel;
  //         const addCrawlJob = instance.shouldAddCrawlJob;
  //         this.onUpdateMultipleSeeds(mergedConfigObject, seedUpdate, formControl, addLabel, addCrawlJob);
  //       });
  //
  //       instance.delete.subscribe(() => this.onDeleteMultipleSeeds(this.selectedSeeds));
  //     }
  //
  //     if (this.allSeedsSelected) {
  //       instance.update.subscribe((seedUpdate) => this.onUpdateAllSeeds(seedUpdate));
  //       instance.delete.subscribe(() => this.onDeleteAllSeeds());
  //     }
  //   }
  // }

  onEnterKey(event) {
    console.log('enterkey');
    this.selectedEntity = null;
    this.selectedEntities = [];
    this.selectedSeed = null;
    this.selectedSeeds = [];
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.searchTerm.next(event.target.value);
  }


  onPageEntity(page: PageEvent) {
    console.log('page entity');
    this.entityPage.next(page);
  }


  onSelectEntity(entity: ConfigObject) {
    console.log('onSelectEntity');
    this.selectedEntity.next(entity);
  }


  onSelectAllEntities(allSelected: boolean) {
    /*
    this.allEntitiesSelected = allSelected;
    if (allSelected) {
      this.onSelectedEntityChange([new ConfigObject({kind: Kind.CRAWLENTITY}), new ConfigObject({kind: Kind.CRAWLENTITY})]);
    } else {
      this.onSelectedEntityChange([]);
    }
    */
  }


  onSelectedEntityChange(entities: ConfigObject[]) {
    /*
    this.selectedEntities = entities;
    if (!this.entitySingleMode) {
      if (!this.allEntitiesSelected) {
        const configObject = ConfigObject.mergeConfigs(entities);
        this.loadEntityComponent({configObject});
      } else {
        const configObject = entities[0];
        configObject.meta.name = 'update';
        configObject.id = '1234567';
        this.loadEntityComponent({configObject});
      }
    } else {
      this.selectedEntity.next(entities[0] || null);
      this.destroyComponent();
    }
    */
  }


  onClearEntity(): void {
    this.onClearSeed();
    this.selectedEntity.next(null);
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
  }

  onSaveEntity(configObject: ConfigObject) {
    this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(map(newConfig => ConfigObject.fromProto(newConfig)))
      .subscribe(newConfig => {
        this.entityCount.next(this.entityCount.value + 1);
        this.selectedEntity.next(newConfig);
        this.searchDataService.add(newConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateEntity(configObject: ConfigObject) {
    this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(map(newConfig => ConfigObject.fromProto(newConfig)))
      .subscribe(newConfig => {
        this.selectedEntity.next(newConfig);
        this.searchDataService.update(newConfig);
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteEntity(configObject: ConfigObject): void {
    this.backendService.delete(ConfigObject.toProto(configObject)).pipe(
      catchError((err) => {
        const errorString = err.message.split(':')[1];
        const deleteError = /delete crawlEntity, there are/gm;
        if (deleteError.test(errorString)) {
          this.snackBarService.openSnackBar(errorString);
          return empty;
        }
        return empty;
      })
    )
      .subscribe(() => {
        this.searchDataService.delete(configObject);
        this.selectedEntity.next(null);
        this.snackBarService.openSnackBar('Entitet slettet');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onSelectedSeedChange(seeds: ConfigObject[]) {
    this.selectedSeeds = seeds;
    if (!this.seedSingleMode) {
      if (!this.allSeedsSelected) {
        const configObject = ConfigObject.mergeConfigs(seeds);
        this.loadSeedComponent({configObject});
      } else {
        const configObject = seeds[0];
        configObject.meta.name = 'update';
        configObject.id = '1234567';
        this.loadSeedComponent({configObject});
      }
    } else {
      this.selectedSeed = seeds[0] || null;
      this.destroyComponent();
    }
  }


  onSelectSeed(seed: ConfigObject) {
    this.selectedSeed = seed;
  }

  onSelectAllSeeds(allSelected: boolean) {
    this.allSeedsSelected = allSelected;
    if (allSelected) {
      this.onSelectedSeedChange([new ConfigObject({kind: Kind.SEED}), new ConfigObject({kind: Kind.SEED})]);
    } else {
      this.onSelectedSeedChange([]);
    }
  }

  onPageSeed(page: PageEvent) {
    this.seedPage.next(page);
  }

  onClearSeed(): void {
    this.selectedSeed = null;
    if (!this.seedSingleMode) {
      this.selectedSeeds = [];
      this.componentRef.destroy();
      if (this.allSeedsSelected) {
        this.allSeedsSelected = false;
      }
    }
  }

  onCreateSeed() {
    const entityId = this.selectedEntity.value.id;
    this.onClearSeed();
    if (entityId) {
      const entityRef = new ConfigRef({kind: Kind.CRAWLENTITY, id: entityId});
      console.log(entityRef);
      const seed = new Seed({entityRef});
      console.log(seed);
      const configObject = new ConfigObject({seed});
      console.log(configObject);
      this.selectedSeed = configObject;
    } else {
      this.snackBarService.openSnackBar('Kan ikke lage ny seed før gjeldende entitet er lagret');
    }
  }

  onSaveSeed(configObject: ConfigObject): void {
    this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(map(newConfig => ConfigObject.fromProto(newConfig)))
      .subscribe(newConfig => {
        this.seedCount.next(this.seedCount.value + 1);
        this.loadSeedList();
        this.selectedSeed = newConfig;
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Seed lagret');
      });

  }

  onUpdateSeed(configObject: ConfigObject): void {
    this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(map(newConfig => ConfigObject.fromProto(newConfig)))
      .subscribe(newConfig => {
        this.loadSeedList();
        this.selectedSeed = newConfig;
        this.seedDataService.update(newConfig);
        this.snackBarService.openSnackBar('Seed oppdatert');
      });
  }

  onDeleteSeed(configObject: ConfigObject): void {
    this.backendService.delete(ConfigObject.toProto(configObject))
      .subscribe(() => {
        this.seedCount.next(this.seedCount.value - 1);
        this.selectedSeed = null;
        this.seedDataService.delete(configObject);
        this.snackBarService.openSnackBar('Seed slettet');
      });
  }

  onUpdateSelectedEntities(mergedEntity: ConfigObject, entityUpdate: ConfigObject, formControl: any, options) {

    const {updateTemplate, pathList} = ConfigObject.createUpdateRequest(entityUpdate, formControl, mergedEntity, options);

    this.searchDataService.updateWithTemplate(updateTemplate, pathList)
      .subscribe(updatedEntities => {
        this.selectedEntities = [];
        this.onClearEntity();
        this.componentRef.destroy();
        this.searchTerm.next(this.searchTerm.value);
        // TODO
        this.snackBarService.openSnackBar('TODO' + ' entiteter er oppdatert');
      });
  }


  onUpdateSelectedSeeds(mergedSeeds: ConfigObject, seedUpdate: ConfigObject, formControl: any, options: any) {
    const {updateTemplate, pathList} = ConfigObject.createUpdateRequest(seedUpdate, formControl, mergedSeeds, options);

    this.seedDataService.updateWithTemplate(updateTemplate, pathList, this.selectedSeeds.map(config => config.id))
      .subscribe(updatedSeeds => {
        this.selectedSeeds = [];
        this.onClearSeed();
        this.componentRef.destroy();
        this.seedChanges.next();
        this.snackBarService.openSnackBar('TODO' + ' seeds er oppdatert');
      });
  }

  onDeleteSelectedEntities(entities: ConfigObject[]) {
    const numOfEntities = entities.length.toString();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numOfEntities
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(entities).pipe(
            mergeMap((entity) => this.backendService.delete(ConfigObject.toProto(entity))),
            catchError((err) => {
              console.log(err);
              const errorString = err.message.split(':')[1];
              const deleteError = /delete crawlEntity, there are/gm;
              if (deleteError.test(errorString)) {
                this.snackBarService.openSnackBar(errorString);
                return empty;
              }
              return empty;
            }),
          ).subscribe(() => {
            this.entityCount.next(this.entityCount.value - entities.length);
            this.selectedEntities = [];
            this.componentRef.destroy();
            this.onClearEntity();
            this.searchTerm.next(this.searchTerm.value);
            this.snackBarService.openSnackBar(numOfEntities + ' entiteter er slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Entitetene vil ikke bli slettet');
        }
      });
  }

  onDeleteSelectedSeeds(seeds: ConfigObject[]) {
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
            mergeMap((seed) => this.backendService.delete(ConfigObject.toProto(seed))),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedSeeds = [];
            this.componentRef.destroy();
            this.onClearSeed();
            this.seedChanges.next();
            this.selectedSeed = null;
            this.snackBarService.openSnackBar(numOfSeeds + ' seeds er slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Seeds vil ikke bli slettet');
        }
      });
    this.seedCount.next(this.seedCount.value - seeds.length);
  }

  onUpdateAllEntities(configUpdate: ConfigObject, formControl: any, options) {
    const {pathList, updateTemplate} = ConfigObject.createUpdateRequest(configUpdate, null, formControl, options);

    this.searchDataService.updateWithTemplate(updateTemplate, pathList)
      .subscribe(updatedEntities => {
        this.selectedEntities = [];
        this.componentRef.destroy();
        this.searchTerm.next(this.searchTerm.value);
        this.snackBarService.openSnackBar('Alle entiteter er oppdatert');
      });
  }


  onUpdateAllSeeds(configUpdate: ConfigObject, formControl: any, options) {
    const {pathList, updateTemplate} = ConfigObject.createUpdateRequest(configUpdate, null, formControl, options);

    this.seedDataService.updateWithTemplate(updateTemplate, pathList)
      .subscribe(() => {
        this.selectedSeeds = [];
        this.onClearSeed();
        this.componentRef.destroy();
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Alle seeds er oppdatert');
      });
  }

  private loadEntityComponent(instanceData = {}) {
    const componentRef = this.createComponent(EntityDetailsComponent);
    this.initEntityComponent(componentRef.instance, instanceData);

  }

  private loadSeedComponent(instanceData = {}) {
    const componentRef = this.createComponent(SeedDetailComponent);
    this.initSeedComponent(componentRef.instance, instanceData);
  }

  private initEntityComponent(instance, instanceData) {
    Object.keys(instanceData).forEach(key => {
      instance[key] = instanceData[key];
    });

    const formControl = instance.form.controls;

    instance.data = false;
    instance.updateForm();

    instance.clear.subscribe(() => this.onClearEntity());
    if (!this.allEntitiesSelected) {
      instance.update.subscribe(
        (entityUpdate) => {
          const addLabel = instance.shouldAddLabel;
          this.onUpdateSelectedEntities(instance.configObject, entityUpdate, formControl, addLabel);
        });
      instance.delete.subscribe(() => console.log('IMPLEMENT ME')); // TODO this.onDeleteMultipleEntities(this.selectedEntities));
    }

    if (this.allEntitiesSelected) {
      instance.update.subscribe((entityUpdate) => {
        const addLabel = instance.shouldAddLabel;
        this.onUpdateAllEntities(entityUpdate, formControl, addLabel);
      });
      // instance.delete.subscribe(() => this.onDeleteAllEntities());
    }
  }

  private initSeedComponent(instance: SeedDetailComponent, instanceData) {
    Object.keys(instanceData).forEach(key => {
      instance[key] = instanceData[key];
    });

    const formControl = instance.form.controls;

    // instance.equalDisabled = equalDisabled;

    instance.data = false;
    instance.updateForm();
    instance.clear.subscribe(() => this.onClearSeed());

    if (!this.allSeedsSelected) {

      instance.update.subscribe((seedUpdate) => {
        const addLabel = instance.shouldAddLabel;
        const addCrawlJob = instance.shouldAddCrawlJob;
        this.onUpdateSelectedSeeds(instance.configObject, seedUpdate, formControl, {addLabel, addCrawlJob});
      });

      instance.delete.subscribe(() => this.onDeleteSelectedSeeds(this.selectedSeeds));
    }

    if (this.allSeedsSelected) {
      instance.update.subscribe((seedUpdate) => {
        const addLabel = instance.shouldAddLabel;
        const addCrawlJob = instance.shouldAddCrawlJob;
        this.onUpdateAllSeeds(seedUpdate, formControl, {addLabel, addCrawlJob});
      });
    }
  }

  private createComponent(component: any, viewContainerRef: ViewContainerRef = this.detailHost.viewContainerRef): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
  }

  private destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}

