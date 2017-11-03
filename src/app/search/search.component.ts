import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {Entity, Seed} from '../commons/models/config.model';
import {SearchService} from '../search-service/search.service';
import {EntityDatabase, EntityListComponent} from '../entities/entity-list/entity-list.component';
import {SeedDatabase, SeedListComponent} from '../seeds/seed-list/seed-list.component';
import {SeedService} from '../seeds/seeds.service';
import {SnackBarService} from '../snack-bar-service/snack-bar.service';
import 'rxjs/add/operator/finally';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Item} from '../commons/list/list-database';
import {SearchDatabase} from './search-database';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [{provide: EntityDatabase, useClass: SearchDatabase}, SeedDatabase],
})
export class SearchComponent implements OnInit, OnDestroy {
  selectedEntity: Entity = null;
  selectedSeed: Seed = null;
  @ViewChild(SeedListComponent) private seedList;
  @ViewChild(EntityListComponent) private entityList;
  private searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private completedSubscription: Subscription;
  private items: Item[] = [];

  constructor(private searchService: SearchService,
              private seedService: SeedService,
              private entityDatabase: EntityDatabase,
              private seedDatabase: SeedDatabase,
              private snackBarService: SnackBarService) {}

  ngOnInit() {
    this.completedSubscription = this.searchService.completed$.subscribe(() => {
      if (this.items.length < 1) {
        this.selectedEntity = new Entity(this.searchTerm.value);
      } else {
        this.entityDatabase.items = this.items;
        this.entityList.onRowClick(this.items[0]);
        this.items = [];
      }
    });

    this.searchTerm
      .do(() => {
        this.selectedEntity = null;
        this.selectedSeed = null;
        this.entityDatabase.clear();
        this.seedDatabase.clear();
      })
      .switchMap((term: string) => this.searchService.search(term))
      .subscribe((item) => {
        this.items.push(item)
      });
  }

  ngOnDestroy() {
    this.completedSubscription.unsubscribe();
  }

  onEnterKey(event) {
    this.searchTerm.next(event.target.value);
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

  onCreateEntity() {
    this.selectedEntity = new Entity();
    this.selectedSeed = null;
    this.seedDatabase.clear();
    this.entityList.clearSelection();
  }

  onEntityCreated(entity) {
    this.selectedEntity = entity;
    // noop
  }

  onEntityUpdated(entity) {
    this.entityDatabase.update(entity);
  }

  onEntityDeleted(entity) {
    this.entityDatabase.remove(entity);
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

  onSeedCreated(seed: Seed) {
    this.seedDatabase.add(seed);
  }

  onSeedUpdated(seed: Seed) {
    this.seedDatabase.update(seed);
  }

  onSeedDeleted(seed: Seed) {
    this.seedDatabase.remove(seed);
  }
}


