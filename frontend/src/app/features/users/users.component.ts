import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Store } from '@ngrx/store';
import { AppState, IUser } from '../../shared/interfaces';
import { Observable } from 'rxjs/Observable';
import * as userActions from '../../actions/user.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  users$: Observable<IUser[]>;
  pageError?: string = null;

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>
  ) {
    this.users$ = this.store.select(state => state.users);
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): any {
    this.store.dispatch(new userActions.LoadUsersAction());
  }
}
