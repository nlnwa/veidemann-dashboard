import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {CrawlJob, Entity, Seed} from '../../commons/models/config.model';
import {SearchService} from './search.service';
import {SeedListComponent, SeedService} from '../seeds';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import 'rxjs/add/operator/finally';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CrawlJobService} from '../crawljobs';
import {EntityService} from '../entities/';
import {SearchDatabase} from './search-database';
import {MatPaginator} from '@angular/material';
import {ListDatabase, ListDataSource} from '../../commons/list';
import {SearchDataSource, SearchListComponent} from './search-entity-list/search-entity-list.component';
import 'rxjs/add/operator/buffer';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
    SearchDataSource,
    SearchDatabase,
    ListDataSource,
    ListDatabase,
  ],
})
export class SearchComponent implements OnInit, AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  selectedEntity: Entity = null;
  selectedSeed: Seed = null;
  crawlJobs: CrawlJob[];
  @ViewChild(SeedListComponent) private seedList;
  @ViewChild(SearchListComponent) private entityList;
  @ViewChild(MatPaginator) private paginator;
  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private searchService: SearchService,
              private seedService: SeedService,
              private crawlJobService: CrawlJobService,
              private entityService: EntityService,
              private searchDatabase: SearchDatabase,
              private seedDatabase: ListDatabase,
              private snackBarService: SnackBarService) {}

  ngOnInit() {
    // Load prerequisites for app-seed-detail
    this.crawlJobService.list()
      .map(reply => reply.value)
      .subscribe(crawlJobs => this.crawlJobs = crawlJobs);
  }

  ngAfterViewInit() {
    this.searchDatabase.paginator = this.paginator;

    this.searchTerm
      .do(() => {
        this.selectedEntity = null;
        this.selectedSeed = null;
        // this.searchDatabase.clear();
        this.seedDatabase.clear();
      })
      .switchMap((term: string) => this.searchService.search(term))
      .buffer(this.searchService.searchCompleted$)
      .subscribe((items) => {
        this.paginator.length = items.length;
        this.searchDatabase.data = items;
        if (items.length > 0) {
          this.entityList.onRowClick(items[0]);
        } else if (this.searchTerm.value) {
          this.selectedEntity = new Entity(this.searchTerm.value);
        }
      });
  }

  onEnterKey(event) {
    this.searchTerm.next(event.target.value);
  }

  onCreateEntity() {
    this.selectedEntity = new Entity();
    this.selectedSeed = null;
    this.seedDatabase.clear();
    this.entityList.clearSelection();
  }

  onSelectEntity(entity: Entity) {
    this.selectedEntity = entity;
    this.selectedSeed = null;

    let isFirstHit = true;
    this.seedService.search({entity_id: entity.id})
      .map(reply => reply.value)
      .do(() => isFirstHit = true)
      .subscribe(seeds => {
        this.seedDatabase.items = seeds;
        if (isFirstHit && seeds.length) {
          this.seedList.onRowClick(seeds[0]);
          isFirstHit = false;
        }
      });
  }

  onSaveEntity(entity: Entity) {
    this.entityService.create(entity)
      .subscribe((newEntity: Entity) => {
        this.selectedEntity = newEntity;
        this.snackBarService.openSnackBar('Lagret');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onUpdateEntity(entity: Entity) {
    this.entityService.update(entity)
      .subscribe((updatedEntity: Entity) => {
        this.selectedEntity = updatedEntity;
        this.snackBarService.openSnackBar('Oppdatert');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onDeleteEntity(entity: Entity): void {
    this.entityService.delete(entity.id)
      .subscribe((deletedEntity) => {
        this.selectedEntity = deletedEntity;
        this.snackBarService.openSnackBar('Slettet');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onSelectSeed(seed: Seed) {
    this.selectedSeed = seed;
  }

  onCreateSeed(entityId: string) {
    this.seedList.clearSelection();
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
        this.seedDatabase.add(createdSeed);
        this.snackBarService.openSnackBar('Lagret');
      });

  }

  onUpdateSeed(seed: Seed): void {
    this.seedService.update(seed)
      .subscribe((updatedSeed) => {
        this.selectedSeed = updatedSeed;
        this.seedDatabase.update(updatedSeed);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onDeleteSeed(seed: Seed): void {
    this.seedService.delete(seed.id)
      .subscribe((deletedSeed) => {
        this.selectedSeed = deletedSeed;
        this.seedDatabase.remove(seed);
        this.snackBarService.openSnackBar('Slettet');
        // Update seed list of entity associated with deleted seed
        this.onSelectEntity(this.selectedEntity);
      });
  }
}


