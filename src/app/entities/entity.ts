import {Meta} from '../commons/models/meta';

export class Entities {
  Entity: Entity[];
  count: number;
  page_size: string;
  page: string;
}

export class Entity {
  id: string;
  meta: Meta;
}

