import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getMessages(userId): Observable<any> {
    return this.http.get(this.baseUrl + `/posts/${userId}`).pipe(
      map((res: HttpResponse<any>) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getUser(id): Observable<any> {
    return this.http.get(this.baseUrl + `/user/${id}`).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/users').pipe(
      map((res: HttpResponse<any>) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  postMsg(postMsg): Observable<boolean> {
    const body = JSON.stringify(postMsg);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = new HttpResponse({ headers: headers });
    return this.http.post<any>(this.baseUrl + '/post', body, options).pipe(
      map((res) => {
        if (res) {
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error instanceof HttpResponse) {
      let errMessage = '';
      try {
        errMessage = error.body;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'json server error');
  }

}
