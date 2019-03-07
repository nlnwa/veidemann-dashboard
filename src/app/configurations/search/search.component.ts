import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {BehaviorSubject, EMPTY as empty, from, of, Subject} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {ConfigObject, ConfigRef, Kind, Seed} from '../../commons/models/';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {RoleService} from '../../auth';
import {ActivatedRoute} from '@angular/router';
import {SearchDataService} from '../shared/search-data.service';
import {SeedDetailComponent} from '../seeds';
import {EntityDetailsComponent} from '../entities';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {DataService} from '../shared/data.service';
import {DetailDirective} from '../shared/detail.directive';
import {ConfigurationsComponent} from '../configurations.component';
import {ErrorService} from '../../error';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchDataService, DataService]
})

export class SearchComponent extends ConfigurationsComponent implements OnInit {

  selectedEntity: Subject<ConfigObject> = new Subject<ConfigObject>();
  selectedEntity$ = this.selectedEntity.asObservable();
  selectedEntities: ConfigObject[] = [];

  selectedSeed: Subject<ConfigObject> = new Subject<ConfigObject>();
  selectedSeed$ = this.selectedSeed.asObservable();
  selectedSeeds: ConfigObject[] = [];

  allSeedsSelected = false;
  allEntitiesSelected = false;

  entityCount = new BehaviorSubject<number>(0);
  entityCount$ = this.entityCount.asObservable();

  seedCount = new BehaviorSubject<number>(0);
  seedCount$ = this.seedCount.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  private searchTerm: Subject<string> = new Subject<string>();
  searchTerm$ = this.searchTerm.asObservable();

  constructor(
    private seedDataService: DataService,
    protected snackBarService: SnackBarService,
    protected errorService: ErrorService,
    protected activatedRoute: ActivatedRoute,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected dialog: MatDialog,
    private searchDataService: SearchDataService,
    public titleService: Title,
    private roleService: RoleService) {
    super(seedDataService, snackBarService, errorService, componentFactoryResolver, titleService, dialog, activatedRoute);
    this.seedDataService.kind = Kind.SEED;
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
    this.searchTerm$.pipe(switchMap((term: string) => this.searchDataService.search(term))).subscribe();
  }

  onEnterKey(event) {
    this.selectedEntity.next(null);
    this.selectedEntities = [];
    this.selectedSeed.next(null);
    this.selectedSeeds = [];
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.searchTerm.next(event.target.value);
  }

  onSelectEntity(entity: ConfigObject) {
    this.selectedEntity.next(entity);
  }


  onSelectAllEntities() {
    this.allEntitiesSelected = true;
    const configObject = new ConfigObject({id: '1234567', kind: Kind.CRAWLENTITY});
    configObject.meta.name = 'update';
    this.loadEntityComponent({configObject});
  }


  onSelectedEntityChange(entities: ConfigObject[]) {
    this.selectedEntities = entities;

    if (!this.entitySingleMode) {
      const configObject = ConfigObject.mergeConfigs(entities);
      this.loadEntityComponent({configObject});
    } else {
      this.destroyComponent();
    }
  }


  onSelectSeed(seed: ConfigObject) {
    this.selectedSeed.next(seed);
  }

  onSelectedSeedChange(seeds: ConfigObject[]) {
    this.selectedSeeds = seeds;

    if (!this.seedSingleMode) {
      const configObject = ConfigObject.mergeConfigs(seeds);
      this.loadSeedComponent({configObject});
    } else {
      this.destroyComponent();
    }
  }


  onSelectAllSeeds(allSelected: boolean) {
    this.allSeedsSelected = allSelected;
    const configObject = new ConfigObject({id: '1234567', kind: Kind.SEED});
    configObject.meta.name = 'update';
    this.loadSeedComponent({configObject});
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
    this.searchDataService.save(configObject)
      .subscribe(newConfig => {
        this.entityCount.next(this.entityCount.value + 1);
        this.selectedEntity.next(newConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateEntity(configObject: ConfigObject) {
    this.searchDataService.update(configObject)
      .subscribe(newConfig => {
        this.selectedEntity.next(newConfig);
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteEntity(configObject: ConfigObject): void {
    this.searchDataService.delete(configObject).pipe(
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
        this.selectedEntity.next(null);
        this.snackBarService.openSnackBar('Entitet slettet');
      });
  }


  onClearSeed(): void {
    this.selectedSeed.next(null);
    if (!this.seedSingleMode) {
      this.selectedSeeds = [];
      this.componentRef.destroy();
      if (this.allSeedsSelected) {
        this.allSeedsSelected = false;
      }
    }
  }

  onCreateSeed(entity: ConfigObject) {
    if (entity.id) {
      const entityRef = new ConfigRef({kind: Kind.CRAWLENTITY, id: entity.id});
      const seed = new Seed({entityRef});
      this.selectedSeed.next(new ConfigObject({kind: Kind.SEED, seed}));
    } else {
      this.snackBarService.openSnackBar('Kan ikke lage ny seed før gjeldende entitet er lagret');
    }
  }

  onSaveSeed(configObject: ConfigObject): void {
    this.seedDataService.save(configObject)
      .subscribe(newConfig => {
        this.selectedSeed.next(newConfig);
        this.snackBarService.openSnackBar('Seed lagret');
      });

  }

  onUpdateSeed(configObject: ConfigObject): void {
    this.seedDataService.save(configObject)
      .subscribe(newConfig => {
        this.selectedSeed.next(newConfig);
        this.snackBarService.openSnackBar('Seed oppdatert');
      });
  }

  onDeleteSeed(configObject: ConfigObject): void {
    this.seedDataService.delete(configObject)
      .subscribe(() => {
        this.selectedSeed.next(null);
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
        this.snackBarService.openSnackBar(updatedEntities + ' entiteter ble oppdatert');
      });
  }


  onUpdateSelectedSeeds(mergedSeeds: ConfigObject, seedUpdate: ConfigObject, formControl: any, options: any) {
    const {updateTemplate, pathList} = ConfigObject.createUpdateRequest(seedUpdate, formControl, mergedSeeds, options);

    this.seedDataService.updateWithTemplate(updateTemplate, pathList, this.selectedSeeds.map(config => config.id))
      .subscribe(updatedSeeds => {
        this.selectedSeeds = [];
        this.onClearSeed();
        this.componentRef.destroy();
        this.snackBarService.openSnackBar(updatedSeeds + ' seeds er oppdatert');
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
            mergeMap((entity) => this.searchDataService.delete(entity)),
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
            this.selectedEntities = [];
            this.componentRef.destroy();
            this.onClearEntity();
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
            mergeMap((seed) => this.seedDataService.delete(seed)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedSeeds = [];
            this.componentRef.destroy();
            this.onClearSeed();
            this.selectedSeed.next(null);
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
}

