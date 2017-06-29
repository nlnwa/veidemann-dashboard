import {Meta} from "./meta";
export class Entities {
  Entity: Entity[];
  count: number;
  page_size: string;
  page: string;
}

export class Entity {
  id?: string;
  meta: Meta;
  entity_id: string;
  scope: string;
  job_id: string;
}

