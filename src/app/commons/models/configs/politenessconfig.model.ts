import {PolitenessConfigProto} from '../../../../api';
import {ConfigObject} from '../configobject.model';
import {intersectSelector} from '../../group-update/labels/common-selector';

export enum RobotsPolicy {
  OBEY_ROBOTS,
  IGNORE_ROBOTS,
  CUSTOM_ROBOTS,
}

export class PolitenessConfig {
  robotsPolicy?: RobotsPolicy;
  customRobots?: string;
  minimumRobotsValidityDurationS?: number;
  minTimeBetweenPageLoadMs?: number; // int64
  maxTimeBetweenPageLoadMs?: number; // int64
  delayFactor?: number;
  maxRetries?: number;
  retryDelaySeconds?: number;
  crawlHostGroupSelectorList?: string [];

  constructor({
                robotsPolicy = RobotsPolicy[RobotsPolicy.OBEY_ROBOTS] as any as RobotsPolicy,
                customRobots = '',
                minimumRobotsValidityDurationS = 0,
                minTimeBetweenPageLoadMs = 0,
                maxTimeBetweenPageLoadMs = 0,
                delayFactor = 0,
                maxRetries = 0,
                retryDelaySeconds = 0,
                crawlHostGroupSelectorList = []
              } = {}) {
    this.robotsPolicy = robotsPolicy;
    this.customRobots = customRobots;
    this.minimumRobotsValidityDurationS = minimumRobotsValidityDurationS;
    this.minTimeBetweenPageLoadMs = minTimeBetweenPageLoadMs;
    this.maxTimeBetweenPageLoadMs = maxTimeBetweenPageLoadMs;
    this.delayFactor = delayFactor;
    this.maxRetries = maxRetries;
    this.retryDelaySeconds = retryDelaySeconds;
    this.crawlHostGroupSelectorList = crawlHostGroupSelectorList;
  }

