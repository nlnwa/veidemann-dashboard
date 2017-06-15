/**
 * Created by kristiana on 18.05.17.
 */
export class CrawlJobs {
  //value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class Crawljob {
  schedule_config_or_id?: string;
  crawl_config_or_id?: string;
  id?: string;
  meta: Meta;
  schedule_id: string;
  schedule?: string;
  limits: Limit;
  crawl_config_id: string;
  crawl_config?: string;
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
export class Limit {
  depth: number;
  max_duration_s: string;
  max_bytes: string;
}

export class Label {
  key: string;
  value: string;
}
