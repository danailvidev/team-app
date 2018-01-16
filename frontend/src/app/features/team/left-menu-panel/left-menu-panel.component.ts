import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IUser } from '../../../shared/interfaces';
import { Observable } from 'rxjs/Observable';
import * as authActions from '../../../actions/auth.actions';

@Component({
    selector: 'left-menu-panel',
    templateUrl: 'left-menu-panel.component.html',
    styleUrls: ['left-menu-panel.component.scss']
})

export class LeftMenuPanelComponent implements OnInit {
    currentUser: any;
    menuItems = [
        { link: 'notifications', label: 'Notifications', color: '', icon: 'notifications' },
        { link: 'task-stream', label: 'Task Stream', color: '', icon: 'assignment_turned_in' },
        { link: 'personal-task', label: 'Personal Tasks', color: '', icon: 'assignment_turned_in' },
        {
            link: '', label: 'Open Forums', disabled: true, color: '', icon: 'forum',
            items: [
                { link: 'forum', label: 'General' }
            ]
        },
        { link: 'private-teams', label: 'Private Teams', color: '', icon: 'supervisor_account' },
        { link: 'messages', label: 'Direct Messages', color: '', icon: 'record_voice_over' },
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
