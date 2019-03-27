import {CrawlEntityProto} from '../../../../api';
import {ConfigObject} from '../configobject.model';

export class CrawlEntity {

  static fromProto(proto: CrawlEntityProto): CrawlEntity {
    return new CrawlEntity();
  }

  static mergeConfigs(configObjects: ConfigObject[]): CrawlEntity {
    return new CrawlEntity();
  }

  static toProto(crawlEntity: CrawlEntity): CrawlEntityProto {
    return new CrawlEntityProto();
  }
}
