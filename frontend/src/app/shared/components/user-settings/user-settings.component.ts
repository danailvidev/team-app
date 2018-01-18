import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppState } from '../../interfaces/app-state';
import { Store } from '@ngrx/store';
import { NotifyService } from '../../../core/notify.service';

@Component({
    selector: 'user-settings',
    templateUrl: 'user-settings.component.html',
    styleUrls: ['user-settings.component.scss']
})

export class UserSettingsComponent implements OnInit {
    mySettings: any;
    themes = [
        { value: 'light', viewValue: 'Light Theme' },
        { value: 'dark', viewValue: 'Dark Theme' },
    ];

    constructor(
        public dialogRef: MatDialogRef<UserSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store<AppState>,
        public notifyService: NotifyService) { }

    ngOnInit() {
        this.getMySettings();
    }

    getMySettings() {
        this.store.select(state => state.currentUser).subscribe(res => {
            this.mySettings = res;
        }, error => {
            console.log(error);
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveMySettings() {
        this.notifyService.notify(`Settings Saved`, null, {
            duration: 3000,
            panelClass: ['snack-success']
        });
    }
}