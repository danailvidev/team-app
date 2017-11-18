import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }
    intercept(req, next) {
        const authService = this.injector.get(AuthService);
        const authRequest = req.clone({
            // tslint:disable-next-line:max-line-length
            headers: req.headers.set('Authorization', 'token ' + authService.token)
        });

        return next.handle(authRequest);
    }
}
