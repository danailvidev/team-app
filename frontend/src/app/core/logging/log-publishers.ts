import { Observable, of } from 'rxjs';
import { Response } from '@angular/http';
import { LogEntry } from './loggin.service';
import { ApiService } from '../api.service';
import { BaseApiService } from '../abstract.service';

export abstract class LogPublisher {
    location?: string;

    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}

export class LogConsole extends BaseApiService implements LogPublisher {
    log(record: LogEntry): Observable<boolean> {
        console.log(record.buildLogString());

        return of(true);
    }

    clear(): Observable<boolean> {
        console.clear();

        return of(true);
    }
}

export class LogLocalStorage extends LogPublisher {
    constructor() {
        super();

        this.location = 'logging';
    }

    /*
    Component method implementation:
    logEntries: LogEntry[];
    let tmp = this.logger.publishers.find(p => p.consrtuctor.name === 'LogLocalStorage')
    if (tmp != null) {
        let local = tmp as LogLocaleStorage
        local.getAll().subscribe(res => {
            this.logEntries = response;
        })
    }
    */
    getAll(): Observable<LogEntry[]> {
        let values: LogEntry[];

        // Retrieve all values from localStorage
        values = JSON.parse(localStorage.getItem(this.location)) || [];

        return of(values);
    }

    log(record: LogEntry): Observable<boolean> {
        let ret: boolean = false;
        let values: LogEntry[];

        try {
            values = JSON.parse(localStorage.getItem(this.location)) || [];
            // Add new log entry to the array
            values.push(record);
            // Store the complete array into the localStorage
            localStorage.setItem(this.location, JSON.stringify(values));
            // Set the return value
            ret = true;
        } catch (ex) {
            console.log(ex);
        }

        return of(ret);
    }

    clear(): Observable<boolean> {
        localStorage.removeItem(this.location);
        return of(true);
    }
}

export class LogWebApiDb extends LogPublisher {

    constructor(public apiService: ApiService) {
        super();
    }

    getAll(): Observable<LogEntry[]> {
        return this.apiService.getAllLogs();
    }

    log(record: LogEntry): Observable<boolean> {
        return this.apiService.log(record);
    }

    clear(): any {
        return this.apiService.clearAllLogs();
    }
}