import {CrawlConfig as CrawlConfigProto, ExtraConfig as ExtraConfigProto} from 'veidemann-api-grpc-web';
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
      crawlConfig.collectionRef.id = compareObj.browserConfigRef.id;
    }

    if (equalBrowserConfigRef) {
      crawlConfig.browserConfigRef.id = compareObj.browserConfigRef.id;
    }

    if (equalPolitenessRef) {
      crawlConfig.politenessRef.id = compareObj.politenessRef.id;
    }

    if (equalDnsTtlS) {
      crawlConfig.minimumDnsTtlS = compareObj.minimumDnsTtlS;
    }

    if (equalPriorityWeight) {
      crawlConfig.priorityWeight = compareObj.priorityWeight;
    }

    if (equalExtractText) {
      crawlConfig.extra.extractText = compareObj.extra.extractText;
    }

    if (equalCreateScreenshot) {
      crawlConfig.extra.createScreenshot = compareObj.extra.createScreenshot;
    }

    return crawlConfig;
  }

  toProto(): CrawlConfigProto {
    const proto = new CrawlConfigProto();
    proto.setCollectionRef(this.collectionRef.toProto());
    proto.setBrowserConfigRef(this.browserConfigRef.toProto());
    proto.setPolitenessRef(this.politenessRef.toProto());
    proto.setExtra(this.extra.toProto());
    proto.setMinimumDnsTtlS(this.minimumDnsTtlS);
    proto.setPriorityWeight(this.priorityWeight);
    return proto;
  }


  createUpdateRequest(configUpdate: ConfigObject, formControl: any, mergedConfig?: ConfigObject) {
    const crawlConfig = new CrawlConfig();
    const pathList = [];

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

    return {updateTemplate: crawlConfig, pathList: pathList};
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

  toProto(): ExtraConfigProto {
    const proto = new ExtraConfigProto();
    proto.setExtractText(this.extractText);
    proto.setCreateScreenshot(this.createScreenshot);
    return proto;
  }
}




