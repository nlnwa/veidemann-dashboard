import {PolitenessConfigProto} from '../../../api';
import {ConfigObject} from './configobject.model';
import {intersectString, isNumeric} from '../../func';

export enum RobotsPolicy {
  OBEY_ROBOTS,
  IGNORE_ROBOTS,
  CUSTOM_ROBOTS,
  OBEY_ROBOTS_CLASSIC,
  CUSTOM_ROBOTS_CLASSIC,
  CUSTOM_IF_MISSING,
  CUSTOM_IF_MISSING_CLASSIC
}

export const robotsPolicies = Object.keys(RobotsPolicy).filter(p => !isNumeric(p)).map(key => RobotsPolicy[key]);

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
                robotsPolicy = RobotsPolicy.OBEY_ROBOTS,
                customRobots = '',
                minimumRobotsValidityDurationS = 0,
                minTimeBetweenPageLoadMs = 0,
                maxTimeBetweenPageLoadMs = 0,
                delayFactor = 0,
                maxRetries = 0,
                retryDelaySeconds = 0,
                crawlHostGroupSelectorList = []
              }: Partial<PolitenessConfig> = {}) {
    this.robotsPolicy = robotsPolicy;
    this.customRobots = customRobots;
    this.minimumRobotsValidityDurationS = minimumRobotsValidityDurationS;
    this.minTimeBetweenPageLoadMs = minTimeBetweenPageLoadMs;
    this.maxTimeBetweenPageLoadMs = maxTimeBetweenPageLoadMs;
    this.delayFactor = delayFactor;
    this.maxRetries = maxRetries;
    this.retryDelaySeconds = retryDelaySeconds;
    this.crawlHostGroupSelectorList = crawlHostGroupSelectorList ? [...crawlHostGroupSelectorList] : [];
  }

  static fromProto(proto: PolitenessConfigProto): PolitenessConfig {
    return new PolitenessConfig({
      robotsPolicy: proto.getRobotsPolicy(),
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

  static toProto(politenessConfig: PolitenessConfig): PolitenessConfigProto {
    const proto = new PolitenessConfigProto();

    proto.setRobotsPolicy(politenessConfig.robotsPolicy);
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

  static mergeConfigs(configObjects: ConfigObject[]): PolitenessConfig {
    const politenessConfig = new PolitenessConfig();
    const compareObj: PolitenessConfig = configObjects[0].politenessConfig;

    const equalRobotsPolicy = configObjects.every(cfg => cfg.politenessConfig.robotsPolicy === compareObj.robotsPolicy);

    const equalMinRobotsValidity = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.minimumRobotsValidityDurationS === compareObj.minimumRobotsValidityDurationS);

    const equalMinTimeBetweenPageload = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.minTimeBetweenPageLoadMs === compareObj.minTimeBetweenPageLoadMs);

    const equalMaxTimeBetweenPageload = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.maxTimeBetweenPageLoadMs === compareObj.maxTimeBetweenPageLoadMs);

    const equalDelayFactor = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.delayFactor === compareObj.delayFactor);

    const equalMaxRetries = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.maxRetries === compareObj.maxRetries);

    const equalRetryDelay = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.retryDelaySeconds === compareObj.retryDelaySeconds);

    const equalCustomRobot = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.customRobots === compareObj.customRobots);

    if (equalRobotsPolicy) {
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

    politenessConfig.crawlHostGroupSelectorList = configObjects
      .map(c => c.politenessConfig.crawlHostGroupSelectorList)
      .reduce(intersectString);

    return politenessConfig;
  }
}
