export class Meta {
  name: string;
  description: string;
  created?: Timestamp;
  created_by?: string;
  last_modified?: Timestamp;
  last_modified_by?: string;
  label: Label[];

  constructor() {
    this.created = new Timestamp();
    this.last_modified = new Timestamp();
    this.label = [];
  }
}

export class Label {
  key?: string;
  value?: string;
}

export class Selector {
  label: Label[];

  constructor() {
    this.label = [];
  }
}

export class Entity {
  id: string;
  meta: Meta;

  constructor() {
    this.meta = new Meta();
  }
}

export class Seed {
  id: string;
  meta: Meta;
  entity_id: string;
  scope: Scope;
  job_id: string[];
  disabled: boolean;

  constructor(entityId: string) {
    this.entity_id = entityId;
    this.scope = new Scope();
    this.meta = new Meta();
    this.job_id = [];
    this.disabled = true;
  }
}

export class CrawlJob {
  id?: string;
  meta: Meta;

  // schedule_config_or_id
  schedule_id?: string;
  schedule?: Schedule;
  schedule_selector?: Selector;

  limits: CrawlLimits;

  // crawl_config_or_id
  crawl_config_id?: string;
  crawl_config?: string;
  crawl_config_selector?: Selector;

  disabled?: boolean;
}

export class CrawlConfig {
  id?: string;
  meta: Meta;

  // browser_config_or_id
  browser_config_id?: string;
  browser_config?: BrowserConfig;
  browser_config_selector?: Selector;

  // politeness_config_or_id
  politeness_id?: string;
  politeness?: PolitenessConfig;
  politeness_selector?: Selector;

  extra: Extra;
  minimum_dns_ttl_s: number;
  depth_first: boolean;
}

export class Schedule {
  id?: string;
  meta: Meta;
  cron_expression: string;
  valid_from?: Timestamp;
  valid_to?: Timestamp;
}

export class Scope {
  surt_prefix: string;
}

export class CrawlLimits {
  depth: number;
  max_duration_s: string; // int64
  max_bytes: string; // int64
}

export class BrowserConfig {
  id?: string;
  meta: Meta;
  user_agent?: string;
  window_width?: number;
  window_height?: number;
  page_load_timeout_ms?: string; // int64
  script_selector?: Selector;
  script_id?: string[];
  headers?: Map<string, string>;
  script_parameters?: Map<string, string>;
  sleep_after_pageload_ms?: string; // int64
}

export class PolitenessConfig {
  id?: string;
  meta: Meta;
  robots_policy: string;
  minimum_robots_validity_duration_s?: number;
  custom_robots: string;
  min_time_between_page_load_ms?: string; // int64
  max_time_between_page_load_ms?: string; // int64
  delay_factor: number;
  max_retries: number;
  retry_delay_seconds: number;
  crawl_host_group_selector: Selector;

  constructor(robotsPolicy: string) {
    this.robots_policy = robotsPolicy;
    this.meta = new Meta();
    this.crawl_host_group_selector = new Selector();
  }


}

export class Extra {
  extract_text: boolean;
  create_snapshot: boolean;
}

export class BrowserScript {
  id?: string;
  meta: Meta;
  script: string;
  url_regexp?: string;
}

export class CrawlHostGroupConfig {
  id?: string;
  meta: Meta;
  ip_range: IpRange[];
}

export class IpRange {
  ip_from: string;
  ip_to: string;
}

export class LogLevels {
  log_level: LogLevel[]
}

export class LogLevel {
  logger: string;
  level: string;
}

export class Timestamp {
  seconds: number;
  nanos?: number;

  constructor() {
    this.seconds = null;
  }
}
