import {Meta} from '../commons/models/meta.model';

export class Seed {
  id?: string;
  meta: Meta;
  entity_id: string;
  scope: Scope;
  job_id: string[];
}

export class Scope {
  surt_prefix: string;
}

