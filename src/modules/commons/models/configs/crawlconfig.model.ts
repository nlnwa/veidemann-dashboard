import {CrawlConfigProto, ExtraConfigProto} from '../../../../api';
import {ConfigRef} from '../configref.model';
import {Kind} from '../kind.model';
import {ConfigObject} from '../configobject.model';

export class CrawlConfig {
  collectionRef: ConfigRef;
  browserConfigRef: ConfigRef;
  politenessRef: ConfigRef;
  extra: ExtraConfig;
  minimumDnsTtlS: number;
  priorityWeight: number;

  // constructor({
  //               collectionRef = new ConfigRef({kind: Kind.COLLECTION}),
  //               browserConfigRef = new ConfigRef({kind: Kind.BROWSERCONFIG}),
  //               politenessRef = new ConfigRef({kind: Kind.POLITENESSCONFIG}),
  //               extra = new ExtraConfig(),
  //               minimumDnsTtlS = 0,
  //               priorityWeight = 0,
  //             } = {}) {
  constructor(crawlConfig?: Partial<CrawlConfig>) {
    if (crawlConfig) {
      this.collectionRef = new ConfigRef(crawlConfig.collectionRef || {kind: Kind.COLLECTION});
      this.browserConfigRef = new ConfigRef(crawlConfig.browserConfigRef || {kind: Kind.BROWSERCONFIG});
      this.politenessRef = new ConfigRef(crawlConfig.politenessRef || {kind: Kind.POLITENESSCONFIG});
      this.extra = new ExtraConfig(crawlConfig.extra || {});
      this.minimumDnsTtlS = crawlConfig.minimumDnsTtlS || 0;
      this.priorityWeight = crawlConfig.priorityWeight || 0;
    }
  }

  static fromProto(proto: CrawlConfigProto): CrawlConfig {
    const collectionRef = proto.getCollectionRef() ?
      ConfigRef.fromProto(proto.getCollectionRef()) :
      new ConfigRef({kind: Kind.COLLECTION});

    const browserConfigRef = proto.getBrowserConfigRef() ?
      ConfigRef.fromProto(proto.getBrowserConfigRef()) :
      new ConfigRef({kind: Kind.BROWSERCONFIG});

    const politenessRef = proto.getPolitenessRef() ?
      ConfigRef.fromProto(proto.getPolitenessRef()) :
      new ConfigRef({kind: Kind.POLITENESSCONFIG});

    return new CrawlConfig({
      collectionRef: collectionRef,
      browserConfigRef: browserConfigRef,
      politenessRef: politenessRef,
      extra: ExtraConfig.fromProto(proto.getExtra()),
      minimumDnsTtlS: proto.getMinimumDnsTtlS(),
      priorityWeight: proto.getPriorityWeight(),
    });
  }

  static toProto(crawlConfig: CrawlConfig): CrawlConfigProto {
    const proto = new CrawlConfigProto();
    proto.setCollectionRef(ConfigRef.toProto(crawlConfig.collectionRef));
    proto.setBrowserConfigRef(ConfigRef.toProto(crawlConfig.browserConfigRef));
    proto.setPolitenessRef(ConfigRef.toProto(crawlConfig.politenessRef));
    proto.setExtra(ExtraConfig.toProto(crawlConfig.extra));
    proto.setMinimumDnsTtlS(crawlConfig.minimumDnsTtlS);
    proto.setPriorityWeight(crawlConfig.priorityWeight);
    return proto;
  }

  static mergeConfigs(configObjects: ConfigObject[]): CrawlConfig {
    const crawlConfig = new CrawlConfig();
    const compareObj: CrawlConfig = configObjects[0].crawlConfig;

    const equalCollectionRef = configObjects.every(function (cfg) {
      return cfg.crawlConfig.collectionRef.id === compareObj.collectionRef.id;
    });

    const equalBrowserConfigRef = configObjects.every(function (cfg) {
      return cfg.crawlConfig.browserConfigRef.id === compareObj.browserConfigRef.id;
    });

    const equalPolitenessRef = configObjects.every(function (cfg) {
      return cfg.crawlConfig.politenessRef.id === compareObj.politenessRef.id;
    });

    const equalDnsTtlS = configObjects.every(function (cfg) {
      return cfg.crawlConfig.minimumDnsTtlS === compareObj.minimumDnsTtlS;
    });

    const equalPriorityWeight = configObjects.every(function (cfg) {
      return cfg.crawlConfig.priorityWeight === compareObj.priorityWeight;
    });

    const equalExtractText = configObjects.every(function (cfg) {
      return cfg.crawlConfig.extra.extractText === compareObj.extra.extractText;
    });

    const equalCreateScreenshot = configObjects.every(function (cfg) {
      return cfg.crawlConfig.extra.createScreenshot === compareObj.extra.createScreenshot;
    });

    if (equalCollectionRef) {
      crawlConfig.collectionRef = compareObj.collectionRef;
    } else {
      crawlConfig.collectionRef = null;
    }

    if (equalBrowserConfigRef) {
      crawlConfig.browserConfigRef = compareObj.browserConfigRef;
    } else {
      crawlConfig.browserConfigRef = null;
    }

    if (equalPolitenessRef) {
      crawlConfig.politenessRef = compareObj.politenessRef;
    } else {
      crawlConfig.politenessRef = null;
    }

    if (equalDnsTtlS) {
      crawlConfig.minimumDnsTtlS = compareObj.minimumDnsTtlS;
    }

    if (equalPriorityWeight) {
      crawlConfig.priorityWeight = compareObj.priorityWeight;
    }

    if (equalExtractText) {
      crawlConfig.extra.extractText = compareObj.extra.extractText;
    } else {
      crawlConfig.extra.extractText = null;
    }

    if (equalCreateScreenshot) {
      crawlConfig.extra.createScreenshot = compareObj.extra.createScreenshot;
    } else {
      crawlConfig.extra.createScreenshot = null;
    }

    return crawlConfig;
  }
}

export class ExtraConfig {
  extractText?: boolean;
  createScreenshot?: boolean;

  // constructor({
  //               extractText = true,
  //               createScreenshot = true
  //             } = {}) {

  constructor(extraConfig?: Partial<ExtraConfig>) {
    if (extraConfig) {
      this.extractText = extraConfig.extractText || true;
      this.createScreenshot = extraConfig.createScreenshot || true;
    }
  }

  static fromProto(proto: ExtraConfigProto): ExtraConfig {
    return new ExtraConfig({
      extractText: proto.getExtractText(),
      createScreenshot: proto.getCreateScreenshot()
    });
  }

  static toProto(extraConfig: ExtraConfig): ExtraConfigProto {
    const proto = new ExtraConfigProto();
    proto.setExtractText(extraConfig.extractText);
    proto.setCreateScreenshot(extraConfig.createScreenshot);
    return proto;
  }
}





