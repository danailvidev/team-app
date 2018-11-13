import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { tap, take, switchMap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { filter, finalize } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authService: AuthService) { }

    addToken(req: HttpRequest<any>, token: string) {
        return req.clone({ setHeaders: { Authorization: 'token ' + token } })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap(event => {
                // if (event.type === HttpEventType.Response ) {
                //     console.log(event.body);
                // }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>err).status) {
                        case 400:
                            return this.handle400Error(err);
                        case 401:
                            return this.handle401Error(req, next);
                    }
                } else {
                    return Observable.throw(err);
                }
            })
        );
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler): any {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return this.authService.refreshToken()
                .pipe(
                    tap((newToken: string) => {
                        if (newToken) {
                            this.tokenSubject.next(newToken);
                            return next.handle(this.addToken(req, newToken));
                        }

                        // If we don't get a new token, we are in trouble so logout.
                        return this.logoutUser();
                    }),
                    catchError((error) => {
                        // If there is an exception calling 'refreshToken', bad news so logout.
                        this.logoutUser();
                        const msg = `${error.status} ${error.statusText} -  ${error.url}`;
                        return throwError(new Error(msg));
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                )
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
                })
            )
        }
    }

    handle400Error(error) {
        if (error && error.status === 400 && error.error) {
            return this.logoutUser();
        }

        return Observable.throw(error);
    }

    logoutUser() {
        this.authService.logout();
    }
}
