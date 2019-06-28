export enum Level {
  'ALL',
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

  constructor({logLevel: logLevel = []} = {}) {
    this.logLevelList = logLevel;
  }

  static toWire(logLevels: LogLevels): any {
    return {
      log_level: logLevels.logLevelList
    };
  }

  static fromWire(logLevels: any): LogLevels {
    return {
      logLevelList: logLevels.log_level
    };
  }
}

export class LogLevel {
  logger: string;
  level: string;

  constructor({logger = '', level = ''} = {}) {
    this.logger = logger;
    this.level = level;
  }

}
