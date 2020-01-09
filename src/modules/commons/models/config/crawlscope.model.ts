import {CrawlScopeProto} from '../../../../api';

export class CrawlScope {
  surtPrefix: string;

  constructor({
                surtPrefix = ''
              }: Partial<CrawlScope> = {}) {
    this.surtPrefix = surtPrefix;
  }

  static fromProto(proto: CrawlScopeProto): CrawlScope {
    return new CrawlScope({
      surtPrefix: proto.getSurtPrefix()
    });
  }

  static toProto(crawlScope: CrawlScope): CrawlScopeProto {
    const proto = new CrawlScopeProto();
    proto.setSurtPrefix(crawlScope.surtPrefix);

    return proto as any as CrawlScopeProto;
  }
}
