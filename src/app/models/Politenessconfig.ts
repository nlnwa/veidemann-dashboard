/**
 * Created by kristiana on 08.06.17.
 */

export class PolitenessConfigs {
  //value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class PolitenessConfig {
  id?: string;
  meta: Meta;
  robots_policy?: string;
  minimum_robots_validity_duration_s?: number;
  custom_robots: string;
  min_time_between_page_load_ms?: string;
}

export class Meta {
  name: string;
  description: string;
  created?: string;
  created_by?: string;
  last_modified?: string;
  last_modified_by?: string;
  label?: Label[];
}

export class Label {
  key: string;
  value: string;
}
