import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';

import {BehaviorSubject, combineLatest, EMPTY as empty, from, of, Subject} from 'rxjs';
import {catchError, filter, map, mergeMap, share, startWith, switchMap, tap} from 'rxjs/operators';

import {ConfigObject, Kind, Meta, Seed} from '../../commons/models/';
import {SearchService} from './search.service';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {RoleService} from '../../auth';
import {DetailDirective} from '../shared/detail.directive';

import {BackendService} from '../shared/backend.service';
import {ActivatedRoute} from '@angular/router';
import {ConfigRef} from '../../commons/models';
import {EntityDetailsComponent} from '../entities';
import {SeedDetailComponent} from '../seeds';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {FieldMask, ListRequest, UpdateRequest} from '../../../api';


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
  selectedEntity$ = this.selectedEntity.asObservable().pipe(
    share(),
    tap(() => this.selectedSeed = null)
  );
  selectedEntities: ConfigObject[] = [];

  selectedSeed: ConfigObject = null;
  selectedSeeds: ConfigObject[] = [];

  componentRef = null;

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
  @ViewChild(DetailDirective) detailHost: DetailDirective;

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
    this.kind = this.activatedRoute.snapshot.data.kind;

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
      this.data.next(reply.value);
      this.entityCount.next(reply.length);

      if (reply.value.length > 0 && this.searchTerm.value.length > 0) {
        if (reply.value.length === 1) {
          this.onSelectEntity(reply.value[0]);
        }
      } else if (this.searchTerm.value) {
        const newEntity = new ConfigObject({kind: Kind.CRAWLENTITY});
        newEntity.meta = new Meta({name: this.searchTerm.value});
        this.selectedEntity.next(newEntity);
      }
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
        listRequest.setQueryTemplate(configObject.toProto());
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
        listRequest.setQueryTemplate(configObject.toProto());
        return listRequest;

      }),
      mergeMap((request) => this.backendService.list(request)),
      map(configObjects => configObjects.map(ConfigObject.fromProto)),
    ).subscribe(
      (configObjects: ConfigObject[]) => this.seedData.next(configObjects),
      err => console.log(err));
  }

  loadSeedList() {
    this.seedData.next([]);
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

  loadEntityComponent(mergedEntities: ConfigObject) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EntityDetailsComponent);
    const viewContainerRef = this.entityDetailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as EntityDetailsComponent;
    const formControl = instance.form.controls;

    instance.configObject = mergedEntities;
    instance.data = false;
    instance.updateForm();


    instance.clear.subscribe(() => this.onClearEntity());
    if (!this.allEntitiesSelected) {
      instance.update.subscribe(
        (entityUpdate) => {
          const addLabel = instance.shouldAddLabel;
          this.onUpdateMultipleEntities(mergedEntities, entityUpdate, formControl, addLabel);
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

  loadSeedComponent(mergedSeeds: ConfigObject) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SeedDetailComponent);
    const viewContainerRef = this.seedDetailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as SeedDetailComponent;
    const formControl = instance.form.controls;
    instance.configObject = mergedSeeds;
    // instance.equalDisabled = equalDisabled;

    instance.data = false;
    instance.updateForm();
    instance.clear.subscribe(() => this.onClearSeed());

    if (!this.allSeedsSelected) {

      instance.update.subscribe((seedUpdate) => {
        const addLabel = instance.shouldAddLabel;
        const addCrawlJob = instance.shouldAddCrawlJob;
        this.onUpdateMultipleSeeds(mergedSeeds, seedUpdate, formControl, addLabel, addCrawlJob);
      });

      instance.delete.subscribe(() => this.onDeleteMultipleSeeds(this.selectedSeeds));
    }

    if (this.allSeedsSelected) {
      instance.update.subscribe((seedUpdate) => {
        const addLabel = instance.shouldAddLabel;
        const addCrawlJob = instance.shouldAddCrawlJob;
        this.onUpdateAllSeeds(seedUpdate, formControl, addLabel, addCrawlJob);
      });
    }
  }

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

  onSelectEntity(entity: ConfigObject) {
    this.selectedEntity.next(entity);
  }

  onSelectedEntityChange(entities: ConfigObject[]) {
    this.selectedEntities = entities;
    if (!this.entitySingleMode) {
      if (!this.allEntitiesSelected) {
        this.loadEntityComponent(ConfigObject.mergeConfigs(entities));
      } else {
        const entity = entities[0];
        entity.meta.name = 'update';
        entity.id = '1234567';
        this.loadEntityComponent(entity);
      }
    } else {
      this.selectedEntity.next(entities[0] || null);
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
    }
  }

  onSelectedSeedChange(seeds: ConfigObject[]) {
    this.selectedSeeds = seeds;
    if (!this.seedSingleMode) {
      if (!this.allSeedsSelected) {
        this.loadSeedComponent(ConfigObject.mergeConfigs(seeds));
      } else {
        const seed = seeds[0];
        seed.meta.name = 'update';
        seed.id = '1234567';
        this.loadSeedComponent(seed);
      }
    } else {
      this.selectedSeed = seeds[0] || null;
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
    }
  }

  onSaveEntity(configObject: ConfigObject) {
    this.backendService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.entityCount.next(this.entityCount.value + 1);
        this.selectedEntity.next(ConfigObject.fromProto(newConfig));
        this.searchTerm.next(this.searchTerm.value);
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
        const errorString = err.message.split(':')[1];
        const deleteError = /delete crawlEntity, there are/gm;
        if (deleteError.test(errorString)) {
          this.snackBarService.openSnackBar(errorString);
          return empty;
        }
        return empty;
      })
    )
      .subscribe((deletedEntity) => {
        this.entityCount.next(this.entityCount.value - 1);
        this.onClearEntity();
        this.snackBarService.openSnackBar('Entitet slettet');
        this.searchTerm.next(this.searchTerm.value);
      });
  }


  onSelectAllEntities(allSelected: boolean) {
    this.allEntitiesSelected = allSelected;
    if (allSelected) {
      this.onSelectedEntityChange([new ConfigObject({kind: Kind.CRAWLENTITY}), new ConfigObject({kind: Kind.CRAWLENTITY})]);
    } else {
      this.onSelectedEntityChange([]);
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


  onPageEntity(page: PageEvent) {
    this.entityPage.next(page);
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
      const configRef = new ConfigRef();
      configRef.kind = Kind.CRAWLENTITY;
      configRef.id = entityId;
      const configObject = new ConfigObject();
      const seed = new Seed();
      seed.entityRef = configRef;
      configObject.seed = seed;
      this.selectedSeed = configObject;
    } else {
      this.snackBarService.openSnackBar('Kan ikke lage ny seed før gjeldende entitet er lagret');
    }
  }

  onSaveSeed(configObject: ConfigObject): void {
    this.backendService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.seedCount.next(this.seedCount.value + 1);
        this.loadSeedList();
        this.selectedSeed = ConfigObject.fromProto(newConfig);
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Seed lagret');
      });

  }

  onUpdateSeed(configObject: ConfigObject): void {
    this.backendService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.loadSeedList();
        this.selectedSeed = ConfigObject.fromProto(newConfig);
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Seed oppdatert');
      });
  }

  onDeleteSeed(configObject: ConfigObject): void {
    this.backendService.delete(configObject.toProto())
      .subscribe(() => {
        this.seedCount.next(this.seedCount.value - 1);
        this.selectedSeed = null;
        this.loadSeedList();
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Seed slettet');
      });
  }

  onUpdateMultipleEntities(mergedEntity: ConfigObject, entityUpdate: ConfigObject, formControl: any, addLabel: boolean) {
    const numOfEntities = this.selectedEntities.length.toString();
    const updateRequest = new UpdateRequest();
    const updateMask = new FieldMask();
    const listRequest = new ListRequest();
    const updateTemplate = new ConfigObject();
    updateTemplate.meta = new Meta();
    const pathList = [];

    const ids = [];
    for (const entity of this.selectedEntities) {
      ids.push(entity.id);
    }
    listRequest.setIdList(ids);
    listRequest.setKind(Kind.CRAWLENTITY.valueOf());

    const meta = new Meta().createUpdateRequest(entityUpdate, formControl, mergedEntity, addLabel);
    updateTemplate.meta = meta.updateTemplate;
    if (meta.pathList.length !== 0) {
      pathList.push(meta.pathList);
    }

    updateMask.setPathsList(pathList);
    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(updateTemplate.toProto());
    updateRequest.setUpdateMask(updateMask);

    this.backendService.update(updateRequest)
      .subscribe(updatedEntities => {
        this.selectedEntities = [];
        this.onClearEntity();
        this.componentRef.destroy();
        this.searchTerm.next(this.searchTerm.value);
        this.snackBarService.openSnackBar(numOfEntities + ' entiteter er oppdatert');
      });
  }


  onUpdateMultipleSeeds(mergedSeeds: ConfigObject, seedUpdate: ConfigObject, formControl: any, addLabel: boolean, addCrawlJob: boolean) {
    const numOfSeeds = this.selectedSeeds.length.toString();
    const updateRequest = new UpdateRequest();
    const updateMask = new FieldMask();
    const listRequest = new ListRequest();
    const updateTemplate = new ConfigObject();
    updateTemplate.meta = new Meta();

    const pathList = [];

    const ids = [];
    for (const config of this.selectedSeeds) {
      ids.push(config.id);
    }

    listRequest.setIdList(ids);
    const seed = new Seed().createUpdateRequest(seedUpdate, formControl, mergedSeeds);
    updateTemplate.seed = seed.updateTemplate;
    listRequest.setKind(Kind.SEED.valueOf());
    if (seed.pathList.length !== 0) {
      pathList.push(...seed.pathList);
    }

    const meta = new Meta().createUpdateRequest(seedUpdate, formControl, mergedSeeds, addLabel);
    updateTemplate.meta = meta.updateTemplate;
    if (meta.pathList.length !== 0) {
      pathList.push(...meta.pathList);
    }

    updateMask.setPathsList(pathList);

    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(updateTemplate.toProto());
    updateRequest.setUpdateMask(updateMask);

    this.backendService.update(updateRequest)
      .subscribe(updatedSeeds => {
        this.selectedSeeds = [];
        this.onClearSeed();
        this.componentRef.destroy();
        this.seedChanges.next();
        this.snackBarService.openSnackBar(numOfSeeds + ' seeds er oppdatert');
      });
  }

  onDeleteMultipleEntities(entities: ConfigObject[]) {
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
            mergeMap((entity) => this.backendService.delete(entity.toProto())),
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

  onDeleteMultipleSeeds(seeds: ConfigObject[]) {
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
            mergeMap((seed) => this.backendService.delete(seed.toProto())),
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

  onUpdateAllEntities(configUpdate: ConfigObject, formControl: any, addLabels: boolean) {
    const updateRequest = new UpdateRequest();
    const updateMask = new FieldMask();
    const listRequest = new ListRequest();
    listRequest.setKind(Kind.CRAWLENTITY.valueOf());
    const updateTemplate = new ConfigObject();
    updateTemplate.meta = new Meta();

    const pathList = [];
    const meta = new Meta().createUpdateRequest(configUpdate, formControl, null, addLabels);
    updateTemplate.meta = meta.updateTemplate;
    if (meta.pathList.length !== 0) {
      pathList.push(...meta.pathList);
    }

    listRequest.setIdList([]);
    updateMask.setPathsList(pathList);

    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(updateTemplate.toProto());
    updateRequest.setUpdateMask(updateMask);

    this.backendService.update(updateRequest)
      .subscribe(updatedEntities => {
        this.selectedEntities = [];
        this.componentRef.destroy();
        this.searchTerm.next(this.searchTerm.value);
        this.snackBarService.openSnackBar('Alle entiteter er oppdatert');
      });
  }


  onUpdateAllSeeds(configUpdate: ConfigObject, formControl: any, addLabels: boolean, addCrawlJob: boolean) {
    const updateRequest = new UpdateRequest();
    const updateMask = new FieldMask();
    const listRequest = new ListRequest();
    listRequest.setKind(Kind.SEED.valueOf());
    const updateTemplate = new ConfigObject();
    updateTemplate.meta = new Meta();
    const pathList = [];

    const seed = new Seed().createUpdateRequest(configUpdate, formControl, null, addCrawlJob);
    updateTemplate.seed = seed.updateTemplate;
    if (seed.pathList.length !== 0) {
      pathList.push(...seed.pathList);
    }

    const meta = new Meta().createUpdateRequest(configUpdate, formControl, null, addLabels);
    updateTemplate.meta = meta.updateTemplate;
    if (meta.pathList.length !== 0) {
      pathList.push(...meta.pathList);
    }

    listRequest.setIdList([]);
    updateMask.setPathsList(pathList);

    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(updateTemplate.toProto());
    updateRequest.setUpdateMask(updateMask);

    this.backendService.update(updateRequest)
      .subscribe(() => {
        this.selectedSeeds = [];
        this.onClearSeed();
        this.componentRef.destroy();
        this.seedChanges.next();
        this.snackBarService.openSnackBar('Alle seeds er oppdatert');
      });
  }
}

