import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw';

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
      catchError(this.handleError('getMessages'))
    );
  }

  getUser(id): Observable<any> {
    return this.http.get(this.baseUrl + `/user/${id}`).pipe(
      map((res: HttpResponse<any>) => {
        return res;
      }),
      catchError(this.handleError('getUser'))
    );
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/users').pipe(
      map((res: HttpResponse<any>) => {
        return res;
      }),
      catchError(this.handleError('getUsers'))
    );
  }

  deleteUser(id): any {
    console.log('delete', id);
  }

  /**
   * Post a message
   * @param postMsg msg body
   * @returns res object {result:boolean,id:string}
   */
  postMsg(postMsg): Observable<any> {
    const body = JSON.stringify(postMsg);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = new HttpResponse({ headers: headers });
    return this.http.post<any>(this.baseUrl + '/post', body, options).pipe(
      map((res) => {
        if (res.result) {
          console.log(res);
          return res;
        }
        return false;
      }),
      catchError(this.handleError('postMsg'))
    );
  }

  deleteMsg(id): any {
    this.http.delete(this.baseUrl + `/post/${id}`).subscribe(res => {
      console.log('es', res);
    }, err => console.log(err));
  }

  private handleError(operation: String) {
    return (err: any) => {
      const errMsg = `error in ${operation} retrieving ${this.baseUrl}`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        // you could extract more info about the error if you want, e.g.:
        console.log(`status: ${err.status}, ${err.statusText}`);
      }
      return Observable.throw(errMsg);
    };
  }

}
