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
  log_level: LogLevel[];

  constructor({log_level = []} = {}) {
    this.log_level = log_level;
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
