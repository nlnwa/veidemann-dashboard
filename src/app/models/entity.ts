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
  uri: string;
  scope: string;
  job_id: string;
}

export class Meta {
  name: string;
  description: string;
  created: string;
  created_by: string;
  last_modified: string;
  last_modified_by: string;
  labels: Label[];
}

export class Label {
  key: string;
  value: string;
}
