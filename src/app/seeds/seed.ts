import {Meta} from "../commons/models/meta";
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


export class Scope {
  surt_prefix: string;
}

export class Job_id {
  string;
}
