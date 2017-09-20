
import {Meta} from '../../commons/models/meta';

export class Crawlhostgroupconfigs {
  count: number;
  page_size: string;
  page: string;
}

export class Crawlhostgroupconfig {
  id?: string;
  meta: Meta;
  iprange: IpRange[];
}

export class IpRange {
  ip_from: string;
  ip_to: string;
}
