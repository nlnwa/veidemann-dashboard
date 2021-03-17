import {PolitenessConfigProto} from '../../../api';
import {ConfigObject} from './configobject.model';
import {isNumeric} from '../../func';

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
  useHostname: boolean;

  constructor({
                robotsPolicy = RobotsPolicy.OBEY_ROBOTS,
                customRobots = '',
                minimumRobotsValidityDurationS = 0,
                useHostname = false,
              }: Partial<PolitenessConfig> = {}) {
    this.robotsPolicy = robotsPolicy;
    this.customRobots = customRobots;
    this.minimumRobotsValidityDurationS = minimumRobotsValidityDurationS;
    this.useHostname = useHostname;
  }

  static fromProto(proto: PolitenessConfigProto): PolitenessConfig {
    // a small hack, see https://github.com/grpc/grpc/issues/2227
    return new PolitenessConfig({
      robotsPolicy: proto.getRobotsPolicy(),
      customRobots: proto.getCustomRobots(),
      minimumRobotsValidityDurationS: proto.getMinimumRobotsValidityDurationS(),
      useHostname: proto.getUseHostname()
    });
  }


  static toProto(politenessConfig: PolitenessConfig): PolitenessConfigProto {
    const proto = new PolitenessConfigProto();

    proto.setRobotsPolicy(politenessConfig.robotsPolicy);
    proto.setCustomRobots(politenessConfig.customRobots);
    proto.setMinimumRobotsValidityDurationS(politenessConfig.minimumRobotsValidityDurationS);
    proto.setUseHostname(politenessConfig.useHostname);

    return proto;
  }

  static mergeConfigs(configObjects: ConfigObject[]): PolitenessConfig {
    const politenessConfig = new PolitenessConfig();
    const compareObj: PolitenessConfig = configObjects[0].politenessConfig;

    const equalRobotsPolicy = configObjects.every(cfg => cfg.politenessConfig.robotsPolicy === compareObj.robotsPolicy);

    const equalMinRobotsValidity = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.minimumRobotsValidityDurationS === compareObj.minimumRobotsValidityDurationS);

    const equalCustomRobot = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.customRobots === compareObj.customRobots);

    const equalUseHostname = configObjects.every(
      (cfg: ConfigObject) => cfg.politenessConfig.useHostname === compareObj.useHostname);

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
    if (equalUseHostname) {
      politenessConfig.useHostname = compareObj.useHostname;
    } else {
      politenessConfig.useHostname = undefined;
    }

    return politenessConfig;
  }
}
