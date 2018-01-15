import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IUser } from '../../../shared/interfaces';
import { Observable } from 'rxjs/Observable';
import * as userActions from '../../../actions/user.actions';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['user-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserPanelComponent implements OnInit {
  users$: Observable<IUser[]>;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.users$ = this.store.select(state => state.users);
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): any {
    this.store.dispatch(new userActions.LoadUsersAction());
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `{{data | json}}`,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}