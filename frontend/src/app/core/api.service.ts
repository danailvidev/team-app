import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import { BaseApiService } from './abstract.service';

@Injectable()
export class ApiService extends BaseApiService {

    public constructor(protected http: HttpClient) {
        super(http);
    }

    getMessages(userId): Observable<any> {
        const relativeUrl = `post/${userId}`;
        return this.get(relativeUrl);
    }

    // User
    getUser(id): Observable<any> {
        const relativeUrl = `user/${id}`;
        return this.get(relativeUrl);
    }

    getUsers(): Observable<any> {
        const relativeUrl = `user`;
        return this.get(relativeUrl);
    }

    /**
     * Get All Logs From DB
     */
    getAllLogs(): Observable<any> {
        const relativeUrl = `logs`;
        return this.get(relativeUrl);
    }

    log(record): Observable<any> {
        const relativeUrl = `logs`;
        return this.post(relativeUrl, record);
    }

    clearAllLogs(): Observable<any> {
        const relativeUrl = `logs`;
        return this.delete(relativeUrl, '0');
    }

    deleteUser(id): any {
        const relativeUrl = ``;
        return this.delete(relativeUrl, id);
    }

    /**
     * Post a message
     * @param postMsg msg body
     * @returns res object {result:boolean,id:string}
     */
    postMsg(postMsg): Observable<any> {
        const body = JSON.stringify(postMsg);
        const relativeUrl = `post`;
        return this.post(relativeUrl, postMsg);
    }

    deleteMsg(id): any {
        const relativeUrl = `post/${id}`;
        return this.delete(relativeUrl, id);
    }

}
