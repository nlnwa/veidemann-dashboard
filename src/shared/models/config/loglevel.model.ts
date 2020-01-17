import {LogLevelsProto} from '../../../api';
import {isNumeric} from '../../func';

export enum Level {
  UNDEFINED = 0,
  ALL = 1,
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
  OFF
}

export const levels: Level[] = Object.keys(Level)
  .filter(_ => !isNumeric(_))
  .filter(_ => Level[_] !== Level.UNDEFINED)
  .map(key => Level[key]);

export class LogLevel {
  logger: string;
  level: Level;

  constructor({logger = '', level = Level.UNDEFINED}: Partial<LogLevel> = {}) {
    this.logger = logger;
    this.level = level;
  }

  static toProto(logLevel: LogLevel): LogLevelsProto.LogLevel {
    const logLevelProto = new LogLevelsProto.LogLevel();
    logLevelProto.setLogger(logLevel.logger);
    logLevelProto.setLevel(logLevel.level);
    return logLevelProto;
  }

  static fromProto(logLevel: LogLevelsProto.LogLevel): LogLevel {
    return new LogLevel({
      level: logLevel.getLevel(),
      logger: logLevel.getLogger()
    });
  }
}

export class LogLevels {
  logLevelList: LogLevel[];

  constructor({logLevelList = []}: Partial<LogLevels> = {}) {
    this.logLevelList = logLevelList;
  }

  static toProto(logLevels: LogLevels): LogLevelsProto {
    const proto = new LogLevelsProto();
    proto.setLogLevelList(logLevels.logLevelList.map(logLevel => LogLevel.toProto(logLevel)));
    return proto;
  }

  static fromProto(logLevels: LogLevelsProto): LogLevels {
    return {
      logLevelList: logLevels.getLogLevelList()
        .map(logLevel => new LogLevel({logger: logLevel.getLogger(), level: logLevel.getLevel()}))
    };
  }
}
