import {Meta} from "../models/meta";
/**
 * Created by kristiana on 11.05.17.
 */

export class Seeds {
  seed: Seed[];
  count: '';
  page_size: '';
  page: '';
}

export class Seed {
  id?: string;
  meta: Meta;
  entity_id: '';
  uri: '';
  scope: '';
  job_id: '';
}
