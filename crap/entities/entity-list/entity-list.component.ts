import { Component, OnInit } from '@angular/core';
import { Value } from '../entity';
import { EntityService } from '../entity.service';
import { EntityDetailsComponent } from '../entity-details/entity-details.component';

@Component({
  selector: 'entities',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
  providers: [EntityService]
})

export class EntityListComponent implements OnInit {

  entities: any = [];
  selectedEntity: Value;
  constructor(private entityService: EntityService) { }

  ngOnInit() {this.entityService.getAllEntities().subscribe(entities => {this.entities = entities})  }

  private getIndexOfEntity = (entityId: String) => {
    return this.entities.entity.findIndex((entity) => {
      return entity.id === entityId;
    });
  };

  selectEntity(entity: Value) {
    this.selectedEntity = entity
  }

  deleteEntity = (entityId: String) => {
    const idx = this.getIndexOfEntity(entityId);
    if (idx !== -1) {
      this.entities.entity.splice(idx, 1);
      this.selectEntity(null);
    }
    return this.entities.entity;
  };

  addEntity = (entity: Value) => {
    this.entities.entity.push(entity);
    this.selectEntity(entity);
    return this.entities.entity;
  };

  updateEntity = (entity: Value) => {
    const idx = this.getIndexOfEntity(entity.id);
    if (idx !== -1) {
      this.entities.entity[idx] = entity;
      this.selectEntity(entity);
    }
    return this.entities.entity;
  }
}
