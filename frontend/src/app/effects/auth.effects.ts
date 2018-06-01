import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Effect, Actions } from '@ngrx/effects';
import * as authActions from './../actions/auth.actions';
import { Router } from '@angular/router';
import { switchMap, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(
        private authService: AuthService,
        private actions$: Actions,
        private router: Router) { }

    @Effect() getCurrentUser$ = this.actions$
        .ofType(authActions.GET_CURRENT_USER_DATA)
        .switchMap(() => this.authService.userInfo().map(currentUser => (new authActions.GetCurrentUserSuccessAction(currentUser))
        ));

}
