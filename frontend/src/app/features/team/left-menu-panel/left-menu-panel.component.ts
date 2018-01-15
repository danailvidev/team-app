import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IUser } from '../../../shared/interfaces';
import { Observable } from 'rxjs/Observable';
import * as authActions from '../../../actions/auth.actions';

@Component({
    selector: 'left-menu-panel',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.scss']
})

export class LeftMenuPanelComponent implements OnInit {
    currentUser: any;
    menuItems = [
        { link: 'team', label: 'Team Service', color: '' },
        { link: 'task-stream', label: 'Task Stream', color: '' },
        { link: 'private-teams', label: 'Private Teams', color: '' },
      ];

    constructor(
        private store: Store<AppState>
    ) {
        this.store.select(state => state.currentUser).subscribe(res => {
            this.currentUser = res;
        }, (err) => {
            console.log(err);
        });
    }

    ngOnInit() {
        this.getCurrentUserData();
    }

    getCurrentUserData() {
        this.store.dispatch(new authActions.GetCurrentUserAction());
    }
}
