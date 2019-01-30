import {CrawlEntity as CrawlEntityProto} from '../../../../api/config/v1/config_pb';

export class CrawlEntity {

  static fromProto(proto: CrawlEntityProto): CrawlEntity {
    return new CrawlEntity();
  }

  toProto(): CrawlEntityProto {
    return new CrawlEntityProto();
  }
}
