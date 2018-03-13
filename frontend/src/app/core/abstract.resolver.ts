import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export abstract class AbstractResolver implements Resolve<any> {

    constructor(private apiSvc: ApiService) { }

    abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>;
}