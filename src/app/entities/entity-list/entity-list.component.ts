import {Component, OnInit} from "@angular/core";
import {Entity, EntityService} from "../";

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  entities: Entity[];
  selectedEntity: Entity;

  constructor(private entityService: EntityService) {
  }

  ngOnInit() {
    this.entityService.getEntities().subscribe(entities => {
      this.entities = entities.value
    });
  }


  private getIndexOfEntity = (entityId: String) => {
    return this.entities.findIndex((entity) => {
      return entity.id === entityId;
    });
  };

  selectEntity(entity: Entity) {
    this.selectedEntity = entity
  }


  createNewEntity() {
    const entity: Entity = {
      id: '',
      meta: {
        name: '',
        description: '',
        label: [],
        created: {seconds: null},
        last_modified: {seconds: null}
      }
    };


    // By default, a newly-created  will have the selected state.
    this.selectEntity(entity);
  }

  deleteEntity = (entity: String) => {
    const idx = this.getIndexOfEntity(entity);
    if (idx !== -1) {
      this.entities.splice(idx, 1);
      this.selectEntity(null);
    }
    return this.entities
  };

  addEntity = (entity: Entity) => {
    this.entities.push(entity);
    this.selectEntity(entity);
    return this.entities;
  };

  updateEntity = (entity: Entity) => {
    const idx = this.getIndexOfEntity(entity.id);
    if (idx !== -1) {
      this.entities[idx] = entity;
      this.selectEntity(entity);
    }
    return this.entities;
  }
}

