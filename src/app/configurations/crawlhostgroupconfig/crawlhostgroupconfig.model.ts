import {Meta} from '../../commons/models/meta.model';

export class CrawlHostGroupConfig {
  id?: string;
  meta: Meta;
  ip_range: IpRange[];
}

export class IpRange {
  ip_from: string;
  ip_to: string;
}
