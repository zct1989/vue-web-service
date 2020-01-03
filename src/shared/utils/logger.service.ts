/* eslint-disable */

enum LoggerLevel {
  Info,
  Warn,
  Error
}

interface LoggerServiceHandle {
  loggerServiceHandle: { [level: number]: (message) => void }
}

/**
 * 日志服务
 */
export class LoggerService {
  private logger!: LoggerServiceHandle

  constructor(type = 'console') {
    if (type) {
      const loggerService = {
        console: ConsoleLoggerService,
        log4js: ConsoleLoggerService
      }[type]

      this.logger = new loggerService(false)
    }
  }

  write(message: any[], level) {
    this.logger.loggerServiceHandle[level](message)
  }

  public info(...message) {
    this.write(message, LoggerLevel.Info)
  }

  public warn(...message) {
    this.write(message, LoggerLevel.Warn)
  }

  public error(...message) {
    this.write(message, LoggerLevel.Error)
  }
}

export class ConsoleLoggerService extends LoggerService
  implements LoggerServiceHandle {
  public loggerServiceHandle = {
    [LoggerLevel.Info]: message => {
      console.log(...message)
    },
    [LoggerLevel.Warn]: message => {
      console.warn(...message)
    },
    [LoggerLevel.Error]: message => {
      console.error(...message)
    }
  }
}

export class log4jsLoggerService extends LoggerService
  implements LoggerServiceHandle {
  public loggerServiceHandle = {
    [LoggerLevel.Info]: message => {},
    [LoggerLevel.Warn]: message => {},
    [LoggerLevel.Error]: message => {}
  }
}
