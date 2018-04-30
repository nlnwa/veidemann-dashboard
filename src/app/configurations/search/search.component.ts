import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {CrawlJob, Entity, Seed} from '../../commons/models/config.model';
import {SearchService} from './search.service';
import {SeedListComponent, SeedService} from '../seeds';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CrawlJobService} from '../crawljobs';
import {EntityService} from '../entities/';
import {SearchDatabase} from './search-database';
import {MatPaginator} from '@angular/material';
import {ListDatabase, ListDataSource} from '../../commons/list';
import {SearchDataSource, SearchListComponent} from './search-entity-list/search-entity-list.component';
import {RoleService} from '../../auth/role.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/buffer';
import {ActivatedRoute, Router} from '@angular/router';


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
              private snackBarService: SnackBarService,
              private roleService: RoleService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  ngOnInit() {
    // Load prerequisites for app-seed-detail
    if (this.canEdit) {
      this.crawlJobService.list()
        .map(reply => reply.value)
        .subscribe(crawlJobs => {
          this.crawlJobs = crawlJobs;
        });
    } else {
      this.crawlJobs = [];
    }
  }

  ngAfterViewInit() {
    this.searchDatabase.paginator = this.paginator;
    const id = this.route.snapshot.params['id'];

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
          if (id) {
            const index = items.findIndex((item) => item.id === id);
            if (index >= 0) {
              this.entityList.onRowClick(items[index])
            }
          } else {
            this.entityList.onRowClick(items[0]);
          }
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
    this.seedService.search({entity_id: entity.id})
      .map(reply => reply.value || [])
      .subscribe(seeds => {
        this.seedDatabase.items = seeds;

        if (seeds.length) {
          let seedId = this.route.snapshot.params['seedId'];
          const index = seeds.findIndex((item) => item.id === seedId);
          if (index >= 0) {
            this.seedList.onRowClick(seeds[index])
          } else {
            seedId = seeds[0].id
            this.seedList.onRowClick(seeds[0]);
          }
          this.router.navigate(['search', {id: entity.id, seedId}]);
        } else {
          this.router.navigate(['search', {id: entity.id}]);
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
      .catch((err) => {
        const errorString = err.error.error.split(':')[1];
        const deleteError = /delete CrawlEntity, there are/g;
        if (errorString.match(deleteError)) {
          this.snackBarService.openSnackBar(errorString);
          return Observable.empty();
        }
        return Observable.empty();
      })
      .subscribe((deletedEntity) => {
        this.selectedEntity = null;
        this.snackBarService.openSnackBar('Slettet');
        this.searchTerm.next(this.searchTerm.value);
      });
  }

  onSelectSeed(seed: Seed) {
    this.selectedSeed = seed;
    this.router.navigate(['search', {id: this.selectedEntity.id, seedId: seed.id}]);
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
        this.onSelectSeed(seed);
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
        this.selectedSeed = null;
        this.seedDatabase.remove(seed);
        this.snackBarService.openSnackBar('Slettet');
        // Update seed list of entity associated with deleted seed
        this.onSelectEntity(this.selectedEntity);
      });
  }
}


