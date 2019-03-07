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

  constructor({
                collectionRef = new ConfigRef({kind: Kind.COLLECTION}),
                browserConfigRef = new ConfigRef({kind: Kind.BROWSERCONFIG}),
                politenessRef = new ConfigRef({kind: Kind.POLITENESSCONFIG}),
                extra = new ExtraConfig(),
                minimumDnsTtlS = 0,
                priorityWeight = 0,
              } = {}) {
    this.collectionRef = collectionRef;
    this.browserConfigRef = browserConfigRef;
    this.politenessRef = politenessRef;
    this.extra = extra;
    this.minimumDnsTtlS = minimumDnsTtlS;
    this.priorityWeight = priorityWeight;
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


  static createUpdateRequest(updateTemplate: ConfigObject,
                             pathList: string[],
                             configUpdate: ConfigObject,
                             mergedConfig: ConfigObject,
                             formControl: any): void {
    const crawlConfig = new CrawlConfig();
    updateTemplate.crawlConfig = crawlConfig;

    if (mergedConfig) {

      if (formControl.collectionRef.dirty) {
        if (configUpdate.crawlConfig.collectionRef !== mergedConfig.crawlConfig.collectionRef) {
          crawlConfig.collectionRef = configUpdate.crawlConfig.collectionRef;
          pathList.push('crawlConfig.collectionRef');
        }
      }

      if (formControl.browserConfigRef.dirty) {
        if (configUpdate.crawlConfig.browserConfigRef !== mergedConfig.crawlConfig.browserConfigRef) {
          crawlConfig.browserConfigRef = configUpdate.crawlConfig.browserConfigRef;
          pathList.push('crawlConfig.browserConfigRef');
        }
      }

      if (formControl.politenessRef.dirty) {
        if (configUpdate.crawlConfig.politenessRef !== mergedConfig.crawlConfig.politenessRef) {
          crawlConfig.politenessRef = configUpdate.crawlConfig.politenessRef;
          pathList.push('crawlConfig.politenessRef');
        }
      }

      if (formControl.minimumDnsTtlS.dirty) {
        if (configUpdate.crawlConfig.minimumDnsTtlS !== mergedConfig.crawlConfig.minimumDnsTtlS) {
          crawlConfig.minimumDnsTtlS = configUpdate.crawlConfig.minimumDnsTtlS;
          pathList.push('crawlConfig.minimumDnsTtlS');
        }
      }

      if (formControl.priorityWeight.dirty) {
        if (configUpdate.crawlConfig.priorityWeight !== mergedConfig.crawlConfig.priorityWeight) {
          crawlConfig.priorityWeight = configUpdate.crawlConfig.priorityWeight;
          pathList.push('crawlConfig.priorityWeight');
        }
      }

      if (formControl.extra.controls.extractText.dirty) {
        if (configUpdate.crawlConfig.extra.extractText !== mergedConfig.crawlConfig.extra.extractText) {
          crawlConfig.extra.extractText = configUpdate.crawlConfig.extra.extractText;
          pathList.push('crawlConfig.extra.extractText');
        }
      }

      if (formControl.extra.controls.createScreenshot.dirty) {
        if (configUpdate.crawlConfig.extra.createScreenshot !== mergedConfig.crawlConfig.extra.createScreenshot) {
          crawlConfig.extra.createScreenshot = configUpdate.crawlConfig.extra.createScreenshot;
          pathList.push('crawlConfig.extra.createScreenshot');
        }
      }

    } else {
      if (formControl.collectionRef.dirty) {
        crawlConfig.collectionRef = configUpdate.crawlConfig.collectionRef;
        pathList.push('crawlConfig.collectionRef');
      }

      if (formControl.browserConfigRef.dirty) {
        crawlConfig.browserConfigRef = configUpdate.crawlConfig.browserConfigRef;
        pathList.push('crawlConfig.browserConfigRef');
      }

      if (formControl.politenessRef.dirty) {
        crawlConfig.politenessRef = configUpdate.crawlConfig.politenessRef;
        pathList.push('crawlConfig.politenessRef');
      }

      if (formControl.minimumDnsTtlS.dirty) {
        crawlConfig.minimumDnsTtlS = configUpdate.crawlConfig.minimumDnsTtlS;
        pathList.push('crawlConfig.minimumDnsTtlS');
      }

      if (formControl.priorityWeight.dirty) {
        crawlConfig.priorityWeight = configUpdate.crawlConfig.priorityWeight;
        pathList.push('crawlConfig.priorityWeight');
      }

      if (formControl.extra.controls.extractText.dirty) {
        crawlConfig.extra.extractText = configUpdate.crawlConfig.extra.extractText;
        pathList.push('crawlConfig.extra.extractText');
      }

      if (formControl.extra.controls.createScreenshot.dirty) {
        crawlConfig.extra.createScreenshot = configUpdate.crawlConfig.extra.createScreenshot;
        pathList.push('crawlConfig.extra.createScreenshot');
      }
    }
  }
}

export class ExtraConfig {
  extractText?: boolean;
  createScreenshot?: boolean;

  constructor({
                extractText = true,
                createScreenshot = true
              } = {}) {

    this.extractText = extractText;
    this.createScreenshot = createScreenshot;
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





