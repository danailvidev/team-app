import { Injectable } from '@angular/core';
import { Http,Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getMessages(): Observable<any> {
    return this.http.get('http://localhost:3000/posts').pipe(
      map((res: Response) => {
        return res.json();
      }),
      catchError(this.handleError)
    );
  }

  registerUser(userData): any {
    const body = JSON.stringify(userData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/register', body, options).subscribe(res => {
      return res.ok;
    });
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
