import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IUser } from '../../shared/interfaces';
import { Observable } from 'rxjs';
import * as userActions from '@ngrxLocal/actions/user.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]>;
  pageError?: string = null;

  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(state => state.users);
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): any {
    this.store.dispatch(new userActions.LoadUsersAction());
  }
}
