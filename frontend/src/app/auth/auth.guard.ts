import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(): Observable<boolean> {
        if (!this.authService.isAuthenticated) {
            this.router.navigate([`/login`]);
            return of(false);
        }
        return of(true);
    }
}
