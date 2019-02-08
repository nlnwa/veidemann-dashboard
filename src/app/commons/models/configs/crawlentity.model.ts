import {CrawlEntity as CrawlEntityProto} from 'veidemann-api-grpc-web';
import {ConfigObject} from '../configobject.model';

export class CrawlEntity {

  static fromProto(proto: CrawlEntityProto): CrawlEntity {
    return new CrawlEntity();
  }

  static mergeConfigs(configObjects: ConfigObject[]): CrawlEntity {
    const crawlEntity = new CrawlEntity();
    return crawlEntity;
  }

  toProto(): CrawlEntityProto {
    return new CrawlEntityProto();
  }
}
