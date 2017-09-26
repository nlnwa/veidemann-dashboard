import {Meta} from '../../commons/models/meta.model';

export class CrawlJob {
  id?: string;
  meta: Meta;

  schedule_id: string;
  schedule?: string;
  limits: CrawlLimits;
  crawl_config_id: string;
  crawl_config?: string;

  schedule_config_or_id?: string;
  crawl_config_or_id?: string;
}

export class CrawlLimits {
  depth: number;
  max_duration_s: string;
  max_bytes: string;
}
