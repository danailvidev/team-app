import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
  baseAuthUrl = environment.baseUrl + '/auth';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  loginUser(userData): any {
    const body = userData;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = new HttpResponse({ headers: headers });
    return this.http.post<any>(this.baseAuthUrl + '/login', userData).subscribe(res => {
      this.saveToken(res.token);
    });
  }

  logout(): boolean {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      return true;
    } catch (err) {
      console.error('server error:', err);
      return false;
    }
  }

  registerUser(userData) {
    const body = userData;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = new HttpResponse({ headers: headers });
    return this.http.post<any>(this.baseAuthUrl + '/register', body, options).subscribe(res => {
      this.saveToken(res.token);
    });
  }

  private saveToken(token){
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error instanceof HttpResponse) {
      let errMessage = '';
      try {
        errMessage = error.statusText;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'json server error');
  }

}
