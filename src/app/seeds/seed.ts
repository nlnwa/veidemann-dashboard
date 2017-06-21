/**
 * Created by kristiana on 16.05.17.
 */

export class Seeds {
  //value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class Seed {
  id?: string;
  meta: Meta;
  entity_id: string;
  scope: Scope;
  job_id: Job_id[];
}

export class Meta {
  name: string;
  description: string;
  created: Created;
  created_by: string;
  last_modified: Last_modified;
  last_modified_by: string;
  label: Label[];
}

export class Label {
  key: string;
  value: string;
}

export class Scope {
  surt_prefix: string;
}

export class Last_modified {
  seconds: number;
  nanos: number;
}

export class Created {
  seconds: number;
  nanos: number;
}

export class Job_id {
  string;
}
