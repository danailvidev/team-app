import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Effect, Actions } from '@ngrx/effects';
import * as userActions from './../actions/user.actions';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class UserEffects {

    constructor(
        private apiService: ApiService,
        private actions$: Actions,
        private router: Router) { }

    @Effect() loadUsers$ = this.actions$
        .ofType(userActions.LOAD_USERS)
        .switchMap(() => this.apiService.getUsers()
            .map(users => (new userActions.LoadUsersSuccessAction(users))));

    @Effect() deleteUser$ = this.actions$
        .ofType(userActions.DELETE_USER)
        .switchMap((action: userActions.DeleteUserAction) => this.apiService.deleteUser(action.payload)
            .then(user => (new userActions.DeleteUserSuccessAction(action.payload)))
        )
        .do(action => {
            this.router.navigate(['/users']);
        });
}
