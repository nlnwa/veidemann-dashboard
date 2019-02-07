import {CrawlEntity as CrawlEntityProto} from '../../../../api/config/v1/config_pb';
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
