import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApiDb } from './log-publishers';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiService } from '@services/api.service';

@Injectable()
export class LogPublisherService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService) {
        this.buildPublishers();
    }

    publishers: LogPublisher[] = [];

    buildPublishers(): void {
        let logPub: LogPublisher;

        this.getLoggers().subscribe(res => {
            res.forEach(pub => {
                if (pub.isActive === true) {
                    switch (pub.loggerName.toLowerCase()) {
                        case 'console':
                            logPub = new LogConsole(this.http);
                            break;
                        case 'localstorage':
                            logPub = new LogLocalStorage();
                            break;
                        case 'webapidb':
                            logPub = new LogWebApiDb(this.apiService);
                            break;
                    }

                    // Set the location
                    logPub.location = pub.loggerLocation;
                    // Add publisher to the array
                    this.publishers.push(logPub);
                }
            });
        });
    }

    getLoggers(): any {
        return Observable.create(environment.logging);

    }

    private handleError(error) {
        // error service code
        console.error('server error:', error);
        if (error instanceof HttpResponse) {
            let errMessage = '';
            try {
                errMessage = error.toString();
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'json server error');
    }
}
