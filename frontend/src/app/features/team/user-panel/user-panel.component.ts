import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IUser } from '@app/shared/interfaces';
import * as userActions from '@ngrxLocal/actions/user.actions';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'ta-user-panel',
    templateUrl: 'user-panel.component.html',
    styleUrls: ['user-panel.component.scss'],
})

export class UserPanelComponent implements OnInit {
    users: IUser[];
    usersCount: number;
    hideUsers: any;

    constructor(
        private store: Store<AppState>,
        public dialog: MatDialog
    ) {
        this.store.select(state => state.users).subscribe(res => {
            this.users = res;
        }, error => {
            console.log(error);
        });
    }

    ngOnInit() {
        this.getUsers();
    }

    private getUsers(): any {
        this.store.dispatch(new userActions.LoadUsersAction());
    }

    openDialog(data): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '450px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}

@Component({
    selector: 'ta-dialog-overview-example-dialog',
    template: `{{data | json}}`,
})
export class DialogOverviewExampleDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
