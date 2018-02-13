export class Timestamp {
  seconds: string;
  nanos?: number;

  constructor() {
    this.seconds = null;
  }
}

export class Meta {
  name: string;
  description: string;
  created?: Timestamp;
  created_by?: string;
  last_modified?: Timestamp;
  last_modified_by?: string;
  label: Label[];

  constructor(name = '') {
    this.name = name;
    this.description = '';
    this.created_by = '';
    this.created = new Timestamp();
    this.last_modified_by = '';
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

  constructor(name = '') {
    this.id = '';
    this.meta = new Meta(name);
  }
}

export class Scope {
  surt_prefix: string;

  constructor() {
    this.surt_prefix = '';
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
    this.id = '';
    this.entity_id = entityId;
    this.scope = new Scope();
    this.meta = new Meta();
    this.job_id = [];
    this.disabled = false;
  }
}

export class Schedule {
  id: string;
  meta: Meta;
  cron_expression: string;
  valid_from?: Timestamp;
  valid_to?: Timestamp;

  constructor() {
    this.id = '';
    this.meta = new Meta();
    this.cron_expression = '';
    this.valid_from = null;
    this.valid_to = null;
  }
}

export class CrawlLimits {
  depth: number;
  max_duration_s: string; // int64
  max_bytes: string; // int64
}

export class CrawlJob {
  id: string;
  meta: Meta;

  // schedule_config_or_id
  schedule_id?: string;
  schedule?: Schedule;
  schedule_selector?: Selector;

  limits: CrawlLimits;

  // crawl_config_or_id
  crawl_config_id?: string;
  crawl_config?: CrawlConfig;
  crawl_config_selector?: Selector;

  disabled?: boolean;

  constructor() {
    this.id = '';
    this.schedule = new Schedule();
    this.meta = new Meta();
    this.limits = new CrawlLimits();
    this.schedule_id = '';
    this.crawl_config_id = '';
  }
}

export class Extra {
  extract_text: boolean;
  create_snapshot: boolean;

  constructor() {
    this.extract_text = true;
    this.create_snapshot = true;
  }
}

export class CrawlConfig {
  id: string;
  meta: Meta;

  // browser_config_or_id
  browser_config_id: string;
  browser_config?: BrowserConfig;
  browser_config_selector?: Selector;

  // politeness_config_or_id
  politeness_id: string;
  politeness?: PolitenessConfig;
  politeness_selector?: Selector;

  extra: Extra;
  minimum_dns_ttl_s: number;
  depth_first: boolean;

  constructor() {
    this.id = '';
    this.meta = new Meta();
    this.browser_config_id = '';
    this.politeness_id = '';
    this.extra = new Extra();
    this.minimum_dns_ttl_s = 0;
    this.depth_first = true;
  }
}

export class BrowserConfig {
  id: string;
  meta: Meta;
  user_agent: string;
  window_width: number;
  window_height: number;
  page_load_timeout_ms: string; // int64
  script_selector?: Selector;
  script_id: string[];
  headers?: Map<string, string>;
  script_parameters?: Map<string, string>;
  sleep_after_pageload_ms: string; // int64

  constructor() {
    this.id = '';
    this.meta = new Meta();
    this.user_agent = '';
    this.window_width = 0;
    this.window_height = 0;
    this.page_load_timeout_ms = '';
    this.script_selector = new Selector();
    this.script_id = [];
    this.sleep_after_pageload_ms = '';

  }
}

export class PolitenessConfig {
  id: string;
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
    this.id = '';
    this.meta = new Meta();
    this.robots_policy = robotsPolicy;
    this.custom_robots = '';
    this.delay_factor = 0;
    this.max_retries = 0;
    this.retry_delay_seconds = 0;
    this.crawl_host_group_selector = new Selector();
  }
}

export class BrowserScript {
  id: string;
  meta: Meta;
  script: string;
  url_regexp?: string;

  constructor() {
    this.id = '';
    this.meta = new Meta();
    this.script = '';
  }
}

export class CrawlHostGroupConfig {
  id: string;
  meta: Meta;
  ip_range: IpRange[];

  constructor() {
    this.id = '';
    this.meta = new Meta();
    this.ip_range = [];
  }

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

export class RoleMapping {
  id: string;
  email?: string;
  group?: string;
  role: string[];

  constructor() {
    this.id = '';
    this.email = '';
    this.group = '';
    this.role = [];
  }
}

export class RoleList {
  role: string[];
}

export enum Role {
  ANY_USER = 'ANY_USER',
  ANY = 'ANY',
  ADMIN = 'ADMIN',
  CURATOR = 'CURATOR',
  READONLY = 'READONLY',
}

