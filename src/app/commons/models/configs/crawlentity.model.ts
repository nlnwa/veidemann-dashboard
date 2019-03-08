import {CrawlEntityProto} from '../../../../api';
import {ConfigObject} from '../configobject.model';

export class CrawlEntity {

  static fromProto(proto: CrawlEntityProto): CrawlEntity {
    return new CrawlEntity();
  }

  static mergeConfigs(configObjects: ConfigObject[]): CrawlEntity {
    const crawlEntity = new CrawlEntity();
    return crawlEntity;
  }

  static toProto(crawlEntity: CrawlEntity): CrawlEntityProto {
    return new CrawlEntityProto();
  }
}
