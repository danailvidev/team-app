import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router) { }

    canActivate(): Observable<boolean> {
         //this.router.navigate([`/login`]);
         return Observable.of(true);
    }
}
