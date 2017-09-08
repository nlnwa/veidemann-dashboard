import {Meta} from "../commons/models/meta";

export class Seeds {
  value: Seed[];
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


export class Scope {
  surt_prefix: string;
}

export class Job_id {
  string;
}