  static fromProto(proto: PolitenessConfigProto): PolitenessConfig {
    return new PolitenessConfig({
      robotsPolicy: RobotsPolicy[proto.getRobotsPolicy()] as any as RobotsPolicy,
      customRobots: proto.getCustomRobots(),
      minimumRobotsValidityDurationS: proto.getMinimumRobotsValidityDurationS(),
      minTimeBetweenPageLoadMs: proto.getMinTimeBetweenPageLoadMs(),
      maxTimeBetweenPageLoadMs: proto.getMaxTimeBetweenPageLoadMs(),
      delayFactor: proto.getDelayFactor(),
      maxRetries: proto.getMaxRetries(),
      retryDelaySeconds: proto.getRetryDelaySeconds(),
      crawlHostGroupSelectorList: proto.getCrawlHostGroupSelectorList()
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): PolitenessConfig {
    const politenessConfig = new PolitenessConfig();
    const compareObj: PolitenessConfig = configObjects[0].politenessConfig;

    const equalRobotPolicy = this.isRobotPoliciesEqual(configObjects);

    const equalMinRobotsValidity = configObjects.every(function (cfg: ConfigObject) {
      return cfg.politenessConfig.minimumRobotsValidityDurationS === compareObj.minimumRobotsValidityDurationS;
    });

    const equalMinTimeBetweenPageload = configObjects.every(function (cfg: ConfigObject) {
      return cfg.politenessConfig.minTimeBetweenPageLoadMs === compareObj.minTimeBetweenPageLoadMs;
    });

    const equalMaxTimeBetweenPageload = configObjects.every(function (cfg: ConfigObject) {
      return cfg.politenessConfig.maxTimeBetweenPageLoadMs === compareObj.maxTimeBetweenPageLoadMs;
    });

    const equalDelayFactor = configObjects.every(function (cfg: ConfigObject) {
      return cfg.politenessConfig.delayFactor === compareObj.delayFactor;
    });

    const equalMaxRetries = configObjects.every(function (cfg: ConfigObject) {
      return cfg.politenessConfig.maxRetries === compareObj.maxRetries;
    });

    const equalRetryDelay = configObjects.every(function (cfg: ConfigObject) {
      return cfg.politenessConfig.retryDelaySeconds === compareObj.retryDelaySeconds;
    });

    const equalCustomRobot = configObjects.every(function (cfg: ConfigObject) {
      return cfg.politenessConfig.customRobots === compareObj.customRobots;
    });

    if (equalRobotPolicy) {
      politenessConfig.robotsPolicy = compareObj.robotsPolicy;
    } else {
      politenessConfig.robotsPolicy = undefined;
    }

    if (equalCustomRobot) {
      politenessConfig.customRobots = compareObj.customRobots;
    } else {
      politenessConfig.customRobots = null;
    }

    if (equalMinRobotsValidity) {
      politenessConfig.minimumRobotsValidityDurationS = compareObj.minimumRobotsValidityDurationS;
    } else {
      politenessConfig.minimumRobotsValidityDurationS = null;
    }

    if (equalMinTimeBetweenPageload) {
      politenessConfig.minTimeBetweenPageLoadMs = compareObj.minTimeBetweenPageLoadMs;
    } else {
      politenessConfig.minTimeBetweenPageLoadMs = null;
    }

    if (equalMaxTimeBetweenPageload) {
      politenessConfig.maxTimeBetweenPageLoadMs = compareObj.maxTimeBetweenPageLoadMs;
    } else {
      politenessConfig.maxTimeBetweenPageLoadMs = null;
    }
    if (equalDelayFactor) {
      politenessConfig.delayFactor = compareObj.delayFactor;
    } else {
      politenessConfig.delayFactor = null;
    }
    if (equalMaxRetries) {
      politenessConfig.maxRetries = compareObj.maxRetries;
    } else {
      politenessConfig.maxRetries = null;
    }
    if (equalRetryDelay) {
      politenessConfig.retryDelaySeconds = compareObj.retryDelaySeconds;
    } else {
      politenessConfig.retryDelaySeconds = null;
    }

    politenessConfig.crawlHostGroupSelectorList = configObjects.reduce((acc: any[], curr: ConfigObject) => {
      if (acc.length < 1) {
        acc = [...curr.politenessConfig.crawlHostGroupSelectorList];
      } else {
        acc = intersectSelector(acc, curr.politenessConfig.crawlHostGroupSelectorList || []);
      }
      return acc;
    }, []);

    return politenessConfig;
  }

  static isRobotPoliciesEqual(configs: ConfigObject[]): boolean {
    const compareObj = configs[0];
    const equalRobotsPolicies = configs.every(function (cfg) {
      return cfg.politenessConfig.robotsPolicy === compareObj.politenessConfig.robotsPolicy;
    });
    return equalRobotsPolicies;
  }

  static toProto(politenessConfig: PolitenessConfig): PolitenessConfigProto {
    const proto = new PolitenessConfigProto();

    proto.setRobotsPolicy(PolitenessConfigProto.RobotsPolicy[politenessConfig.robotsPolicy] as any as PolitenessConfigProto.RobotsPolicy);
    proto.setCustomRobots(politenessConfig.customRobots);
    proto.setMinimumRobotsValidityDurationS(politenessConfig.minimumRobotsValidityDurationS);
    proto.setMinTimeBetweenPageLoadMs(politenessConfig.minTimeBetweenPageLoadMs);
    proto.setMaxTimeBetweenPageLoadMs(politenessConfig.maxTimeBetweenPageLoadMs);
    proto.setDelayFactor(politenessConfig.delayFactor);
    proto.setMaxRetries(politenessConfig.maxRetries);
    proto.setDelayFactor(politenessConfig.delayFactor);
    proto.setRetryDelaySeconds(politenessConfig.retryDelaySeconds);
    proto.setCrawlHostGroupSelectorList(politenessConfig.crawlHostGroupSelectorList);

    return proto;
  }

  static createUpdateRequest(updateTemplate: ConfigObject,
                             pathList: string[],
                             configUpdate: ConfigObject,
                             mergedConfig: ConfigObject,
                             formControl: any,
                             options: any): void {
    const politenessConfig = new PolitenessConfig();
    updateTemplate.politenessConfig = politenessConfig;

    const {addSelector} = options;

    if (mergedConfig) {
      if (formControl.robotsPolicy.dirty) {
        if (configUpdate.politenessConfig.robotsPolicy !== mergedConfig.politenessConfig.robotsPolicy) {
          politenessConfig.robotsPolicy = configUpdate.politenessConfig.robotsPolicy;
          pathList.push('politenessConfig.robotsPolicy');
        }
      }

      if (formControl.customRobots.dirty) {
        if (configUpdate.politenessConfig.customRobots !== mergedConfig.politenessConfig.customRobots) {
          politenessConfig.customRobots = configUpdate.politenessConfig.customRobots;
          pathList.push('politenessConfig.customRobots');
        }
      }

      if (formControl.minimumRobotsValidityDurationS.dirty) {
        if (configUpdate.politenessConfig.minimumRobotsValidityDurationS !== mergedConfig.politenessConfig.minimumRobotsValidityDurationS) {
          politenessConfig.minimumRobotsValidityDurationS = configUpdate.politenessConfig.minimumRobotsValidityDurationS;
          pathList.push('politenessConfig.minimumRobotsValidityDurationS');
        }
      }

      if (formControl.minTimeBetweenPageLoadMs.dirty) {
        if (configUpdate.politenessConfig.minTimeBetweenPageLoadMs !== mergedConfig.politenessConfig.minTimeBetweenPageLoadMs) {
          politenessConfig.minTimeBetweenPageLoadMs = configUpdate.politenessConfig.minTimeBetweenPageLoadMs;
          pathList.push('politenessConfig.minTimeBetweenPageLoadMs');
        }
      }

      if (formControl.maxTimeBetweenPageLoadMs.dirty) {
        if (configUpdate.politenessConfig.maxTimeBetweenPageLoadMs !== mergedConfig.politenessConfig.maxTimeBetweenPageLoadMs) {
          politenessConfig.maxTimeBetweenPageLoadMs = configUpdate.politenessConfig.maxTimeBetweenPageLoadMs;
          pathList.push('politenessConfig.maxTimeBetweenPageLoadMs');
        }
      }

      if (formControl.delayFactor.dirty) {
        if (configUpdate.politenessConfig.delayFactor !== mergedConfig.politenessConfig.delayFactor) {
          politenessConfig.delayFactor = configUpdate.politenessConfig.delayFactor;
          pathList.push('politenessConfig.delayFactor');
        }
      }

      if (formControl.maxRetries.dirty) {
        if (configUpdate.politenessConfig.maxRetries !== mergedConfig.politenessConfig.maxRetries) {
          politenessConfig.maxRetries = configUpdate.politenessConfig.maxRetries;
          pathList.push('politenessConfig.maxRetries');
        }
      }

      if (formControl.retryDelaySeconds.dirty) {
        if (configUpdate.politenessConfig.retryDelaySeconds !== mergedConfig.politenessConfig.retryDelaySeconds) {
          politenessConfig.retryDelaySeconds = configUpdate.politenessConfig.retryDelaySeconds;
          pathList.push('politenessConfig.retryDelaySeconds');
        }
      }

      if (formControl.crawlHostGroupSelectorList.dirty) {
        if (addSelector !== undefined) {
          if (addSelector) {
            pathList.push('politenessConfig.crawlHostGroupSelector+');
            politenessConfig.crawlHostGroupSelectorList = configUpdate.politenessConfig.crawlHostGroupSelectorList;
          } else {
            pathList.push('politenessConfig.crawlHostGroupSelector-');
            politenessConfig.crawlHostGroupSelectorList = configUpdate.politenessConfig.crawlHostGroupSelectorList;
          }
        }
      }
    } else {
      if (formControl.robotsPolicy.dirty) {
        politenessConfig.robotsPolicy = configUpdate.politenessConfig.robotsPolicy;
        pathList.push('politenessConfig.robotsPolicy');
      }

      if (formControl.customRobots.dirty) {
        politenessConfig.customRobots = configUpdate.politenessConfig.customRobots;
        pathList.push('politenessConfig.customRobots');
      }

      if (formControl.minimumRobotsValidityDurationS.dirty) {
        politenessConfig.minimumRobotsValidityDurationS = configUpdate.politenessConfig.minimumRobotsValidityDurationS;
        pathList.push('politenessConfig.minimumRobotsValidityDurationS');
      }

      if (formControl.minTimeBetweenPageLoadMs.dirty) {
        politenessConfig.minTimeBetweenPageLoadMs = configUpdate.politenessConfig.minTimeBetweenPageLoadMs;
        pathList.push('politenessConfig.minTimeBetweenPageLoadMs');
      }

      if (formControl.maxTimeBetweenPageLoadMs.dirty) {
        politenessConfig.maxTimeBetweenPageLoadMs = configUpdate.politenessConfig.maxTimeBetweenPageLoadMs;
        pathList.push('politenessConfig.maxTimeBetweenPageLoadMs');
      }

      if (formControl.delayFactor.dirty) {
        politenessConfig.delayFactor = configUpdate.politenessConfig.delayFactor;
        pathList.push('politenessConfig.delayFactor');
      }

      if (formControl.maxRetries.dirty) {
        politenessConfig.maxRetries = configUpdate.politenessConfig.maxRetries;
        pathList.push('politenessConfig.maxRetries');
      }

      if (formControl.retryDelaySeconds.dirty) {
        politenessConfig.retryDelaySeconds = configUpdate.politenessConfig.retryDelaySeconds;
        pathList.push('politenessConfig.retryDelaySeconds');
      }

      if (formControl.crawlHostGroupSelectorList.dirty) {
        if (addSelector !== undefined) {
          if (addSelector) {
            pathList.push('politenessConfig.crawlHostGroupSelector+');
            politenessConfig.crawlHostGroupSelectorList = configUpdate.politenessConfig.crawlHostGroupSelectorList;
          } else {
            pathList.push('politenessConfig.crawlHostGroupSelector-');
            politenessConfig.crawlHostGroupSelectorList = configUpdate.politenessConfig.crawlHostGroupSelectorList;
          }
        }
      }
    }
  }
}
