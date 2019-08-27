import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {SearchComponent} from '../../../configurations/containers';
import {AuthService, ErrorService, SnackBarService} from '../../../core/services';
import {DataService, SearchDataService, SeedDataService} from '../../../configurations/services';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {switchMap, takeUntil} from 'rxjs/operators';
import {ConfigObject, ConfigRef, CrawlJob, Kind, Meta, Seed} from '../../../commons/models';
import {SearchConfigurationService} from '../../../configurations/services/search-configuration.service';
import {LabelService} from '../../../configurations/services/label.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SeedDataService,
    SearchDataService,
    {provide: DataService, useExisting: SearchDataService},
    LabelService,
    SearchConfigurationService
  ]
})

export class EventSearchComponent extends SearchComponent implements OnInit {

  @Input()
  discoveredUri: string;

  @Output()
  seedCreated = new EventEmitter<ConfigObject>();

  @ViewChild('entityDetails', {static: false}) entityDetails: ElementRef;
  @ViewChild('seedDetails', {static: false}) seedDetails: ElementRef;

  seedObject: ConfigObject;
  crawlJobs: ConfigObject[];

  constructor(
    protected seedDataService: SeedDataService,
    protected snackBarService: SnackBarService,
    protected errorService: ErrorService,
    protected route: ActivatedRoute,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected router: Router,
    protected dialog: MatDialog,
    protected searchService: SearchConfigurationService,
    public titleService: Title,
    protected authService: AuthService,
    protected labelService: LabelService) {

    super(snackBarService, errorService, route,
      componentFactoryResolver, router, dialog, searchService, titleService, authService, labelService);
  }

  ngOnInit() {
    this.crawlJobs = this.route.snapshot.data.options.crawlJobs;

    this.searchTerm$.pipe(
      switchMap((term: string) => this.searchService.search(term)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      },
      (error) => this.errorService.dispatch(error));
  }

  onSearch(term: string) {
    this.searchTerm.next(term);
  }

  onSelectConfig(configObject: ConfigObject) {
    if (configObject) {
      const entityRef = new ConfigRef({kind: configObject.kind, id: configObject.id});
      this.onCreateSeed(entityRef);
    } else {
      this.seedObject = null;
    }
    this.configObject.next(configObject);
  }

  onCreateEntity() {
    this.seedObject = null;
    super.onCreateConfig();
  }

  onCreateSeed(entityRef: ConfigRef) {
    const meta = new Meta({name: this.discoveredUri});
    const seed = new Seed({entityRef});
    this.seedObject = new ConfigObject({kind: Kind.SEED, meta, seed});
  }

  onSaveEntity(configObject: ConfigObject) {
    this.searchService.save(configObject).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newEntity => {
        const entityRef = new ConfigRef({kind: newEntity.kind, id: newEntity.id});
        this.configObject.next(newEntity);
        this.onCreateSeed(entityRef);
      });
  }

  onSaveSeed(configObject: ConfigObject) {
    this.seedDataService.save(configObject).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newSeed => {
        this.seedCreated.emit(newSeed);
        this.seedObject = newSeed;
        this.snackBarService.openSnackBar('Seed Lagret');
      });
  }

}

