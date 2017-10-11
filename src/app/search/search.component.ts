import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {Entity, Seed} from '../commons/models/config.model';
import {SearchService} from '../search-service/search.service';
import {BaseListComponent} from '../base-list/base-list.component';
import {EntityDetailsComponent} from '../entities/entity-details/entity-details.component';
import {SearchText} from './search-text/search-text';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchText]
})
export class SearchComponent implements OnInit {
  @ViewChild(BaseListComponent)
  set list(listComponent: BaseListComponent) {
    setTimeout(() => this.listComponent = listComponent, 0);
  }

  @ViewChild(EntityDetailsComponent)
  set entityDetails(entityDetailsComponent: EntityDetailsComponent) {
    setTimeout(() => this.entityDetailsComponent = entityDetailsComponent, 0);
  };

  private entityDetailsComponent: EntityDetailsComponent;
  private listComponent: BaseListComponent;
  private searchTerm: Subject<string> = new Subject<string>();
  selectedEntity: Entity = null;
  selectedSeed: Seed = null;

  constructor(private searchService: SearchService, public searchText: SearchText) {}

  ngOnInit() {
    this.searchTerm
      // .distinctUntilChanged()
      .do(() => this.listComponent.reset())
      .switchMap((entity) => this.searchService.search(entity))
      .subscribe((entity) => this.listComponent.addItem(entity));
  }

  onEnterKey(event) {
    this.searchTerm.next(event.target.value);
  }

  onCreateEntity() {
    this.selectedEntity = new Entity();
    this.selectedSeed = null;
  }

  onSelectEntity(entity: Entity) {
    this.selectedEntity = entity;
  }

  onSelectSeed(seed: Seed) {
    this.selectedSeed = seed;
  }

  onCreateSeed(entityId: string) {
    this.selectedSeed = new Seed(entityId);
  }

  onSeedCreated(seed: Seed) {
    this.entityDetailsComponent.addSeed(seed);
  }

  onSeedDeleted(seed: Seed) {
    this.entityDetailsComponent.removeSeed(seed);
  }
}


