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
import {MatDialog} from '@angular/material';
import {Title} from '@angular/platform-browser';
import {switchMap, takeUntil} from 'rxjs/operators';
import {ConfigObject, ConfigRef, CrawlJob, Kind, Meta, Seed} from '../../../commons/models';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SeedDataService, SearchDataService, {provide: DataService, useExisting: SearchDataService}]
})

export class EventSearchComponent extends SearchComponent implements OnInit {

  @Input()
    discoveredUri: string;

  @Output()
    seedCreated = new EventEmitter<ConfigObject>();

  @ViewChild('entityDetails') entityDetails: ElementRef;
  @ViewChild('seedDetails') seedDetails: ElementRef;

  seedObject: ConfigObject;
  configRef: ConfigRef;
  crawlJobs: CrawlJob[];

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

    super(seedDataService, snackBarService, errorService, activatedRoute,
      componentFactoryResolver, router, dialog, dataService, titleService, authService);
  }

  ngOnInit() {
    this.crawlJobs = this.route.snapshot.data.options.crawlJobs;

    this.searchTerm$.pipe(
      switchMap((term: string) => this.dataService.search(term)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {

    }, (error) => this.errorService.dispatch(error));
  }

  onSearch(term: string) {
    this.searchTerm.next(term);
  }

  onSelectConfig(configObject: ConfigObject) {
    this.configRef = new ConfigRef({kind: configObject.kind, id: configObject.id});
    this.configObject.next(configObject);
    setTimeout(() => this.seedDetails.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1);
  }

  onCreateEntity() {
    this.configObject.next(new ConfigObject({kind: Kind.CRAWLENTITY}));
    setTimeout(() => this.seedDetails.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1);
  }

  onCreateSeed() {
    const meta = new Meta({name: this.discoveredUri});
    const seed = new Seed({entityRef: this.configRef});
    this.seedObject = new ConfigObject({kind: Kind.SEED, meta, seed});
    setTimeout(() => this.seedDetails.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1);
  }

  onSaveEntity(configObject: ConfigObject) {
    this.dataService.save(configObject).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newEntity => {
        this.configRef = new ConfigRef({kind: newEntity.kind, id: newEntity.id});
        this.configObject.next(newEntity);
      });
  }

  onSaveSeed(configObject: ConfigObject) {
    this.dataService.save(configObject).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newSeed => {
        this.seedCreated.emit(newSeed);
        this.seedObject = newSeed;
        this.snackBarService.openSnackBar('Seed Lagret');
      });
  }

}

