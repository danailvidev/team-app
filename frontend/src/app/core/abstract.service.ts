import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export abstract class BaseApiService {
    protected baseUrl = environment.backend['baseUrl'];
    private defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    private defaultOptions = new HttpResponse({ headers: this.defaultHeaders });

    public constructor(protected http: HttpClient) { }

    protected get(relativeUrl: string): Observable<any> {
        return this.http.get(this.baseUrl + relativeUrl, { observe: 'response' }).pipe(
            map((res: HttpResponse<any>) => {
                if (res.ok && res.status === 200) {
                    return res.body;
                }
            }),
            catchError(this.handleError(relativeUrl))
        );
    }

    protected post(relativeUrl: string, body: any, options: HttpResponse<any> = this.defaultOptions) {
        return this.http.post<any>(this.baseUrl + relativeUrl, body, options).pipe(
            map((res) => {
                if (res.result) {
                    return res;
                }
                return false;
            }),
            catchError(this.handleError(relativeUrl))
        );
    }

    protected put(relativeUrl: string, body: any, options: HttpResponse<any> = this.defaultOptions): Observable<any> {
        return this.http.put(this.baseUrl + relativeUrl, body, options).pipe(
            map((res: any) => {
                return res;
            }),
            catchError(this.handleError(relativeUrl))
        );
    }

    protected delete(relativeUrl: string, id: string): Observable<any> {
        throw new Error('Not implemented');
    }

    private handleError(operation: String) {
        return (err: any) => {
            const errMsg = `error in url ${operation} retrieving from ${this.baseUrl}`;
            console.log(`${errMsg}:`, err);
            if (err instanceof HttpErrorResponse) {
                // you could extract more info calendar the error if you want, e.g.:
                console.log(`status: ${err.status}, ${err.statusText}`);
            }
            return ErrorObservable.create(errMsg);
        };
    }
}
