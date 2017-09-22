
import {Meta} from '../../commons/models/meta';

export class CrawlHostGroupConfigs {
  value: CrawlHostGroupConfig[];
  count: number;
  page_size: string;
  page: string;
}

export class CrawlHostGroupConfig {
  id?: string;
  meta: Meta;
  ip_range: IpRange[];
}

export class IpRange {
  ip_from: string;
  ip_to: string;
}
