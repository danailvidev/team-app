import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthService } from '../core/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(): Observable<boolean> {
        if (!this.authService.isAuthenticated) {
            this.router.navigate([`/login`]);
            return Observable.of(false);
        }
        return Observable.of(true);
    }
}
