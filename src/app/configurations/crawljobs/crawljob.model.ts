import {Meta} from '../../commons/models/meta.model';

export class CrawlJobs {
  value: CrawlJob[];
  count: number;
  page_size: string;
  page: string;
}

export class CrawlJob {
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

export class Limit {
  depth: number;
  max_duration_s: string;
  max_bytes: string;
}
