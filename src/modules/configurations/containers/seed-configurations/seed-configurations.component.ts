import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';

import {ErrorService, SnackBarService} from '../../../core';
import {ConfigObject, Kind, Meta} from '../../../commons/models';
import {ReferrerError} from '../../../commons';
import {ConfigurationsComponent} from '..';
import {SeedConfigurationService} from '../../services/seed-configuration.service';
import {LabelService} from '../../services/label.service';

@Component({
  selector: 'app-seed-configurations',
  templateUrl: './seed-configurations.component.html',
  styleUrls: ['./seed-configurations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LabelService]
})
export class SeedConfigurationsComponent extends ConfigurationsComponent implements OnInit, OnChanges {

  @Input()
  entityRef;

  @Output()
  invalidate: EventEmitter<void> = new EventEmitter();

  constructor(protected configurationsService: SeedConfigurationService,
              protected snackBarService: SnackBarService,
              protected errorService: ErrorService,
              protected componentFactoryResolver: ComponentFactoryResolver,
              protected router: Router,
              protected titleService: Title,
              protected dialog: MatDialog,
              protected route: ActivatedRoute,
              protected labelService: LabelService) {
    super(configurationsService, snackBarService, errorService, componentFactoryResolver, router,
      titleService, dialog, route, labelService);

    this.kind = Kind.SEED;
    this.labelService.kind = this.kind;
  }

  ngOnInit() {
    this.options = this.route.snapshot.data.options;

    this.titleService.setTitle('Veidemann | ' + ConfigurationsComponent.getTitle(this.kind));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entityRef) {
      this.reset();
    }
  }

  onSelectedChange(configs: ConfigObject[]) {
    this.selectedConfigs = configs;
    this.isAllSelected = false;

    if (!this.singleMode) {
      this.loadComponent({configObject: ConfigObject.mergeConfigs(configs)});
    } else {
      this.destroyComponent();
    }
  }

  onSelectConfig(configObject: ConfigObject) {
    this.configObject.next(configObject);
  }

  onCreateConfig(newConfigObject?: ConfigObject): void {
    this.reset();
    const configObject = newConfigObject || new ConfigObject({kind: this.kind});
    configObject.seed.entityRef = this.entityRef;
    this.configObject.next(configObject);
  }

  onDeleteConfig(configObject: ConfigObject) {
    this.configurationsService.delete(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.reset();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onMove(configObject: ConfigObject | ConfigObject[]) {
    const observable = Array.isArray(configObject)
      ? this.configurationsService.moveMultiple(configObject)
      : this.configurationsService.move(configObject);
    observable.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(updated => {
        this.invalidate.emit();
        this.configurationsService.reload();
        this.snackBarService.openSnackBar(updated + 'seed(s) flyttet');
      });
  }

  onSaveSeeds({seeds = [], configObject: template = new ConfigObject()}) {
    const configObjects = seeds.map(
      seed => Object.assign({...template}, {
        meta: new Meta({
          name: seed,
          description: template.meta.description,
          labelList: template.meta.labelList
        })
      }));

    this.configurationsService.saveMultiple(configObjects).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      },
      (error) => this.errorService.dispatch(error),
      () => {
        this.reset();
        this.snackBarService.openSnackBar(configObjects.length + ' seeds ble lagret');
      });
  }

  protected onDeletedSelectedConfigs(numConfigs: number, numDeleted: number) {
    if (numConfigs !== numDeleted) {
      this.errorService.dispatch(new ReferrerError({numConfigs, numDeleted}));
    }
    this.reset();
    this.snackBarService.openSnackBar(numConfigs + ' konfigurasjoner slettet');
  }

  protected onUpdatedConfigs(updatedConfigs: ConfigObject[]) {
    this.reset();
    this.configurationsService.reload();
    if (!this.isAllSelected) {
      this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner oppdatert');
    } else {
      this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner av typen ' + Kind[this.kind.valueOf()] + ' ble oppdatert');
    }
  }
}




