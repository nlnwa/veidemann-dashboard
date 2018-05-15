import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material';

import {BehaviorSubject, combineLatest, EMPTY as empty} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {CrawlJob, Entity, Seed} from '../../commons/models/config.model';
import {SearchReply, SearchService} from './search.service';
import {SeedListComponent, SeedService} from '../seeds';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlJobService} from '../crawljobs';
import {EntityService} from '../entities/';
import {SearchDatabase} from './search-database';
import {ListDatabase, ListDataSource} from '../../commons/list';
import {SearchDataSource, SearchListComponent} from './search-entity-list/search-entity-list.component';
import {RoleService} from '../../auth';


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
  pageOptions = [5, 10, 50, 100];

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
    this.selectedEntity = new Entity(entity);
    this.selectedSeed = null;
    this.seedService.search({entity_id: entity.id})
      .pipe(map(reply => reply.value || []))
      .subscribe((seeds) => {
        this.seedDatabase.items = seeds;
        if (seeds.length > 0) {
          /*let seedId = this.route.snapshot.params['seedId'];
          const index = seeds.findIndex((item) => item.id === seedId);
          if (index >= 0) {
            this.seedList.onRowClick(seeds[index]);
          } else {
            seedId = seeds[0].id;

          }
          */
          // this.router.navigate(['search', {id: entity.id, seedId}]);
          this.seedList.onRowClick(seeds[0]);
        } else {
          // this.router.navigate(['search', {id: entity.id}]);
        }
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
//    this.router.navigate(['search', {id: this.selectedEntity.id, seedId: seed.id}]);
  }

  onCreateSeed(entityId: string) {
    this.seedList.clearSelection();
    if (entityId) {
      this.selectedSeed = new Seed({entityId});
    } else {
      this.snackBarService.openSnackBar('Kan ikke lage ny seed før gjeldende entitet er lagret');
    }
  }

  onSaveSeed(seed: Seed): void {
    this.seedService.create(seed)
      .subscribe((createdSeed) => {
        this.selectedSeed = createdSeed;
        this.seedDatabase.add(createdSeed);
        this.snackBarService.openSnackBar('Seed lagret');
      });

  }

  onUpdateSeed(seed: Seed): void {
    this.seedService.update(seed)
      .subscribe((updatedSeed) => {
        this.selectedSeed = updatedSeed;
        this.seedDatabase.update(updatedSeed);
        this.snackBarService.openSnackBar('Seed er oppdatert');
      });
  }

  onDeleteSeed(seed: Seed): void {
    this.seedService.delete(seed.id)
      .subscribe((deletedSeed) => {
        this.selectedSeed = null;
        this.seedDatabase.remove(seed);
        this.snackBarService.openSnackBar('Seed er slettet');
        // Update seed list of entity associated with deleted seed
        this.onSelectEntity(this.selectedEntity);
      });
  }

  onClearSeed(): void {
    this.selectedSeed = null;
    this.seedList.clearSelection();
  }
}
