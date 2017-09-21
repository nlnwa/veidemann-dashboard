import {Meta} from '../../commons/models/meta';

export class Politenessconfigs {
  // value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class Politenessconfig {
  id?: string;
  meta: Meta;
  robots_policy: string;
  minimum_robots_validity_duration_s?: number;
  custom_robots: string;
  min_time_between_page_load_ms?: number;
}
