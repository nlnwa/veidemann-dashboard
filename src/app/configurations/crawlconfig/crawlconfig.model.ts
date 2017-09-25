import {Meta} from '../../commons/models/meta.model';

export class CrawlConfigs {
  value: CrawlConfig[];
  count: number;
  page_size: string;
  page: string;
}

export class CrawlConfig {
  browser_config_or_id?: string;
  politeness_or_id?: string;
  id?: string;
  meta: Meta;
  browser_config_id: string;
  browser_config?: string;
  politeness_id: string;
  politeness?: string;
  extra: Extra;
  minimum_dns_ttl_s: number;
  depth_first: boolean;
}

export class Extra {
  extract_text: boolean;
  create_snapshot: boolean;
}

