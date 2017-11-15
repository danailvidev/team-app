import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AuthService {
  baseAuthUrl = environment.baseUrl + '/auth';

  constructor(private http: Http) { }

  loginUser(userData): any {
    const body = JSON.stringify(userData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseAuthUrl + '/login', body, options).subscribe(res => {
      localStorage.setItem('token', res.json().token);
    });
  }

  registerUser(userData): any {
    const body = JSON.stringify(userData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseAuthUrl + '/register', body, options).subscribe(res => {
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
