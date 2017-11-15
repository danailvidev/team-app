import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

  getMessages(): Observable<any> {
    return this.http.get(this.baseUrl + '/posts').pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(this.handleError)
    );
  }

  getUser(id): Observable<any> {
    return this.http.get(this.baseUrl + `/user/${id}`).pipe(
      map((res: Response) => {
        console.log(res);
        return res.json();
      }),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/users').pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.json().error;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'json server error');
  }

}
