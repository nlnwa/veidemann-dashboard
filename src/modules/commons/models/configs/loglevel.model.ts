import {LogLevelsProto} from '../../../../api';

export enum Level {
  // 'UNDEFINED',
  'ALL' = 1,
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
  'FATAL',
  'OFF'
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
        .map(logLevel => new LogLevel({logger: logLevel.getLogger(), level: Level[logLevel.getLevel().valueOf()]}))
    };
  }
}

export class LogLevel {
  logger: string;
  level: string;

  constructor({logger = '', level = ''}: Partial<LogLevel> = {}) {
    this.logger = logger;
    this.level = level;
  }

  static toProto(logLevel: LogLevel): LogLevelsProto.LogLevel {
    const logLevelProto = new LogLevelsProto.LogLevel();
    logLevelProto.setLogger(logLevel.logger);
    logLevelProto.setLevel(Level[logLevel.level.valueOf()]);
    return logLevelProto;
  }

  static fromProto(logLevel: LogLevelsProto.LogLevel): LogLevel {
    return new LogLevel({
      level: Level[logLevel.getLevel().valueOf()],
      logger: logLevel.getLogger()
    });
  }

}
