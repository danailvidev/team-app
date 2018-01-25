import { Injectable } from '@angular/core';
import { LogPublisher } from './log-publishers';
import { LogPublisherService } from './log-publishers.service';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

export class LogEntry {
  // Public properties
    entryDate: Date = new Date();
    message: string = '';
    level: LogLevel = LogLevel.Debug;
    extraInfo: any[] = [];
    logWithDate: boolean = true;

  buildLogString(): string {
    let ret: string = '';

    if (this.logWithDate) {
      ret = new Date() + ' - ';
    }
    ret += 'Type: ' + LogLevel[this.level];
    ret += ' - Message: ' + this.message;
    if (this.extraInfo.length) {
      ret += ' - Extra Info: ' + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  private formatParams(params: any[]) {
    let ret: string = params.join(',');
    // tslint:disable-next-line:triple-equals
    if (params.some(p => typeof p == 'object')) {
      ret = '';
      // tslint:disable-next-line:prefer-const
      for (let item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }
}

@Injectable()
export class LoggingService {
  // Public properties
  level: LogLevel = LogLevel.All;
  logWithDate = true;
  publishers: LogPublisher[];

  constructor(private publisherService: LogPublisherService) {
    // Set all publishers into the local array
    this.publishers = this.publisherService.publishers;
  }

  private shouldLog(level: LogLevel): boolean {
    let ret = false;
    if (this.level !== LogLevel.Off && level >= this.level) {
      ret = true;
    }

    return ret;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    this.writeToLog(message, LogLevel.All, optionalParams);
  }

  clear() {
    for (let logger of this.publishers) {
      logger.clear();
    }
  }


  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;

      // Log the value to all publishers
      for (let logger of this.publishers) {
        logger.log(entry);
      }
    }
  }

}