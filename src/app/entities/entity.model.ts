import {Meta} from '../commons/models/meta.model';

export class Entities {
  value: Entity[];
  count: number;
  page_size: string;
  page: string;
}

export class Entity {
  id: string;
  meta: Meta;
}

